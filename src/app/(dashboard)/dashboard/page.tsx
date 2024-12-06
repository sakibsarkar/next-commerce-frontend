"use client";
import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Cookies from "js-cookie";

const DashboardRoot = () => {
  const router = useRouter();
  const { user, isLoading, token } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (isLoading) return;
    if (!user || !token) {
      router.push("/login");
      Cookies.set("redirect", "/dashboard");
      return;
    }
    if (user.role === "CUSTOMER") {
      router.replace("/");
    } else {
      router.replace(`/dashboard/${user.role.toLowerCase()}`);
    }
  }, [user, router, isLoading, token]);
  return <div></div>;
};

export default DashboardRoot;
