import { ibmPlex } from "@/fonts";
import Image from "next/image";
import Link from "next/link";
import { TbTruckDelivery } from "react-icons/tb";
const Banner3 = () => {
  return (
    <div className="w-full h-full relative">
      <Image
        src={"/images/banner/delivery.avif"}
        fill
        alt="graphic"
        className="absolute top-0 left-0 z-[1]"
      />
      <div className="relative z-[2]  w-full h-full flex items-end flex-col justify-center pr-[25px]">
        <h4
          className={`${ibmPlex.className} text-[30px] md:text-[65px] text-white font-[700] leading-[110%]`}
        >
          Super Fast
        </h4>
        <h4
          className={`${ibmPlex.className} text-[35px] md:text-[55px] text-main/80 px-[15px] font-[700] flex items-center gap-[8px] leading-[110%] bg-white -skew-x-3 -skew-y-3`}
        >
          <TbTruckDelivery /> Delivery
        </h4>
        <p className="text-white text-[12px] md:text-[15px] font-[400] text-right max-w-[300px] md:max-w-[500px]">
          Delivery experience you have never had before. Within 24 hour delivery
          all over the country. with trusted delivery partners and authenticate
          vendors.
        </p>
        <Link
          href={"/product"}
          className="inline-flex items-center bg-white px-3 py-1 text-base font-semibold text-main transition-all mt-[15px]"
        >
          Shop now
        </Link>
      </div>
    </div>
  );
};

export default Banner3;
