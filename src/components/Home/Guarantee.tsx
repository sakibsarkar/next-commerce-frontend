import { Shield } from "lucide-react";

const Guarantee = () => {
  return (
    <section className="border-t border-gray-200 dark:border-gray-800">
      <div className="py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl bg-white dark:bg-gray-900 p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-3">
              <Shield className="h-6 w-6 text-main" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Secure Shopping Guarantee
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Shop with confidence. Your security is our top priority.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-main" />
              <span className="text-gray-600 dark:text-gray-400">
                SSL Encryption
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-main" />
              <span className="text-gray-600 dark:text-gray-400">
                Secure Payments
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-main" />
              <span className="text-gray-600 dark:text-gray-400">
                Data Protection
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guarantee;
