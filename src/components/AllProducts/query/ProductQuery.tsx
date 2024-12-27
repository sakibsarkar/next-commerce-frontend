"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import useSetSearchParams from "@/hooks/useSetParams";
import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Cateogory from "./Cateogory";

const ProductQuery = () => {
  const { searchParams, updateSearchParams, clearSearchParams } =
    useSetSearchParams();
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

  const handleClearFilter = () => {
    setDebounce("");
    clearSearchParams();
  };

  const handlePriceRangeAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const min_price = Number(form?.min_price?.value || "0");
    const max_price = Number(form?.max_price?.value || "0");

    if (min_price > max_price) {
      toast.error("Minimum price cannot be greater than maximum price");
      return;
    }
    console.log(min_price, max_price);

    updateSearchParams({
      min_price: String(min_price),
      max_price: String(max_price),
    });
  };

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
                <form
                  className="w-full flex-col gap-[10px]"
                  onSubmit={handlePriceRangeAdd}
                >
                  <div className="mt-2 center gap-[5px]">
                    <Input
                      name="min_price"
                      placeholder="Min"
                      type="number"
                      min={0}
                    />
                    <Input
                      name="max_price"
                      placeholder="Max"
                      min={0}
                      type="number"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-main text-white mt-[10px]"
                  >
                    Add
                  </Button>
                </form>
              </div>

              <Button variant="outline" onClick={handleClearFilter}>
                Clear Filters
              </Button>
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
