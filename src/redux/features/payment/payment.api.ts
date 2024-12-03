import { api } from "@/redux/api/appSlice";

const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<
      { data: { client_secret: string } },
      number
    >({
      query: (amount) => {
        return {
          url: `/payment/create-payment-intent`,
          method: "POST",
          body: {
            amount: amount,
          },
        };
      },
      extraOptions: {
        keepUnusedDataFor: 0,
      },
    }),
  }),
});
export const { useCreatePaymentIntentMutation } = paymentApi;
