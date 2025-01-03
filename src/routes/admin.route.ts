import { NavItem } from "@/types/dashboardNav";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiCreditCard2, CiShop, CiViewList } from "react-icons/ci";
import { GrServices } from "react-icons/gr";
import { RiCouponLine } from "react-icons/ri";
import { SiMinutemailer } from "react-icons/si";
export const adminLinks: NavItem[] = [
  {
    href: "/dashboard/admin",
    Icon: GrServices,
    title: "Dashboard",
  },
  {
    href: "/dashboard/admin/transactions",
    Icon: CiCreditCard2,
    title: "transactions",
  },
  {
    href: "/dashboard/admin/manage-user",
    Icon: CiViewList,
    title: "Manage Users",
  },
  {
    href: "/dashboard/admin/manage-shops",
    Icon: CiShop,
    title: "Manage Shops",
  },
  {
    href: "/dashboard/admin/manage-categories",
    Icon: BsFileEarmarkPost,
    title: "Manage Categories",
  },
  {
    href: "/dashboard/admin/manage-news-letters",
    Icon: SiMinutemailer,
    title: "Manage News Letters",
  },
  {
    href: "/dashboard/admin/view-coupons",
    Icon: RiCouponLine,
    title: "Manage Coupons of shops",
  },
];
