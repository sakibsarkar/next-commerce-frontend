import { ibmPlex } from "@/fonts";
import Image from "next/image";
import Link from "next/link";
import { RiShoppingCartLine } from "react-icons/ri";

const Banner2 = () => {
  return (
    <div
      className={`primary_radial_gradient w-full h-full center flex-col gap-[15px] relative`}
    >
      <Image
        src={"/images/banner/banner_graphic.png"}
        fill
        alt="graphic"
        className="absolute top-0 left-0 z-[1]"
      />
      <div className="relative z-[2] center flex-col gap-[15px] text-center">
        <h4
          className={`text-[35px] sm:text-[55px] text-white font-[700] ${ibmPlex.className}`}
        >
          FLASH SALE
        </h4>
        <p
          className={`text-white text-[15px] sm:text-[28px] font-[500] ${ibmPlex.className}`}
        >
          Up to 50% off on all products
        </p>
        <Link
          href="/flash-sale"
          className="bg-white text-main px-[15px] border-[1px] border-transparent py-[5px] text-[15px] center gap-[5px] hover:skew-y-6 hover:skew-x-6 hover:bg-transparent hover:border-white hover:text-white hover:!shadow-none"
          style={{
            transition: "0.1s",
            boxShadow: "8px 5px rgba(0, 0, 0,1)",
          }}
        >
          SHOP NOW
          <RiShoppingCartLine />
        </Link>
      </div>
    </div>
  );
};

export default Banner2;
