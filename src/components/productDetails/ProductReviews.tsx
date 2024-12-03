"use client";
// import { useGetReviewsByProductIDQuery } from "@/redux/features/review/review.api";
// import { countAmmount } from "@/utils/countAmmount";
import { MessageSquare } from "lucide-react";
import { Card, CardContent } from "../ui/card";
const ProductReviews = ({ productId }: { productId: string }) => {
  // const { data } = useGetReviewsByProductIDQuery(productId);
  const data = { data: [] };
  const reviews = data?.data || [];


  // const totalReviews = countAmmount(reviews.length);
  const totalReviews =0

  return (
    <section className="mt-[40px] bg-white p-[15px]">
      <h1
        className={`px-[10px] text-[40px] font-[400] w-full border-b-[1px] border-borderColor`}
      >
        Reviews ({totalReviews})
      </h1>

      {reviews.length === 0 ? (
        <Card className="w-full mt-[20px]">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
            <p className="text-sm text-muted-foreground text-center">
              Be the first to share your thoughts about this product!
            </p>
          </CardContent>
        </Card>
      ) : (
        ""
      )}
    </section>
  );
};

export default ProductReviews;
