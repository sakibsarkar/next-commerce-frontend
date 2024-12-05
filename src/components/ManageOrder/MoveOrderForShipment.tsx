import { useMoveOrderForShipmentMutation } from "@/redux/features/order/order.api";
import { TOrderStatus } from "@/types/order";
import React from "react";
import { FcShipped } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";
import { toast } from "sonner";
import { Button } from "../ui/button";
interface IProps {
  status: TOrderStatus;
  orderId: string;
}

const MoveOrderForShipment: React.FC<IProps> = ({ status, orderId }) => {
  const [moveForShipment, { isLoading }] = useMoveOrderForShipmentMutation();
  const handleMoveForShipment = async () => {
    if (isLoading) {
      return;
    }
    try {
      const res = await moveForShipment(orderId);

      const error = res.error as any;

      if (error) {
        toast.error(error?.data?.message || "Something went wrong");
        return;
      }

      toast.success("Order moved for shipment successfully");
    } catch (error) {}
  };

  return (
    <>
      {status === "SHIPPED" ? (
        <p className="center gap-[8px] text-green-600 text-[20px]">
          <FcShipped />
          Shipped
        </p>
      ) : status === "ON_SHIPMENT" ? (
        <p className="center gap-[8px] text-main text-[20px]">
          <TbTruckDelivery />
          On Shipment
        </p>
      ) : (
        <Button
          className="center gap-[8px] bg-main"
          disabled={isLoading}
          onClick={handleMoveForShipment}
        >
          <TbTruckDelivery className="text-[18px]" />
          {isLoading ? "Loading..." : "Move For Shipment"}
        </Button>
      )}
    </>
  );
};

export default MoveOrderForShipment;
