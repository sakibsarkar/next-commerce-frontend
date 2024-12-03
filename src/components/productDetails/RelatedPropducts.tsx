"use server";
import { baseUrl } from "@/redux/api/appSlice";
import { IProduct } from "@/types/product";
import ProductCard from "../card/ProductCard";
const RelatedPropducts = async ({ categoryId }: { categoryId: string }) => {
  const url = baseUrl + `/product/get-related/${categoryId}`;

  const res = await fetch(url, {
    next: {
      revalidate: 10 * 60,
    },
  });
  const data = (await res.json()) as { data: IProduct[] };
  return (
    <div className="mt-[30px]">
      <h1
        className={`px-[10px] text-[40px] font-[400] w-full border-b-[1px] border-borderColor`}
      >
        Related Products
      </h1>

      <div className="gridResponsive gap-[10px] sm:gap-[20px] mt-[20px]">
        {data?.data?.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedPropducts;
