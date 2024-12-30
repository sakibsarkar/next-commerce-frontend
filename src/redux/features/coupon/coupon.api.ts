import { api } from "@/redux/api/appSlice";
import { ICoupon } from "@/types/coupon";

const couponApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createCoupon: builder.mutation<
      { data: ICoupon },
      Pick<ICoupon, "code" | "discount" | "productId">
    >({
      query: (payload) => {
        return {
          url: `/coupon/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["coupon"],
    }),
    deleteCouponById: builder.mutation<{ data: ICoupon }, string>({
      query: (couponId) => {
        return {
          url: `/coupon/delete/${couponId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["coupon"],
    }),
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
    getVendorCouponList: builder.query<
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
          url: `/coupon/get-vendor-coupon?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["coupon"],
    }),
  }),
});
export const {
  useCreateCouponMutation,
  useDeleteCouponByIdMutation,
  useCheckCouponMutation,
  useGetCouponListQuery,
  useGetVendorCouponListQuery,
} = couponApi;
