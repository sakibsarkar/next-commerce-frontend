import { api } from "@/redux/api/appSlice";
import { IShippingAddress } from "@/types/ShippingAdress";

const shippingAddressApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserShippingAddresses: builder.query<
      { data: IShippingAddress[] },
      undefined
    >({
      query: () => {
        return {
          url: `/shipping-address/get`,
          method: "GET",
        };
      },
      providesTags: ["shippingAddress"],
    }),
    createShippingAddress: builder.mutation<
      { data: IShippingAddress },
      Omit<IShippingAddress, "id" | "userId" | "userInfo">
    >({
      query: (payload) => {
        return {
          url: `/shipping-address/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["shippingAddress"],
    }),
  }),
});
export const {
  useGetUserShippingAddressesQuery,
  useCreateShippingAddressMutation,
} = shippingAddressApi;
