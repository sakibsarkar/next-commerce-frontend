"use client";
import Loader from "@/components/shared/Loader";
import { useAppSelector } from "@/redux/hook";
import { TRole } from "@/types/user";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
interface IProps {
  role: TRole | "*";
  children: React.ReactNode;
}

const Protectedroute: React.FC<IProps> = ({ role, children }) => {
  const { user, isLoading, token } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const path = usePathname();

  if (isLoading) {
    return <Loader className="!h-screen" />;
  }

  if (!user || !token) {
    Cookies.set("redirect", path);
    router.push("/login");
    return <></>;
  }

  if (user.role !== role && role !== "*") {
    router.push("/");
    return <></>;
  }

  if (user.isSuspended || user.isDeleted) {
    router.push("/suspended");
    return <></>;
  }

  return children;
};

export default Protectedroute;
