import { IProduct } from "@/types/product";
import ProductCard from "../card/ProductCard";
import ProductSkeleton from "../skeleton/ProductSkeleton";
import { Separator } from "../ui/separator";

interface IProps {
  products: IProduct[];
  isLoading: boolean;
}

const DisplayShopProducts: React.FC<IProps> = ({ products, isLoading }) => {
  return (
    <div className="w-full">
      <h4 className="text-[25px] font-[700] text-mainTxt">Latest from Shop</h4>
      <Separator className="my-[25px]" />
      <div className="gridResponsive gap-[15px]">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}

        {isLoading && (
          <>
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
            <ProductSkeleton />
          </>
        )}
      </div>
    </div>
  );
};

export default DisplayShopProducts;
