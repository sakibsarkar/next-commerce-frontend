"use client";
import Checkout from "@/components/checkout/Checkout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Protectedroute from "@/provider/Protectedroute";
import { stripePromise } from "@/provider/ReduxProvider";
import { useAppSelector } from "@/redux/hook";
import { getDiscountPrice } from "@/utils/product";
import { Elements } from "@stripe/react-stripe-js";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "react-phone-number-input/style.css";

export default function CheckoutPage() {
  const { items } = useAppSelector((state) => state.checkout);
  const router = useRouter();

  const subTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalDiscountPrice = items.reduce((acc, item) => {
    const discount = item.discount;
    const price = item.price;
    const quantity = item.quantity;

    if (discount) {
      const discountPrice = (price * discount) / 100;
      return acc + discountPrice * quantity;
    }

    return acc + 0;
  }, 0);

  return (
    <Protectedroute role="CUSTOMER">
      <div className="min-h-screen mx-auto p-4 w-full center">
        <div className=" w-[80vw]">
          <div onClick={() => router.back()} className="cursor-pointer ">
            <h3 className="text-2xl font-semibold mb-[20px] flex items-center gap-[10px]">
              <ChevronLeft className="w-[25px]" />
              Go Back
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left side - Customer Information Form */}
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>

            {/* Right side - Product Information and Pricing */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Information</CardTitle>
                </CardHeader>
                <CardContent className="flex items-start gap-4 flex-wrap">
                  {items.map((item, key) => {
                    const discount = getDiscountPrice(
                      item.price,
                      item.discount
                    );
                    return (
                      <div
                        key={key + "item"}
                        className="flex items-start justify-start gap-[20px]"
                      >
                        <div className="w-[100px] h-[100px] overflow-hidden rounded-[10px]">
                          <Image
                            src={item.image}
                            alt="Product Image"
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Color: {item.colorName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Size: {item.sizeName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Quantity: {item.quantity}X
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Price: ${item.price}
                          </p>

                          {item.discount ? (
                            <p className="text-sm text-muted-foreground font-[700]">
                              Discount: {item.discount} %
                            </p>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{subTotal.toFixed(2)} $</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span>-{totalDiscountPrice.toFixed(2)} $ </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span> Free</span>
                    </div>

                    <Separator />

                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>
                        {(subTotal - totalDiscountPrice).toFixed(2)} $
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Protectedroute>
  );
}
