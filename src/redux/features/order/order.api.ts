import { api } from "@/redux/api/appSlice";
import { IOrder } from "@/types/order";

const orderApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (payload) => {
        return {
          url: `/order/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["order"],
    }),
    moveOrderForShipment: builder.mutation({
      query: (orderId: string) => {
        return {
          url: `/order/move-to-shipment/${orderId}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["order"],
    }),
    getUserOrders: builder.query<
      { data: IOrder[]; meta: { totalDoc: number } },
      Record<string, unknown>
    >({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (value) {
            if (index === 0) {
              queryString += `${key}=${value}`;
            } else {
              queryString += `&${key}=${value}`;
            }
          }
        });
        return {
          url: `/order/get-user?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
    getVendorsOrders: builder.query<
      { data: IOrder[]; meta: { totalDoc: number } },
      Record<string, unknown>
    >({
      query: (query) => {
        const entries = Object.entries(query);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (value) {
            if (index === 0) {
              queryString += `${key}=${value}`;
            } else {
              queryString += `&${key}=${value}`;
            }
          }
        });
        return {
          url: `/order/get-vendor?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["order"],
    }),
  }),
});
export const {
  useCreateOrderMutation,
  useGetUserOrdersQuery,
  useGetVendorsOrdersQuery,
  useMoveOrderForShipmentMutation,
} = orderApi;
