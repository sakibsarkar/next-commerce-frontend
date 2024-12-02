import { useAppSelector } from "@/redux/hook";
import { Menu, User, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AccountPanel } from "../client/AccountPanel";
import ProductSearchBox from "./ProductSearchBox";
import SideBar from "./SideBar";

const HeaderMid = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="border-b-[1px] border-input py-[12px]">
      <div className="flex layout_container items-center justify-between gap-[15px]">
        <Link href="/" className="flex items-center">
          <Image
            width={50}
            height={50}
            src="/images/logo.png"
            className="w-[50px]"
            alt="ferox logo"
          />
        </Link>
        <ProductSearchBox />
        <div className="center w-fit gap-[15px]">
          {user ? (
            <AccountPanel />
          ) : (
            <Link
              href={"/login"}
              className="flex items-center justify-start gap-[5px]"
            >
              <User height={30} width={35} />
              <span className="flex flex-col items-start justify-start">
                <span className="text-[14px] font-[600]">Login</span> Account
              </span>
            </Link>
          )}

          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="md:hidden flex menuBTn text-main"
          >
            {showSidebar ? <X /> : <Menu />}
          </button>
        </div>

        <SideBar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
};

export default HeaderMid;
