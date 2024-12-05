"use client";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hook";
import { adminLinks } from "@/routes/admin.route";
import { vendorLinks } from "@/routes/vendor.route";
import { ChevronLeft } from "lucide-react";
import { SetStateAction, useEffect } from "react";
import { Button } from "../ui/button";
import { DashboardNav } from "./DashboardNav";

type SidebarProps = {
  className?: string;
  setIsopen: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
};

export default function Sidebar({
  className,
  isOpen,
  setIsopen,
}: SidebarProps) {
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // event target
      const target = event.target as HTMLElement;
      // screent width
      const screen = window.screen.width;

      // ---**** return if the screen width is larger
      if (screen > 1024) {
        return;
      }

      // return if the user click on the sidebar or the navbar
      if (target.closest(".sidebar") || target.closest(".menuBTn")) {
        return;
      }

      setIsopen(false);
    };

    // hide sidebar on clicking outside
    if (isOpen) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, setIsopen]);

  const toggleStyle = {
    left: isOpen ? "277px" : "10px",
    rotate: isOpen ? "0deg" : "180deg",
  };

  const handleCloseBar = () => {
    const width = window.screen.width;

    width > 767 ? "" : setIsopen(false);
  };
  return (
    <aside
      style={{
        transition: "0.3s",
        width: `${isOpen ? "287px" : "0px"}`,
        display: "flex",
      }}
      className={cn(
        `md:relative fixed top-0 left-0  h-full border-r bg-card transition-[width] duration-500 md:block
        w-72 shrink-0 overflow-hidden z-[30] sidebar flex flex-col gap-[20px] justify-between pb-[20px] bg-white md:bg-transparent`,
        className
      )}
    >
      <div className="w-full">
        <ChevronLeft
          className={cn(
            "fixed z-20 top-[40%] cursor-pointer rounded-full border bg-background text-3xl text-foreground md:flex hidden bg-white"
          )}
          style={{
            transition: "0.3s",
            ...toggleStyle,
          }}
          onClick={() => setIsopen(!isOpen)}
        />

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1" onClick={handleCloseBar}>
              <DashboardNav
                navLinks={
                  user ? (user.role == "ADMIN" ? adminLinks : vendorLinks) : []
                }
              />
            </div>
          </div>
        </div>
      </div>
      <Button className="w-[90%] mx-auto" variant={"destructive"}>
        Logout
      </Button>
    </aside>
  );
}
