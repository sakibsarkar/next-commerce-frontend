"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import useSetSearchParams from "@/hooks/useSetParams";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import Cateogory from "./Cateogory";

const ProductQuery = () => {
  const { searchParams, updateSearchParams } = useSetSearchParams();
  const [debounce, setDebounce] = useDebounce("");
  const [isTouched, setIsTouched] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (isTouched) {
      updateSearchParams({ searchTerm: debounce });
    }
  }, [debounce, updateSearchParams, isTouched]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // event target
      const target = event.target as HTMLElement;
      // screent width
      const screen = window.screen.width;

      // ---**** return if the screen width is larger
      if (screen > 768) {
        return;
      }

      // return if the user click on the drawer or the navbar
      if (target.closest(".queryDrawer") || target.closest(".menuBTn")) {
        return;
      }

      setShow(false);
    };

    // hide sidebar on clicking outside
    if (show) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setShow, show]);

  useEffect(() => {
    const width = window.screen.width;
    if (width < 768) {
      setShow(false);
    }
  }, []);

  return (
    <>
      <button
        className="menuBTn flex items-center justify-center md:hidden gap-[5px] text-[15px] font-[600]"
        onClick={() => setShow(!show)}
      >
        <SlidersHorizontal /> Filter
      </button>
      {show ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] shrink-0 w-[80vw] md:w-fit h-[100vh] md:h-fit z-[999] md:z-[10] bg-white fixed md:sticky top-0 md:top-[130px] left-0 p-[15px] border-r-[1px] border-input queryDrawer fade md:rounded-[10px]">
            <button
              className="menuBTn gap-[5px] text-[15px] font-[600] w-full flex items-center justify-end md:hidden"
              onClick={() => setShow(!show)}
            >
              <X />
            </button>
            <div className="flex flex-col gap-6 w-full">
              <div>
                <h3 className="mb-2 text-lg font-medium">Search</h3>
                <Input
                  type="text"
                  placeholder="Search products..."
                  onChange={(e) => {
                    setDebounce(e.target.value);
                    !isTouched ? setIsTouched(true) : null;
                  }}
                />
              </div>
              <Cateogory />
              <div>
                <h3 className="mb-2 text-lg font-medium">Price Range</h3>
                <div />
                <div className="w-full flex-col gap-[10px]">
                  <div className="mt-2 center gap-[5px]">
                    <Input placeholder="Min" type="number" min={0} />
                    <Input placeholder="Max" min={0} type="number" />
                  </div>
                  <Button className="w-full bg-primaryMat text-white mt-[10px]">
                    Add
                  </Button>
                </div>
              </div>

              <Button variant="outline">Clear Filters</Button>
            </div>
          </div>
          <span className="w-full h-[100vh]  bg-[#2222222f] flex md:hidden top-0 left-0 fixed z-[99]" />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductQuery;
