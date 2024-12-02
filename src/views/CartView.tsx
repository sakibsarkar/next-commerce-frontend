"use client";

import { Button } from "@/components/ui/button";
import { removeFromCart } from "@/redux/features/cart/cart.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { X } from "lucide-react";
import Image from "next/image";

const CartView = () => {
  const { items, total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
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
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white p-[20px] rounded-[10px]">
          <div className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 pb-4 border-b text-sm font-medium">
            <div>PRODUCT</div>
            <div className="text-right">PRICE</div>
            <div className="text-center">QUANTITY</div>
            <div className="text-right">Discount</div>
            <div className="text-right">Total</div>
          </div>

          {items.map((item) => (
            <div
              key={item.cartId}
              className="grid grid-cols-[2fr,1fr,1fr,1fr,1fr] gap-4 py-4 border-b items-center"
            >
              <div className="flex gap-4">
                <button
                  onClick={() => dispatch(removeFromCart(item.cartId))}
                  className="h-6 w-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="flex gap-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md"
                  />
                  <div className="space-y-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Color: {item.colorName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Size: {item.sizeName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right">${item.price.toFixed(2)}</div>
              <div className="flex justify-center items-center gap-2">
                <button
                  //   onClick={() => updateQuantity(item.cartId, false)}
                  className="h-6 w-6 flex items-center justify-center rounded border hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  //   onClick={() => updateQuantity(item.cartId, true)}
                  className="h-6 w-6 flex items-center justify-center rounded border hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <div className="text-right">{item.discount}%</div>
              <div className="text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-80">
          <div className="bg-white p-6 rounded-lg space-y-4">
            <h2 className="text-xl font-bold">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total + totalDiscountPrice}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discount</span>
                <span>-${totalDiscountPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Grand Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Button className="w-full" size="lg">
              proceed to checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartView;
