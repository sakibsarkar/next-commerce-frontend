import { BadgeCheck, Clock, Gift, Truck } from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 bg-gray-50/50 dark:bg-gray-950/50">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Why Shop With Us
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Discover the advantages of choosing our store for your shopping
            needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center text-center transition-all hover:shadow-lg">
            <div className="mb-4 rounded-full bg-main dark:bg-gray-800 p-4">
              <Truck className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Free Shipping
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enjoy free shipping on all orders over $50. Quick and reliable
              delivery to your doorstep.
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center text-center transition-all hover:shadow-lg">
            <div className="mb-4 rounded-full bg-main dark:bg-gray-800 p-4">
              <BadgeCheck className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Quality Guarantee
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              All our products are carefully selected to ensure the highest
              quality standards.
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center text-center transition-all hover:shadow-lg">
            <div className="mb-4 rounded-full bg-main dark:bg-gray-800 p-4">
              <Clock className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
              24/7 Support
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Our dedicated team is available around the clock to assist you
              with any questions.
            </p>
          </div>
          <div className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center text-center transition-all hover:shadow-lg">
            <div className="mb-4 rounded-full bg-main dark:bg-gray-800 p-4">
              <Gift className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">
              Special Rewards
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Earn points with every purchase and unlock exclusive rewards and
              discounts.
            </p>
          </div>
        </div>
        <div className="mt-16 flex justify-center">
          <div className="relative rounded-xl bg-white dark:bg-gray-900 p-8 max-w-2xl shadow-sm">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                100% Satisfaction Guaranteed
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Not completely happy with your purchase? Return it within 30
                days for a full refund. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
