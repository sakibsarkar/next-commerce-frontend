"use client";
import { ICoupon } from "@/types/coupon";
import { useState } from "react";
interface IProps {
  coupon: ICoupon;
}
const CouponCard: React.FC<IProps> = ({ coupon }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText("SALE2024");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="flex items-stretch cursor-pointer group" onClick={copyCode}>
      {/* Left section */}
      <div className="relative flex items-center justify-center px-3 py-1 bg-main/10 rounded-l-lg border-2 border-main border-dashed">
        <div className="text-center">
          <span className="block text-main text-[12px] font-bold">
            {coupon.discount}%
          </span>
          <span className="block text-main text-[11px] font-semibold">OFF</span>
        </div>

        {/* top part */}
        <>
          <span className="w-4 h-4 border-[2px] border-main rounded-full absolute top-[-11px] right-[-9px] z-[2] bg-white" />
          <span className="w-4 h-4 rounded-full absolute top-[-13px] right-[-9px] z-[3] bg-white" />
        </>

        {/* bottom part */}
        <>
          <span className="w-4 h-4 border-[2px] border-main rounded-full absolute bottom-[-11px] right-[-9px] z-[2] bg-white" />
          <span className="w-4 h-4 rounded-full absolute bottom-[-13px] right-[-9px] z-[3] bg-white" />
        </>
      </div>

      {/* Right section */}
      <div className="relative flex items-center px-3 py-2 bg-white rounded-r-lg border-2 border-l-0 border-main">
        <div className="text-center">
          <p className="text-gray-500 text-sm">Use code</p>
          <p className="text-main text-[14px] font-mono font-bold tracking-wider group-hover:text-main transition-colors">
            {coupon.code}
          </p>
          <p className="text-main text-xs absolute bottom-0 font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? "Copied!" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
