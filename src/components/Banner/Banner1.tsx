import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Banner1 = () => {
  return (
    <div className="relative mx-auto w-full px-4 py-[50px] sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="relative z-10 md:text-left">
          <div className="relative">
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
              Active Crystal Color
              <br />
              4k UHD Picture Quality
            </h2>
            <p className="mt-6 text-lg leading-8">
              Experience stunning clarity and vibrant colors with our latest
              curved 4K UHD TV technology.
            </p>
            <div className="mt-8">
              <span className="text-2xl font-bold">FROM </span>
              <span className="text-4xl font-bold text-main">$69.99</span>
            </div>
            <div className="mt-10">
              <Link
                href={"/product"}
                className="inline-flex items-center rounded-lg bg-yellow-400 px-6 py-3 text-base font-semibold text-black transition-all hover:bg-yellow-500"
              >
                Shop now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:flex">
          <div className="relative">
            <Image
              height={500}
              width={500}
              className="relative mx-auto w-full max-w-lg transform rounded-lg shadow-xl transition-all"
              src="https://images.unsplash.com/photo-1601944179066-29786cb9d32a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="4K TV Display"
            />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
              <Image
                height={96}
                width={96}
                className="h-24 w-24"
                src="https://images.unsplash.com/photo-1516233758813-a38d024919c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                alt="Dove"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner1;
