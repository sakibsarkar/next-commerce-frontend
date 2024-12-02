"use client";

import useDebounce from "@/hooks/debounce";
import { useGetProductSuggestionQuery } from "@/redux/features/product/product.api";
import { Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const ProductSearchBox = () => {
  const [debounce, setDebounce] = useDebounce("");
  const { data } = useGetProductSuggestionQuery(debounce, { skip: !debounce });
  const [isFocus, setIsFocus] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocus(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchTerm = form.searchTerm.value;
    if (searchTerm) {
      setIsFocus(false);
      router.push(`/shop?searchTerm=${searchTerm}`);
    } else {
      setIsFocus(false);
    }
  };

  const handleClickProduct = (id: string) => {
    setDebounce("");
    setIsFocus(false);
    router.push(`/products/${id}`);
  };

  return (
    <div className="relative w-[70%] h-[50px]" ref={containerRef}>
      <form
        onSubmit={handleSubmit}
        className="w-full h-full bg-white overflow-hidden flex items-center justify-between border-[1px] border-input  rounded-[8px]"
      >
        <input
          type="text"
          name="searchTerm"
          placeholder="Search..."
          onChange={(e) => {
            setDebounce(e.target.value);
            setIsFocus(true);
          }}
          className="w-full bg-transparent h-full outline-none border-none rounded-none pl-[7px]"
        />
        <button className="bg-main h-full center px-[10px] shrink-0">
          <Search className="text-white" />
        </button>
      </form>
      {data?.data?.length && isFocus ? (
        <div className="absolute w-full bg-white top-[100%] left-0 z-[99] p-[10px] max-h-[400px] overflow-auto smoothBar flex flex-col gap-[15px] border-[1px] border-borderColor">
          {data?.data?.map((product) => (
            <div
              onClick={() => handleClickProduct(product.id)}
              key={product.id}
              className="w-full hover:bg-slate-200 cursor-pointer flex items-start justify-start gap-[15px]"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={50}
                height={50}
              />
              <div>
                <h4 className="text-[15px] font-[600]">{product.name}</h4>
                <p className="text-yellow-500">BDT. {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ProductSearchBox;
