import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { IReview } from "@/types/review";
import { ChevronDown, MessageCircle, Star, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
interface IProps {
  review: IReview;
}

const ProductReviewCard: React.FC<IProps> = ({ review }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage
              src={review.userInfo?.image}
              alt={`${review.userInfo?.first_name} ${review.userInfo?.last_name}`}
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{`${review.userInfo?.first_name} ${review.userInfo?.last_name}`}</h3>
            <p className="text-sm text-muted-foreground">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < review.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4">{review.description}</p>
        {review.image ? (
          <Image
            src={review.image}
            alt="Review image"
            className="mt-2 rounded-md"
            width={200}
            height={200}
          />
        ) : (
          ""
        )}
        {review.reviewResponse && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-4">
            <div className="flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src={review.reviewResponse.shopInfo.logo}
                  alt={review.reviewResponse.shopInfo.name}
                />
                <AvatarFallback>
                  {review.reviewResponse.shopInfo.name[0]}
                </AvatarFallback>
              </Avatar>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto font-normal"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {isOpen ? "Hide response" : "Show response"} from{" "}
                  {review.reviewResponse.shopInfo.name}{" "}
                  <ChevronDown
                    className={`w-4 h-4 ${isOpen ? "rotate-180" : ""}`}
                    style={{ transition: "transform 0.4s ease-in-out" }}
                  />
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="mt-2">
              <Card>
                <CardContent className="p-4">
                  <p className="text-sm">{review.reviewResponse.description}</p>
                </CardContent>
              </Card>
            </CollapsibleContent>
          </Collapsible>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductReviewCard;
