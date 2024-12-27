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
      <div className="relative flex items-center justify-center px-4 py-4 bg-main/10 rounded-l-lg border-2 border-r-0 border-main">
        <div className="w-4 h-4 -mr-2 bg-gray-50 rounded-full border-2 border-main" />
        <div className="w-4 h-4 -mr-2 bg-gray-50 rounded-full border-2 border-main" />
        <div className="text-center">
          <span className="block text-main text-[15px] font-bold">
            {coupon.discount}%
          </span>
          <span className="block text-main text-[14px] font-semibold">OFF</span>
        </div>
      </div>

      {/* Right section */}
      <div className="relative flex items-center px-4 py-2 bg-white rounded-r-lg border-2 border-l-0 border-main">
        <div className="absolute -left-2 top-0 h-full flex items-center">
          <div className="h-full flex flex-col justify-between">
            <div className="w-4 h-4 -ml-2 bg-gray-50 rounded-full border-2 border-main" />
            <div className="w-4 h-4 -ml-2 bg-gray-50 rounded-full border-2 border-main" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm">Use code</p>
          <p className="text-main text-[14px] font-mono font-bold tracking-wider group-hover:text-main transition-colors">
            {coupon.code}
          </p>
          <p className="text-main text-xs font-medium mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {copied ? "Copied!" : "Click to copy"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CouponCard;
