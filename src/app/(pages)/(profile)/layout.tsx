"use client";
import Loader from "@/components/shared/Loader";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import { useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { isLoading, user, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!user || !token) {
      Cookies.set("redirect", "/profile");
      router.push("/login");

      return;
    }

    if (user.role === "ADMIN") {
      router.push("/dashboard ");
    }
  }, [token, router, user]);

  if (isLoading) {
    return <Loader className="!h-screen" />;
  }

  return (
    <div className="w-full min-h-screen flex items-start justify-center  py-[50px]">
      <div className="min-h-[400px] overflow-auto flex flex-col md:flex-row items-start justify-start gap-[20px] md:p-[25px] rounded-[10px] shadow-md w-full bg-white">
        <ProfileSidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
