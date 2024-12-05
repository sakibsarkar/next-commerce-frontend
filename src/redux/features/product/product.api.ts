import { api } from "@/redux/api/appSlice";
import { IProduct } from "@/types/product";

const uploadApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { data: IProduct[]; meta: { totalDoc: number } },
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
          url: `/product/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getUsersShopProdcuts: builder.query<
      { data: IProduct[]; meta: { totalDoc: number } },
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
          url: `/product/my-shop?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getProductById: builder.query<{ data: IProduct }, string>({
      query: (id) => {
        return {
          url: `/product/get/${id}`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getFollowedShopProducts: builder.query<{ data: IProduct[] }, number>({
      query: (limit = 10) => {
        return {
          url: `/product/shop-follow?limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["product", "follow"],
    }),
    checkIsProductExistByName: builder.mutation<{ data: boolean }, string>({
      query: (name) => {
        return {
          url: `/product/check-product-name`,
          method: "POST",
          body: { productName: name },
        };
      },
    }),
    getProductSuggestion: builder.query<{ data: IProduct[] }, string>({
      query: (id) => {
        return {
          url: `/product/get?searchTerm=${id}&fields=name,price,images,discount,stock`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    createProduct: builder.mutation<
      { data: IProduct },
      Record<string, unknown>
    >({
      query: (payload) => ({
        url: `/product/create`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation<
      { data: IProduct },
      { payload: Partial<IProduct>; id: string }
    >({
      query: ({ payload, id }) => ({
        url: `/product/update/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProductById: builder.mutation<{ data: IProduct }, String>({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    duplicateProduct: builder.mutation<{ data: IProduct }, String>({
      query: (productId) => ({
        url: `/product/duplicate/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useGetProductSuggestionQuery,
  useCheckIsProductExistByNameMutation,
  useGetFollowedShopProductsQuery,
  useCreateProductMutation,
  useGetUsersShopProdcutsQuery,
  useDuplicateProductMutation,
  useDeleteProductByIdMutation
} = uploadApi;
