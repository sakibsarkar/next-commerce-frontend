"use client";
import { clearCart } from "@/redux/features/cart/cart.slice";
import { clearCheckoutSession } from "@/redux/features/checkout/checkout.slice";
import { useCheckCouponMutation } from "@/redux/features/coupon/coupon.api";
import { useCreateOrderMutation } from "@/redux/features/order/order.api";
import { useCreatePaymentIntentMutation } from "@/redux/features/payment/payment.api";
import { useAppSelector } from "@/redux/hook";
import { ICoupon } from "@/types/coupon";
import { getDiscountPrice } from "@/utils/product";
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { IoInformationSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import ShippingAddressSelector from "./ShippingAddressSelector";

interface IProps {
  onCouponApplied: (isCouponApplied: ICoupon | undefined) => void;
}

const Checkout: React.FC<IProps> = ({ onCouponApplied }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { items } = useAppSelector((state) => state.checkout);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");

  const [checkCoupon, { isLoading: isCouponChecking }] =
    useCheckCouponMutation();
  const [appliedCoupon, setAppliedCoupon] = useState<ICoupon | undefined>(
    undefined
  );

  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const validCoupon = "FLASH10";
  const handleApplyCoupon = async () => {
    if (isCouponChecking) {
      return;
    }

    const payload = {
      couponCode,
      productIds: items.map((item) => item.productId),
    };

    try {
      const res = await checkCoupon(payload);
      const error = res.error as any;
      if (error) {
        setAppliedCoupon(undefined);
        onCouponApplied(undefined);
        setMessage({
          type: "error",
          text: "Invalid coupon code. Please try again.",
        });
        return;
      }

      const coupon = res.data?.data;

      if (!coupon) {
        setAppliedCoupon(undefined);
        onCouponApplied(undefined);
        setMessage({
          type: "error",
          text: "Invalid coupon code or maybe coupon is not available for these products. Please try again.",
        });
        return;
      }

      setAppliedCoupon(coupon);
      onCouponApplied(coupon);
      setMessage({ type: "success", text: "Coupon applied successfully!" });
    } catch (error) {
      setAppliedCoupon(undefined);
      onCouponApplied(undefined);
      setMessage({
        type: "error",
        text: "Invalid coupon code or maybe coupon is not available for these products. Please try again.",
      });
    }
  };
  const [selectedSipingAddress, setSelectedSipingAddress] = useState<
    string | null
  >(null);

  const [isLoading, setIsLoading] = useState(false);

  const [createOrder] = useCreateOrderMutation();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();

  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const getCouponDiscountPrice = () => {
    if (!appliedCoupon) return 0;
    const product = items.find(
      (item) => item.productId === appliedCoupon.productId
    );
    if (!product) return 0;

    const couponDiscount = appliedCoupon.discount;
    const price = getDiscountPrice(product.price, product.discount || 0);
    const quantity = product.quantity;

    if (!couponDiscount) {
      return 0;
    }
    const discountPrice = (price * couponDiscount) / 100;
    return discountPrice * quantity;
  };
  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let totalPrice = items.reduce((acc, item) => {
      return acc + getDiscountPrice(item.price, item.discount) * item.quantity;
    }, 0);

    if (appliedCoupon) {
      totalPrice -= getCouponDiscountPrice();
    }

    if (!selectedSipingAddress) {
      toast.error("Please select a shipping address");
      return;
    }

    if (isLoading) {
      return;
    }
    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet. Please try again later.");
      return;
    }

    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      setError(
        "Card element not found. Please refresh the page and try again."
      );
      return;
    }

    try {
      setIsLoading(true);
      const email = user?.email || "anonymous@mail.com";
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: { email },
      });

      if (error) {
        setIsLoading(false);
        setError("Something went wrong while proccessing this payment");
        toast.error("Something went wrong while proccessing this payment");
        return;
      }

      const data = await createPaymentIntent(Math.round(totalPrice));
      const intentErr = data.error as any;

      if (intentErr) {
        setIsLoading(false);
        toast.error(intentErr.message || "Something went wrong");
        return;
      }

      const { client_secret } = data.data?.data || { client_secret: "" };
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(client_secret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              email,
            },
          },
        });

      if (confirmError) {
        setIsLoading(false);
        setError(confirmError.message || "Something went wrong");
        toast.error(confirmError.message || "Something went wrong");
        return;
      }

      const pyalod = {
        shippingAddressId: selectedSipingAddress,
        paymentIntentId: paymentIntent.id,
        couponCode: appliedCoupon?.code,
        orderItems: items.map((item) => {
          return {
            productId: item.productId,
            quantity: item.quantity,
            sizeId: item.sizeId,
            colorId: item.colorId,
          };
        }),
      };

      const res = await createOrder(pyalod);
      const err = res.error as any;

      if (err) {
        setIsLoading(false);
        setError(err?.data?.message);
        toast.error(
          err?.data?.message ||
            "Something went wrong while proccessing this payment"
        );
        return;
      }

      toast.success("Payment successfull");
      setIsLoading(false);
      dispatch(clearCart());
      dispatch(clearCheckoutSession());
      router.push("/checkout/success");
    } catch {
      toast.error("Something went wrong while proccessing this payment");
      setIsLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-[25px]">
          <div className="flex gap-[5px]">
            <Input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-grow"
              disabled={Boolean(appliedCoupon)}
            />
            <Button
              onClick={handleApplyCoupon}
              disabled={
                !couponCode.trim() || Boolean(appliedCoupon) || isCouponChecking
              }
              className="center gap-[5px]"
            >
              Apply
              {isCouponChecking ? <FaSpinner className="animate-spin" /> : ""}
            </Button>
          </div>
          {!appliedCoupon && items.length > 0 ? (
            <p className="text-[13px] mt-[8px] flex items-center gap-[7px]">
              <span className="w-[15px] h-[15px] center bg-main text-white rounded-full">
                <IoInformationSharp />
              </span>
              You are buying more than one item, you can only apply one coupon
              in this order
            </p>
          ) : (
            ""
          )}
          {message.type && (
            <div
              className={`flex items-center space-x-2 ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.type === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span>{message.text}</span>
            </div>
          )}
        </div>
        <ShippingAddressSelector onChange={setSelectedSipingAddress} />
        <h4 className="text-[20px] font-[700] text-mainTxt">Card details</h4>
        <form onSubmit={handlePayment} className="mt-[15px]">
          <div className="flex flex-col gap-[8px] w-full">
            <label htmlFor="card-nr" className="label">
              Card number
            </label>
            <div className="px-[20px] w-full flex justify-center items-center h-[50px] border-[1px] border-[#E2E8F0] rounded-[15px]">
              <CardNumberElement
                id="card-nr"
                className="text-[16px] font-[500] bg-white w-full text-[#B4BFCD] "
              />
            </div>
          </div>

          <div className="flex items-start justify-start gap-[22px] w-full mt-[20px]">
            <div className="flex flex-col gap-[8px] w-full">
              <label htmlFor="card-ex" className="label">
                Card expiry
              </label>
              <div className="px-[20px] w-full flex justify-center items-center h-[50px] border-[1px] border-[#E2E8F0] rounded-[15px]">
                <CardExpiryElement
                  id="card-ex"
                  className="text-[16px] font-[500] bg-white w-full text-[#B4BFCD]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-[8px] w-full">
              <label htmlFor="card-cv" className="label">
                CVC
              </label>
              <div className="px-[20px] w-full flex justify-center items-center h-[50px] border-[1px] border-[#E2E8F0] rounded-[15px]">
                <CardCvcElement
                  id="card-cv"
                  className="text-[16px] font-[500] bg-white w-full text-[#B4BFCD]"
                />
              </div>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-[14px] mt-[10px]">* {error}</p>
          )}
          <Button
            className="w-full mt-[40px] bg-main"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Pay by card"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Checkout;
