"use client";
import { addToCart } from "@/redux/features/cart/cart.slice";
import { useAppSelector } from "@/redux/hook";
import { IProduct } from "@/types/product";
import { getDiscountPrice } from "@/utils/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import CarConflictVendorWarning from "../shared/CarConflictVendorWarning";
import { Separator } from "../ui/separator";
import ProductToolTip from "./ProductToolTip";
const ProductCard = ({ product }: { product: IProduct }) => {
  const dispatch = useDispatch();
  const { items } = useAppSelector((state) => state.cart);
  const [isConflict, setIsConflict] = useState(false);

  const handleAddToCart = (replace?: boolean) => {
    const isSameShop = items.find((item) => item.shopId === product.shopId);
    if (!isSameShop && !replace && items.length > 0) {
      setIsConflict(true);
      return;
    }

    dispatch(
      addToCart({
        payload: {
          colorId: product.colors[0].id,
          sizeId: product.colors[0].sizes[0].id,
          quantity: 1,
          productId: product.id,
          shopId: product.shopId,
          sizeName: product.colors[0].sizes[0].size,
          colorName: product.colors[0].color,
          image: product.images[0],
          price: product.price,
          name: product.name,
          shopName: product.shopInfo.name,
          discount: product.discount,
        },
        replace: Boolean(replace),
      })
    );

    setIsConflict(false);
    toast.success("Product added to cart");
  };

  return (
    <>
      <div className={`h-auto w-full bg-white p-[10px]`}>
        <div className="w-full relative cursor-pointer group/image overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            className="w-full object-contain"
            width={222}
            height={110}
          />
          {product.images[1] ? (
            <Image
              src={product.images[1]}
              alt={product.name}
              className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover/image:opacity-100 transition-all duration-300"
              width={222}
              height={110}
            />
          ) : (
            ""
          )}

          <ProductToolTip product={product} />
        </div>
        <Separator className="my-[10px]" />
        <div className="flex flex-col gap-[13px]">
          <p className="text-[10px] bg-main/20 w-fit py-[5px] px-[10px]">
            {product.categoryInfo?.label}
          </p>
          <Link
            href={`/product/${product.id}`}
            className="text-[14px] font-[700] hover:underline line-clamp-2"
          >
            {product.name}
          </Link>
          <div className="flex items-center justify-between">
            <p className="font-[700] text-main text-[19px]">
              ${getDiscountPrice(product.price, product.discount)}
            </p>
            {product.discount ? (
              <p className="font-[700] text-[14px] line-through text-gray-500 ">
                ${product.price}
              </p>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={() => handleAddToCart()}
            className="bg-main text-mainTxt py-[5px] px-[10px] w-fit font-[600] text-[14px]"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <CarConflictVendorWarning
        isOpen={isConflict}
        setIsOpen={setIsConflict}
        onReplace={() => handleAddToCart(true)}
        newVendor={product.shopInfo?.name}
        currentVendor={items[0]?.shopName || ""}
      />
    </>
  );
};

export default ProductCard;
