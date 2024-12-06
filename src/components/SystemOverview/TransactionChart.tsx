import { useGetMonthlyTransactionChartDataQuery } from "@/redux/features/admin/admin.api";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
} from "chart.js";
import { useEffect, useRef } from "react";

// Register Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const TransactionChart = () => {
  const { data } = useGetMonthlyTransactionChartDataQuery(undefined);
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!data || !chartRef.current) return;

    const chartInstance = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: [
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
        ],
        datasets: [
          {
            label: "Successful Transactions",
            data: data.data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            tension: 0.3, // Smooth curve
            pointBackgroundColor: "rgba(75, 192, 192, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(75, 192, 192, 1)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: "Monthly Successful Transactions",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Months",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Transaction Amount",
            },
          },
        },
      },
    });

    // Cleanup chart instance on component unmount
    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-[25px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TransactionChart;
