"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { IReview } from "@/types/review";
import { format } from "date-fns";
import { MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import ReviewResponse from "./ReviewResponse";

interface IProps {
  review: IReview;
}

const ReviewCard: React.FC<IProps> = ({ review }) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={review.userInfo?.image}
              alt={`${review.userInfo?.first_name} ${review.userInfo?.last_name}`}
            />
            <AvatarFallback>
              {review.userInfo?.first_name?.[0]}
              {review.userInfo?.last_name?.[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">
              {review.userInfo?.first_name} {review.userInfo?.last_name}
            </h3>
            <p className="text-xs text-gray-500">
              {format(new Date(review.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (review.rating || 0)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <p className="mt-2 text-sm">{review.description}</p>
      {review.reviewResponse ? (
        <div className="mt-2 bg-gray-100 p-2 rounded-md text-sm">
          <h4 className="font-semibold text-xs mb-1">Response:</h4>
          <p>{review.reviewResponse.description}</p>
        </div>
      ) : (
        <ReviewResponse reviewId={review.id} />
      )}
      <div className="mt-2 flex items-center space-x-2">
        <Image
          src={review.productInfo?.images?.[0] || "/placeholder.svg"}
          alt={review.productInfo?.name || "Product image"}
          width={70}
          height={70}
          className="rounded-sm"
        />
        <span className="text-xs text-gray-600 font-[600]">
          {review.productInfo?.name}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
