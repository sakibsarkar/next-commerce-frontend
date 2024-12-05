import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IOrder } from "@/types/order";
import { displayOrderStatus } from "@/utils/displayOrderStatus";
import OrderDetails from "../shared/OrderDetailDialog";
import { Card, CardContent } from "../ui/card";
import NoTableDataFound from "../uiElements/NoTableDataFound";
import MoveOrderForShipment from "./MoveOrderForShipment";

interface IProps {
  orders: IOrder[];
  isLoading: boolean;
}

const OrderTable: React.FC<IProps> = ({ orders, isLoading }) => {
  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  #{order.id.slice(0, 8)}...
                </TableCell>
                <TableCell>{order.productInfo.name}</TableCell>
                <TableCell>
                  {order.color}, {order.size}, Qty: {order.quantity}
                </TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{displayOrderStatus(order.status)}</TableCell>
                <TableCell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <OrderDetails
                    order={order}
                    footerContent={
                      <MoveOrderForShipment
                        orderId={order.id}
                        status={order.status}
                      />
                    }
                  />
                </TableCell>
              </TableRow>
            ))}

            {!isLoading && orders.length === 0 && <NoTableDataFound span={7} />}
          </TableBody>
        </Table>
      </CardContent>

      {isLoading ? (
        <span className="absolute top-0 right-0 w-full h-full bg-[#ffffffc2] center">
          Loading...
        </span>
      ) : (
        ""
      )}
    </Card>
  );
};

export default OrderTable;
