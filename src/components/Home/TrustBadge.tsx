const TrustBadge = () => {
  return (
    <section className="border-y border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container px-4 py-12 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-main">50K+</div>
            <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Happy Customers
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-main">98%</div>
            <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Satisfaction Rate
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-main">24/7</div>
            <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Customer Support
            </div>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="text-4xl font-bold text-main">15+</div>
            <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
              Years of Excellence
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadge;
