import { api } from "@/redux/api/appSlice";

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
} = adminApi;
