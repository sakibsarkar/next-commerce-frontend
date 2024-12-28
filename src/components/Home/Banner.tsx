import { ArrowRight } from "lucide-react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="w-full flex items-start justify-start flex-col md:flex-row gap-[20px] mt-[20px] bg-white p-[15px]">
      <div className="relative overflow-hidden bg-[#f6f6f6] w-full h-[420px]">
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
                  <button className="inline-flex items-center rounded-lg bg-yellow-400 px-6 py-3 text-base font-semibold text-black transition-all hover:bg-yellow-500">
                    Shop now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
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
      </div>
      <div className="w-full md:w-[30%] h-[420px]  flex flex-col gap-[20px] shrink-0">
        <div
          className="w-full h-full bg-cover bg-no-repeat pl-[15px] flex items-center"
          style={{ backgroundImage: `url("/images/banner/banner1.jpg")` }}
        >
          <div>
            <h4 className="text-mainTxt text-[22px] font-[600] w-[150px]">
              Uno Lather Bags
            </h4>
            <button className="bg-black text-main py-[5px] px-[10px] mt-[25px]">
              Shop now
            </button>
          </div>
        </div>
        <div
          className="w-full h-full bg-cover bg-no-repeat pl-[15px] flex items-center"
          style={{ backgroundImage: `url("/images/banner/banner2.jpg")` }}
        >
          <div>
            <h4 className="text-mainTxt text-[22px] font-[600] w-[150px]">
              <span className="text-main">Nutral</span> Juice maker
            </h4>
            <button className="mt-[25px] underline font-[600]">Explore</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
