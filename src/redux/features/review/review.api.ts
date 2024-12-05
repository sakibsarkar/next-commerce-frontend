import { api } from "@/redux/api/appSlice";
import { IReview } from "@/types/review";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<
      { data: IReview },
      Pick<IReview, "description" | "image" | "rating">
    >({
      query: (payload) => {
        return {
          url: `/review/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["review"],
    }),
    getProductReviewsById: builder.query<
      { data: IReview[]; meta: { totalDoc: number } },
      {
        productId: string;
        query: Record<string, unknown>;
      }
    >({
      query: ({ productId, query }) => {
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
          url: `/review/get/${productId}?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
    getOwnerShopReviews: builder.query<
      { data: IReview[]; meta: { totalDoc: number } },
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
          url: `/review/my-shop?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["review"],
    }),
    createReviewResponse: builder.mutation<
      { data: IReview[] },
      { description: string; reviewId: string }
    >({
      query: (payload) => {
        return {
          url: `/review/reply`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["review"],
    }),
  }),
});
export const {
  useCreateReviewMutation,
  useGetOwnerShopReviewsQuery,
  useCreateReviewResponseMutation,
  useGetProductReviewsByIdQuery,
} = reviewApi;
