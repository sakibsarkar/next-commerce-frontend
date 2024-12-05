import { TOrderStatus } from "@/types/order";

export const displayOrderStatus = (status: TOrderStatus) => {
  switch (status) {
    case "PENDING":
      return "Pending";
    case "ON_SHIPMENT":
      return "On Shipment";
    case "SHIPPED":
      return "Shipped";
    default:
      return "Unknown";
  }
};
