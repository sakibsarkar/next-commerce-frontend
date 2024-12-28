import { api } from "@/redux/api/appSlice";
import { INewsLatter } from "@/types/newsLetter";

const newsLetterApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createNewsLetter: builder.mutation<
      { data: INewsLatter },
      { email: string }
    >({
      query: (payload) => {
        return {
          url: `/news-latter/create`,
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["newsLetter"],
    }),
    getNewsLetters: builder.query<
      { data: INewsLatter[] },
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
          url: `/news-latter/get?${queryString}`,
          method: "GET",
        };
      },
      providesTags: ["newsLetter"],
    }),
  }),
});
export const { useCreateNewsLetterMutation , useGetNewsLettersQuery} = newsLetterApi;
