import ProductImageSlide from "@/components/productDetails/ProductImageSlide";
import ProductOrderActions from "@/components/productDetails/ProductOrderActions";
import ProductReviews from "@/components/productDetails/ProductReviews";
import RelatedPropducts from "@/components/productDetails/RelatedPropducts";
import { Badge } from "@/components/ui/badge";
import { baseUrl } from "@/redux/api/appSlice";
import { IProduct } from "@/types/product";
import { getDiscountPrice } from "@/utils/product";
import { StarIcon } from "lucide-react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: {
    default: "PRODUCT DETAILS",
    template: "%s | FEROX - Premium Clothing for Every Occasion",
  },
};
export default async function ProductDetails({ params }: any) {
  const res = await fetch(`${baseUrl}/product/get/${params.id}`, {
    cache: "no-store",
  });
  const data = await res.json();

  const product = data.data as IProduct;

  return (
    <div className="layout_container">
      <div className="mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-[25px] rounded-[15px]">
          <ProductImageSlide alt={product.name} images={product.images} />
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <span className="text-2xl mr-2 italic line-through">
              ${product.price?.toFixed(2)}
            </span>
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-2 font-bold">
                ${getDiscountPrice(product.price, product.discount)?.toFixed(2)}
              </span>
              {product.tag && <Badge className="bg-main">{product.tag}</Badge>}
            </div>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.avgRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.avgRating?.toFixed(1)}
              </span>
            </div>

            <ProductOrderActions product={product} />
          </div>
        </div>

        <div className="flex flex-col gap-[20px] mt-[30px] bg-white p-[15px]">
          <h1
            className={`px-[10px] text-[40px] font-[400] w-full border-b-[1px] border-borderColor`}
          >
            Product Description
          </h1>
          <div
            className={`reset-all`}
            dangerouslySetInnerHTML={{ __html: product.description }}
          ></div>
        </div>

        <ProductReviews productId={product.id} />
        <RelatedPropducts categoryId={product.categoryId} />
      </div>
    </div>
  );
}
