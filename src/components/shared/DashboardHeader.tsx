import { ISideBarState } from "@/app/(dashboard)/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/redux/features/auth/auth.slice";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoMenu } from "react-icons/io5";
import { useDispatch } from "react-redux";

const DashboardHeader: React.FC<ISideBarState> = ({ setIsOpen }) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout(undefined));
  };

  return (
    <div className="w-full h-[70px] flex items-center justify-between px-[20px]  py-[10px] border-b shrink-0">
      <Link href="/" className="md:flex hidden">
        <Image
          width={90}
          height={70}
          src="/images/logo.png"
          alt="logo"
          className="w-[90px]"
        />
      </Link>

      <Button
        className="menuBTn flex md:hidden"
        onClick={() => setIsOpen(true)}
        variant={"ghost"}
      >
        <IoMenu />
      </Button>
      <div className="flex items-center justify-end gap-[8px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={user?.image || ""} alt="user avatar" />
              <AvatarFallback>
                <p className="text-muted-foreground uppercase">
                  {user?.first_name?.slice(0, 1)}
                  {user?.last_name?.slice(0, 1)}
                </p>
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/"}>Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <button onClick={handleLogout} className="w-full">
                Logout
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardHeader;
