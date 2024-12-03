import { addToCart } from "@/redux/features/cart/cart.slice";
import { addToComparison } from "@/redux/features/product/productComparison.slice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IProduct } from "@/types/product";
import { Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { GoGitCompare } from "react-icons/go";
import { toast } from "sonner";
import CarConflictVendorWarning from "../shared/CarConflictVendorWarning";

interface IProps {
  product: IProduct;
}

const ProductToolTip: React.FC<IProps> = ({ product }) => {
  const { items } = useAppSelector((state) => state.cart);
  const [isConflict, setIsConflict] = useState(false);
  const dispatch = useAppDispatch();
  const addToCompare = () => {
    dispatch(addToComparison(product));
  };

  const handleAddToCart = (replace?: boolean) => {
    const isSameShop = items.find((item) => item.shopId === product.shopId);
    if (!isSameShop && !replace && items.length > 0) {
      setIsConflict(true);
      return;
    }

    const payload = {
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
    };

    dispatch(
      addToCart({
        payload,
        replace: Boolean(replace),
      })
    );

    setIsConflict(false);
    toast.success("Product added to cart");
  };
  return (
    <>
      <div
        className="absolute z-20 top-[-100%] left-0 backdrop-blur-sm w-full h-full center  group-hover/image:top-0 overflow-hidden"
        style={{ transition: "0.3s" }}
      >
        <div className="flex items-center justify-center border-[1px] border-primaryMat bg-white rounded-[3px] overflow-hidden p-[5px]">
          <button
            className="p-[5px] border-x-[1px] border-borderColor hover:bg-[#f0f0f0]"
            onClick={() => handleAddToCart()}
          >
            <ShoppingCart className="w-[50px]" />
          </button>
          <button
            onClick={addToCompare}
            className="p-[5px] border-r-[1px] border-borderColor hover:bg-[#f0f0f0]"
          >
            <GoGitCompare className="w-[50px]" />
          </button>
          <Link
            href={`/products/${product.id}}`}
            className="p-[5px] border-r-[1px] border-borderColor hover:bg-[#f0f0f0]"
          >
            <Eye className="w-[50px]" />
          </Link>
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

export default ProductToolTip;
