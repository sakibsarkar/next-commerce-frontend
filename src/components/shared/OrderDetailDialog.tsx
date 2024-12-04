import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IOrder } from "@/types/order";
import { formatDate } from "date-fns";
import {
  Calendar,
  CreditCard,
  MapPin,
  Package,
  Phone,
  Store,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface IProps {
  order: IOrder;
  displaySellter?: boolean;
}

const OrderDetails: React.FC<IProps> = ({ order, displaySellter }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Order Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0 w-24 h-24 relative">
              <Image
                src={order.productInfo.images[0]}
                alt={order.productInfo.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div>
              <h3 className="font-medium text-lg">{order.productInfo.name}</h3>
              <p className="text-sm text-muted-foreground">
                Color: {order.color}, Size: {order.size}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">{order.status}</Badge>
                <span className="text-sm text-muted-foreground">
                  Order ID: {order.id.slice(0, 8)}
                </span>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Order Summary</h4>
              <p className="flex items-center gap-2">
                <Calendar size={16} />
                {formatDate(new Date(order.createdAt), "MMM dd, yyyy")}
              </p>
              <p className="flex items-center gap-2">
                <Package size={16} />
                Quantity: {order.quantity}
              </p>
              <p className="flex items-center gap-2">
                <CreditCard size={16} />
                Price: $ {order.productInfo.price.toFixed(2)}
              </p>
              <p className="font-semibold flex items-center gap-2">
                <CreditCard size={16} />
                Total: $ {order.total.toFixed(2)}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Shipping Information</h4>
              <p className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>{order.shippingInfo?.detailed_address}</span>
              </p>
              <p className="ml-6">
                {order.shippingInfo?.city}, {order.shippingInfo?.zip_code}
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} />
                {order.shippingInfo?.phone}
              </p>
            </div>
          </div>
          <Separator />
          {order.shopInfo && displaySellter ? (
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={order.shopInfo?.logo || ""} alt="@shadcn" />
                <AvatarFallback>NC</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  <Store size={16} />
                  {order.shopInfo?.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Seller information
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetails;
