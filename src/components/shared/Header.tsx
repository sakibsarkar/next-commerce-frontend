"use client";

import HeaderBottom from "../header/HeaderBottom";
import HeaderMid from "../header/HeaderMid";
import HeaderTop from "../header/HeaderTop";

const Header = () => {
  return (
    <header className="py-[10px]  sticky top-[-73px] z-[40] bg-white">
      <HeaderTop />
      <HeaderMid />
      <HeaderBottom />
    </header>
  );
};

export default Header;
