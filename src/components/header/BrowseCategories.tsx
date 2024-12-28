import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { categoryData } from "../../const/category";

const BrowseCategories = () => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // event target
      const target = event.target as HTMLElement;
      // screent width
      // return if the user click on the drawer or the navbar
      if (target.closest(".category")) {
        return;
      }

      setOpen(false);
    };

    // hide sidebar on clicking outside
    if (open) {
      document.body.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.body.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, setOpen]);
  return (
    <div
      className="flex lg:hidden xl:flex w-[200px] px-[1px] py-[8px] hover:border-[black] border-b-[1px] border-transparent cursor-pointer  items-center gap-[8px] relative category"
      onClick={() => setOpen(!open)}
    >
      <Menu className="h-4 w-4" /> <h1>Browse Categories</h1>
      <div
        className="absolute top-[53px] left-0 w-full max-h-[400px] flex flex-col gap-[0] bg-white  border-[#d9d9d9] overflow-hidden"
        style={{
          maxHeight: open ? "400px" : "0px",
          transition: "0.5s",
          borderWidth: open ? "1px" : "0px",
        }}
      >
        {categoryData.map((cat) => (
          <Link
            key={cat.id}
            href={`/product?category=${cat.id}`}
            className="py-[10px] pl-[15px] border-b-[1px] border-[#d9d9d9] hover:bg-[#f3f3f3]"
          >
            {cat.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrowseCategories;
