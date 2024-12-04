import { IconType } from "react-icons";

export interface NavItem {
  href: string;
  title: string;
  Icon: IconType;
  children?: NavItem[];
}
