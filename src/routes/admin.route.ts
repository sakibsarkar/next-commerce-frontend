import { NavItem } from "@/types/dashboardNav";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiUser, CiViewList } from "react-icons/ci";
import { GrServices } from "react-icons/gr";

export const adminLinks: NavItem[] = [
  {
    href: "/dashboard/admin",
    Icon: GrServices,
    title: "Dashboard",
  },
  {
    href: "/dashboard/admin/transactions",
    Icon: CiUser,
    title: "transactions",
  },
  {
    href: "/dashboard/manage-user",
    Icon: CiViewList,

    title: "Manage Users",
  },
  {
    href: "/dashboard/manage-categories",
    Icon: BsFileEarmarkPost,
    title: "Manage Categories",
  },
];
