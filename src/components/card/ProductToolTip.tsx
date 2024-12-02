import { addToComparison } from "@/redux/features/product/productComparison.slice";
import { useAppDispatch } from "@/redux/hook";
import { IProduct } from "@/types/product";
import { Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { GoGitCompare } from "react-icons/go";

interface IProps {
  product: IProduct;
}

const ProductToolTip: React.FC<IProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const addToCompare = () => {
    dispatch(addToComparison(product));
  };

  const handleAddToCart = () => {
    console.log("Add to cart clicked");
  };

  return (
    <div
      className="absolute z-20 top-[-100%] left-0 backdrop-blur-sm w-full h-full center  group-hover/image:top-0 overflow-hidden"
      style={{ transition: "0.3s" }}
    >
      <div className="flex items-center justify-center border-[1px] border-primaryMat bg-white rounded-[3px] overflow-hidden p-[5px]">
        <button
          className="p-[5px] border-x-[1px] border-borderColor hover:bg-[#f0f0f0]"
          onClick={handleAddToCart}
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
  );
};

export default ProductToolTip;
