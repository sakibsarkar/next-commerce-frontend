import { api } from "@/redux/api/appSlice";
import { IPayment } from "@/types/payment";

interface ISystemOverview {
  totalActiveUser: number;
  totalActiveVendor: number;
  totalActiveShop: number;
  totalPayment: number;
}

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSystemOverview: builder.query<{ data: ISystemOverview }, undefined>({
      query: () => {
        return {
          url: `/admin/system-overview`,
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),
    getTransactionHistory: builder.query<
      { data: IPayment[] },
      Record<string, unknown>
    >({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (index === 0) {
            queryString += `?${key}=${value}`;
          } else {
            queryString += `&${key}=${value}`;
          }
        });

        return {
          url: `/admin/transactions?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),
    getMonthlyTransactionChartData: builder.query<
      { data: number[] },
      undefined
    >({
      query: () => {
        return {
          url: `/admin/transaction-data`,
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),
  }),
});
export const {
  useGetSystemOverviewQuery,
  useGetMonthlyTransactionChartDataQuery,
  useGetTransactionHistoryQuery
} = adminApi;
