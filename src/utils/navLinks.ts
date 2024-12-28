import { supportIssues } from "@/components/Home/SupportForm";
import { categoryData } from "@/const/category";

export type NavLink = {
  label: string;
  href: string;
  children?: NavLink[];
};

export const navlinks: NavLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Products",
    href: "/product",
    children: [
      {
        label: "Explore All",
        href: "/product",
      },

      {
        label: "Explore By Category",
        href: "/product",
        children: categoryData.map((cat) => ({
          label: cat.label,
          href: `/product?dcategory=${cat.id}`,
        })),
      },
      {
        label: "Budget Friendly",
        href: "/product?min_price=0&max_price=500",
      },
    ],
  },
  {
    label: "Recently viewed",
    href: "/recent-products",
  },
  {
    label: "View Shops",
    href: "/shops",
    children: [
      {
        label: "All",
        href: "/shop",
      },
      {
        label: "Top Rated",
        href: "/shops",
        children: [
          {
            label: "Sakibs-shop",
            href: "/shops?shopId=43088c24-61d4-429b-a0dc-485fd47d8b62",
          },
          {
            label: "ast",
            href: "/shops?shopId=6087e696-ae23-4924-977f-b71df8cd5033",
          },
        ],
      },
      {
        label: "Following",
        href: "/shops?following=true",
      },
    ],
  },
  {
    label: "Help & Support",
    href: "/help-support",
    children: supportIssues.map((issue) => ({
      label: issue.value,

      href: `/help-support?issue=${issue.value}`,
    })),
  },
  {
    label: "Become a vendor",

    href: "/register/vendor",
  },
];
