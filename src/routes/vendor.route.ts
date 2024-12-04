import { NavItem } from "@/types/dashboardNav";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiUser, CiViewList } from "react-icons/ci";
import { GrServices } from "react-icons/gr";

export const vendorLinks: NavItem[] = [
  {
    href: "/dashboard/vendor",
    Icon: GrServices,
    title: "My Shop",
    children: [
      {
        href: "/dashboard/vendor/update-shop",
        Icon: GrServices,
        title: "Update Shop",
      },
    ],
  },
  {
    href: "/dashboard/community-post",
    Icon: CiUser,
    title: "Community Posts",
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
