import { api } from "@/redux/api/appSlice";
import { ICoupon } from "@/types/coupon";

const couponApi = api.injectEndpoints({
  endpoints: (builder) => ({
    checkCoupon: builder.mutation<
      { data: ICoupon | null },
      { couponCode: string; productIds: string[] }
    >({
      query: (payload) => {
        return {
          url: `/coupon/get-coupon-by-code`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["coupon"],
    }),
    getCouponList: builder.query<
      { data: ICoupon[]; meta: { totalDoc: number } },
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
          url: `/coupon/get-coupon-list?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["coupon"],
    }),
  }),
});
export const { useCheckCouponMutation, useGetCouponListQuery } = couponApi;
