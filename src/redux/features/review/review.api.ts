import { api } from "@/redux/api/appSlice";
import { IReview } from "@/types/review";

const reviewApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation<
      { data: string },
      Pick<IReview, "description" | "images" | "rating">
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
  }),
});
export const { useCreateReviewMutation } = reviewApi;
