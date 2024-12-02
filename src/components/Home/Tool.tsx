"use client";
import { useAppSelector } from "@/redux/hook";
import ProductComparison from "../productComparison/ProductComparison";
const Tool = () => {
  const { products } = useAppSelector((state) => state.productComparison);
  return (
    <div className="fixed flex items-center gap-[20px] w-fit bottom-[50px] right-[50px]">
      <ProductComparison />
    </div>
  );
};

export default Tool;
