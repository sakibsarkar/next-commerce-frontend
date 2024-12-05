"use client";

import ReviewCard from "@/components/ManageReview/ReviewCard";
import { NextPagination } from "@/components/uiElements/NextPagination";
import { useGetOwnerShopReviewsQuery } from "@/redux/features/review/review.api";
import { useState } from "react";

const ManageReviewsView = () => {
  const [page, setPage] = useState(1);
  const { data } = useGetOwnerShopReviewsQuery({ page, limit: 10 });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Product Reviews</h1>
      <div className="flex flex-col w-full gap-[15px] mb-[15px]">
        {data?.data?.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <NextPagination
        className="mt-4"
        totalDocs={data?.meta.totalDoc || 0}
        onPageChange={setPage}
      />
    </div>
  );
};

export default ManageReviewsView;
