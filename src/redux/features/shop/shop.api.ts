import { api } from "@/redux/api/appSlice";
import { IShop, IShopInfo } from "@/types/shop";

const shopInfoApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getShopInfoById: builder.query<{ data: IShopInfo }, string>({
      query: (shopId) => {
        return {
          url: `/shop/get/${shopId}`,
          method: "GET",
        };
      },
      providesTags: ["shop"],
    }),
    getAllShops: builder.query<
      { data: IShop[]; meta: { totalDoc: number } },
      Record<string, unknown>
    >({
      query: (query) => {
        const entiries = Object.entries(query);
        let queryString = "";
        entiries.forEach(([key, value], index) => {
          if (value) {
            if (index === 0) {
              queryString += `${key}=${value}`;
            } else {
              queryString += `&${key}=${value}`;
            }
          }
        });

        return {
          url: `/shop/get-all?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["shop"],
    }),
    getOwnerShop: builder.query<
      { data: Omit<IShopInfo, "totalProduct" | "isFollowing"> },
      undefined
    >({
      query: () => {
        return {
          url: `/shop/my-shop`,
          method: "GET",
        };
      },
      providesTags: ["shop"],
    }),

    toggleShopFollowing: builder.mutation<{ data: IShopInfo }, string>({
      query: (shopId) => {
        return {
          url: `/shop/follow-unfollow/${shopId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["shop", "follow"],
    }),
    createShop: builder.mutation<
      { data: IShopInfo },
      Pick<IShop, "name" | "logo" | "description">
    >({
      query: (payload) => {
        return {
          url: `/shop/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["shop"],
    }),
    updateShop: builder.mutation<
      { data: IShopInfo },
      Pick<IShop, "name" | "logo" | "description">
    >({
      query: (payload) => {
        return {
          url: `/shop/update`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["shop"],
    }),
  }),
});
export const {
  useGetShopInfoByIdQuery,
  useGetAllShopsQuery,
  useToggleShopFollowingMutation,
  useCreateShopMutation,
  useGetOwnerShopQuery,
  useUpdateShopMutation,
} = shopInfoApi;
