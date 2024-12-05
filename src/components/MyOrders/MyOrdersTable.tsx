import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { IOrder } from "@/types/order";
import { getFallbackText } from "@/utils/trimText";
import Image from "next/image";
import OrderDetails from "../shared/OrderDetailDialog";
import OrderCardSkeleton from "../skeleton/OrderCardSkeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import AddReview from "./AddReview";
interface IProps {
  orders: IOrder[];
  isLoading: boolean;
}

const MyOrdersTable: React.FC<IProps> = ({ orders, isLoading }) => {
  return (
    <div className="w-full space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="w-full">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-[14px] font-semibold flex items-center gap-[5px]">
                <Avatar>
                  <AvatarImage src={order.shopInfo?.logo || ""} alt="@shadcn" />
                  <AvatarFallback>
                    {getFallbackText(order.shopInfo?.name || "NC", 2)}
                  </AvatarFallback>
                </Avatar>
                {order.shopInfo?.name}
              </h3>
              <Badge variant="secondary">{order.status}</Badge>
            </div>
            <Separator className="my-[10px]" />
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-20 h-20 relative">
                <Image
                  src={order.productInfo.images[0]}
                  alt={order.productInfo.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h4 className="font-medium">{order.productInfo.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Color: {order.color}, Size: {order.size}
                </p>
                <div className="flex items-center gap-8 mt-2">
                  <span className="font-medium">
                    $ {order.total.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">
                    Qty: {order.quantity}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <OrderDetails order={order} displaySellter={true} />
                {!order.hasReviewGiven && <AddReview orderId={order.id} />}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
      {isLoading ? (
        <>
          <OrderCardSkeleton />
          <OrderCardSkeleton />
          <OrderCardSkeleton />
          <OrderCardSkeleton />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyOrdersTable;
