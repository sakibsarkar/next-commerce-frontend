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
  }),
});
export const {useCheckCouponMutation} = couponApi;
