import { api } from "@/redux/api/appSlice";

const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation<{ data: string }, FormData>({
      query: (payload) => {
        return {
          url: `/upload/single`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["upload"],
    }),
    uploadMultipleFile: builder.mutation<{ data: string[] }, FormData>({
      query: (payload) => {
        return {
          url: `/upload/multiple`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["upload"],
    }),
  }),
});
export const { useUploadSingleFileMutation, useUploadMultipleFileMutation } =
  uploadApi;
