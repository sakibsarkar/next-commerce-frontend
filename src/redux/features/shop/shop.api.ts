import { api } from "@/redux/api/appSlice";
import { IShopInfo } from "@/types/shop";

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
 
    toggleShopFollowing: builder.mutation<{ data: IShopInfo }, string>({
      query: (shopId) => {
        return {
          url: `/shop/follow-unfollow/${shopId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["shop","follow"],
    }),
  }),
});
export const { useGetShopInfoByIdQuery, useToggleShopFollowingMutation } =
  shopInfoApi;
