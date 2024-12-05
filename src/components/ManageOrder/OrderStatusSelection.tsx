"use client";

const statuses = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "On Shipment",
    value: "ON_SHIPMENT",
  },
  {
    label: "Shipped",
    value: "SHIPPED",
  },
];

interface IProps {
  onStatusChange: (status: string) => void;
}

const OrderStatusSelection: React.FC<IProps> = ({ onStatusChange }) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    onStatusChange(newValue);
  };

  return (
    <div className="w-full max-w-xs mb-[25px]">
      <label
        htmlFor="status-select"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Order Status
      </label>
      <select
        id="status-select"
        onChange={handleStatusChange}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        {statuses.map((status) => (
          <option key={status.value} value={status.value}>
            {status.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderStatusSelection;
