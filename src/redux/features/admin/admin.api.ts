import { api } from "@/redux/api/appSlice";
import { IPayment } from "@/types/payment";
import { IShop } from "@/types/shop";
import { TRole, TUser } from "@/types/user";

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
    getVendorUserChartData: builder.query<
      { data: { role: TRole; percentage: number }[] },
      undefined
    >({
      query: () => {
        return {
          url: `/admin/vendor-user-chart-data`,
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),
    getTransactionHistory: builder.query<
      { data: IPayment[]; meta: { totalDoc: number } },
      Record<string, unknown>
    >({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (!value) {
            return;
          }
          if (index === 0) {
            queryString += `${key}=${value}`;
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
    getUserList: builder.query<
      { data: TUser[]; meta: { totalDoc: number } },
      Record<string, unknown>
    >({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (!value) {
            return;
          }
          if (index === 0) {
            queryString += `${key}=${value}`;
          } else {
            queryString += `&${key}=${value}`;
          }
        });

        return {
          url: `/admin/user-list?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["admin"],
    }),
    getShopList: builder.query<
      { data: IShop[]; meta: { totalDoc: number } },
      Record<string, unknown>
    >({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (!value) {
            return;
          }
          if (index === 0) {
            queryString += `${key}=${value}`;
          } else {
            queryString += `&${key}=${value}`;
          }
        });

        return {
          url: `/admin/shop-list?${queryString}`,
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

    deleteUserById: builder.mutation<{ data: TUser }, string>({
      query: (userId) => {
        return {
          url: `/admin/delete-user/${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["admin"],
    }),
    toggleUserSuspensionById: builder.mutation<{ data: TUser }, string>({
      query: (userId) => {
        return {
          url: `/admin/toggle-suspension/${userId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["admin"],
    }),
    toggleShopBlacklistById: builder.mutation<{ data: IShop }, string>({
      query: (shopId) => {
        return {
          url: `/admin//toggle-shop-blacklist/${shopId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["admin"],
    }),
  }),
});
export const {
  useGetSystemOverviewQuery,
  useGetVendorUserChartDataQuery,
  useGetMonthlyTransactionChartDataQuery,
  useGetTransactionHistoryQuery,
  useGetUserListQuery,
  useDeleteUserByIdMutation,
  useToggleUserSuspensionByIdMutation,
  useGetShopListQuery,
  useToggleShopBlacklistByIdMutation,
} = adminApi;
