import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import HomePageBannerSliders from "../Banner";

const Banner = () => {
  return (
    <div className="w-full flex items-start justify-start flex-col md:flex-row gap-[20px] mt-[20px] bg-white p-[15px]">
      <div className="relative overflow-hidden bg-[#f6f6f6] w-full h-[420px]">
        <HomePageBannerSliders />
        <div className="shrink-0 flex items-center gap-[15px] absolute bottom-[15px] right-[15px] z-[15]">
          <button
            id="custom-prev"
            className="w-[30px] h-[30px] rounded-full center bg-main text-white"
          >
            <FaChevronLeft />
          </button>
          <button
            id="custom-next"
            className="w-[30px] h-[30px] rounded-full center bg-main text-white"
          >
            <FaChevronRight />
          </button>
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
            <Link
              href={"/product"}
              className="bg-black text-main py-[5px] px-[10px] mt-[12px] flex w-fit"
            >
              Shop now
            </Link>
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
            <Link href={"/product"} className="mt-[25px] underline font-[600]">
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
