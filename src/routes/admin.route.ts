import { NavItem } from "@/types/dashboardNav";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiCreditCard2, CiViewList } from "react-icons/ci";
import { GrServices } from "react-icons/gr";
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
    href: "/dashboard/manage-categories",
    Icon: BsFileEarmarkPost,
    title: "Manage Categories",
  },
];
