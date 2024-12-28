"use client";

import { useAppSelector } from "@/redux/hook";
import { NavLink, navlinks } from "@/utils/navLinks";
import { ChevronDown, LucideShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import BrowseCategories from "./BrowseCategories";
import MegaMenu from "./MegaMenu";

const HeaderBottom = () => {
  const path = usePathname();
  const { items, total } = useAppSelector((state) => state.cart);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <nav className="py-[12px] border-b-[1px] border-input">
      <div className="w-full flex items-center justify-between layout_container">
        <div className="flex items-center gap-[8px]">
          <BrowseCategories />
          <ul className="hidden lg:flex items-center justify-start gap-[10px] xl:border-l-[1px] border-main xl:pl-[15px]">
            {navlinks.map((link: NavLink, i) => (
              <li
                key={"categories" + i}
                className={`list-none px-[15px] py-[3px] relative ${
                  path === link.href ? "bg-main text-white" : "text-mainTxt"
                }`}
                onMouseEnter={() => setActiveMenu(link.label)}
                onMouseLeave={() => setActiveMenu(null)}
                onClick={() => setActiveMenu(null)}
              >
                <Link href={link.href} className="flex items-center gap-[5px]">
                  {link.label}
                  {link.children && link.children.length > 0 && (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Link>
                {link.children && activeMenu === link.label && (
                  <div className="absolute top-full left-0 bg-white shadow-md z-10 min-w-[250px] border-t-[2px] border-main">
                    <MegaMenu items={link.children} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-start gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <Link href={"/cart"} className="text-main relative">
                <LucideShoppingCart />
                <span className="absolute text-[12px] top-[-14px] right-[-10px]  bg-yellow-400 shadow-md px-[6px] py-[3px] rounded-[8px] text-white">
                  {items.length}
                </span>
              </Link>
              <span className="font-[600] text-[13px] bg-white px-[10px] py-[5px] rounded-full text-primaryMat">
                {total.toFixed(2)} TK
              </span>
            </div>
          </div>
          <div className="hidden lg:hidden pl-[15px] border-l-[1px] border-main">
            <button className="w-fit center gap-[5px] font-[500] px-[28px] py-[5px] bg-main text-white">
              Shop
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderBottom;
