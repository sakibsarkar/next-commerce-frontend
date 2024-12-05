import { NavItem } from "@/types/dashboardNav";
import { BsFileEarmarkPost } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { FaRegRectangleList } from "react-icons/fa6";
import { GrServices } from "react-icons/gr";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineReviews } from "react-icons/md";
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
    href: "/dashboard/vendor/manage-products",
    Icon: FaRegRectangleList,
    title: "Manage Products",
  },
  {
    href: "/dashboard/vendor/manage-orders",
    Icon: LiaShippingFastSolid,
    title: "Manage Orders",
  },
  {
    href: "/dashboard/vendor/manage-reviews",
    Icon: MdOutlineReviews,
    title: "Manage Reviews",
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
