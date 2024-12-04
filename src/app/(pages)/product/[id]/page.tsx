import ProductImageSlide from "@/components/productDetails/ProductImageSlide";
import ProductOrderActions from "@/components/productDetails/ProductOrderActions";
import ProductReviews from "@/components/productDetails/ProductReviews";
import RelatedPropducts from "@/components/productDetails/RelatedPropducts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { baseUrl } from "@/redux/api/appSlice";
import { IProduct } from "@/types/product";
import { getDiscountPrice } from "@/utils/product";
import { getFallbackText } from "@/utils/trimText";
import { StarIcon, Store } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
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
    <div className="mx-auto py-8">
      <div className="flex flex-col lg:flex-row items-start justify-start gap-8 bg-white p-[25px] rounded-[15px]">
        <ProductImageSlide alt={product.name} images={product.images} />
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <span className="text-[14px] mr-2 italic line-through">
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
          <ProductOrderActions product={product} />{" "}
          <Link href={`/shop/${product.shopId}`} className="w-full mt-6 flex">
            <Card className="p-4 w-full">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage
                    src={product.shopInfo?.logo || ""}
                    alt="Shop Logo"
                  />
                  <AvatarFallback>
                    {getFallbackText(product.shopInfo?.name || "NC", 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Store className="w-4 h-4" />
                    <span>Sold By</span>
                  </div>
                  <h6 className="font-semibold hover:text-primary">
                    {product.shopInfo?.name}
                  </h6>
                </div>
              </div>
            </Card>
          </Link>
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
  );
}
