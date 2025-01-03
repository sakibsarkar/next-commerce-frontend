"use server";

import { baseUrl } from "@/redux/api/appSlice";
import { IProduct } from "@/types/product";
import ProductCard from "../card/ProductCard";
import { Separator } from "../ui/separator";

const Products = async () => {
  const res = await fetch(`${baseUrl}/product/get?limit=12`, {
    next: {
      revalidate: 20 * 60, // 20 minutes
    },
  });

  const data = (await res.json()) as { data: IProduct[] };

  return (
    <section id="latest" className="w-full mt-[50px]">
      <h4 className="text-[25px] font-[700] text-mainTxt">Latest Products</h4>
      <Separator className="my-[25px]" />
      <div className="gridResponsive gap-[15px]">
        {data?.data?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
};

export default Products;
