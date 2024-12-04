"use client";
import DashboardHeader from "@/components/shared/DashboardHeader";
import Sidebar from "@/components/shared/DashboardSidebar";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";

import Loader from "@/components/shared/Loader";
import Cookies from "js-cookie";

export interface ISideBarState {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  
  const { user, isLoading, token } = useAppSelector((state) => state.auth);


  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="w-full h-dvh flex flex-col items-start justify-start">
      <DashboardHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="w-full h-[calc(100%-70px)] flex items-start justify-start">
        <Sidebar isOpen={isOpen} setIsopen={setIsOpen} />
        <div className="h-full w-full overflow-auto smoothBar p-[50px] bg-[#f3f3f3]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
