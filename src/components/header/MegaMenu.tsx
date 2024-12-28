"use client";

import { NavLink } from "@/utils/navLinks";
import Link from "next/link";
import { useState } from "react";

interface MegaMenuProps {
  items: NavLink[];
  depth?: number;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ items, depth = 0 }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <ul className={`flex flex-col`}>
      {items.map((item, index) => (
        <li
          key={index}
          className="relative"
          onMouseEnter={() => setHoveredItem(item.label)}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => setHoveredItem(null)}
        >
          <Link
            href={item.href}
            className={`block p-[10px] text-mainTxt hover:text-main hover:bg-gray-50 border-r-[2px] hover:border-main ${
              depth === 0 ? "font-medium" : "font-normal"
            }`}
          >
            {item.label}
            {item.children && <span className="float-right">›</span>}
          </Link>
          {item.children && hoveredItem === item.label && (
            <div className="absolute top-0 left-full bg-white shadow-md min-w-[200px] z-20 ml-[2px] border-t-[2px] border-main">
              <MegaMenu items={item.children} depth={depth + 1} />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default MegaMenu;
