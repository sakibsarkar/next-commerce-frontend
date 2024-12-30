"use client";
import { useGetMonthlyTransactionChartDataQuery } from "@/redux/features/admin/admin.api";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const TransactionChart = () => {
  const { data } = useGetMonthlyTransactionChartDataQuery(undefined);

  // Prepare data for Recharts
  const chartData =
    data?.data.map((value, index) => ({
      month: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][index],
      transactions: value,
    })) || [];

  const year = new Date().getFullYear();
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full h-96">
      <h2 className="text-2xl font-bold mb-4">
        Monthly Transaction of {year}{" "}
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="transactions"
            stroke="#4bc0c0"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionChart;
