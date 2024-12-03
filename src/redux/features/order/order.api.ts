import { api } from "@/redux/api/appSlice";

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
  }),
});
export const { useCreateOrderMutation } = orderApi;
