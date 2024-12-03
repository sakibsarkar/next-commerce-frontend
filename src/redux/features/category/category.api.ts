import { api } from "@/redux/api/appSlice";
import { ICategory } from "@/types/category";

const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<
      { data: ICategory[]; totalDoc: number },
      Record<string, unknown>
    >({
      query: (payload) => {
        const entries = Object.entries(payload);
        let queryString = "";
        entries.forEach(([key, value], index) => {
          if (index === 0) {
            queryString += `${key}=${value}`;
          } else {
            queryString += `&${key}=${value}`;
          }
        });
        return {
          url: `/category/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["category"],
    }),
    createCategory: builder.mutation<{ data: ICategory }, Partial<ICategory>>({
      query: (payload) => {
        return {
          url: `/category/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["category"],
    }),
    updateCategory: builder.mutation<{ data: ICategory }, Partial<ICategory>>({
      query: (payload) => {
        return {
          url: `/category/update/${payload.id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["category"],
    }),
  }),
});
export const {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
