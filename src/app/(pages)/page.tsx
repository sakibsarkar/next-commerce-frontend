import HomeView from "@/views/HomeView";
import { loadStripe } from "@stripe/stripe-js";
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
export default function Home() {
  return <HomeView />;
}
