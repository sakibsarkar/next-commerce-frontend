"use client";
import { useGetVendorUserChartDataQuery } from "@/redux/features/admin/admin.api";
import { ArcElement, Chart, Legend, PieController, Tooltip } from "chart.js";
import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Register Chart.js components
Chart.register(PieController, ArcElement, Tooltip, Legend);

const VendorAndUserPieChart = () => {
  const { data } = useGetVendorUserChartDataQuery(undefined);
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    // Destroy any existing chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Extract labels and data
    const labels = data?.data?.map((item) => item.role) || [];
    const percentages =
      data?.data?.map((item) => parseFloat(item.percentage.toString())) || [];

    // Create a new chart instance
    chartInstanceRef.current = new Chart(chartRef.current, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: percentages,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Example colors
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem: any) => {
                const value = tooltipItem.raw as number;
                return `${value.toFixed(2)}%`;
              },
            },
          },
        },
      },
    });

    // Cleanup chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <Card className="w-full xl:w-[430.66px] h-96 shrink-0">
      <CardHeader>
        <CardTitle>Vendor and User Percentage</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-full flex justify-center">
        <div className="w-[350px] h-[300px] center">
          <canvas ref={chartRef} className="!w-[250px] !h-auto"></canvas>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorAndUserPieChart;
