import { useAppSelector } from "@/redux/hook";
import { LucideShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrowseCategories from "./BrowseCategories";
const navlinks = [
  {
    lebel: "Home",
    href: "/",
  },
  {
    lebel: "All Products",
    href: "/shop",
  },
  {
    lebel: "Contact Us",
    href: "/contact",
  },
];
const HeaderBottom = () => {
  const path = usePathname();
  const { items, total } = useAppSelector((state) => state.cart);
  return (
    <nav className="py-[12px] border-b-[1px] border-input">
      <div className="w-full flex items-center justify-between layout_container">
        <div className="flex items-center gap-[8px]">
          <BrowseCategories />
          <ul className="hidden md:flex items-center justify-start gap-[20px] border-l-[1px] border-main !pl-[15px]">
            {navlinks.map(({ lebel, href }, i) => (
              <li
                key={"categories" + i}
                className={`list-none px-[15px] py-[3px] ${
                  path === href ? "bg-main text-white" : "text-mainTxt"
                }`}
              >
                <Link href={href}>{lebel}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center">
          <div className="flex items-center justify-start gap-[10px]">
            <Link
              href="/profile/orders"
              className="md:flex hidden items-center gap-[5px] font-[500] pr-[10px] border-r-[1px] border-black "
            >
              My Orders
            </Link>
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
