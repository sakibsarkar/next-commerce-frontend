import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { categoryData } from "@/const/category";
import useDebounce from "@/hooks/useDebounce";
import useSetSearchParams from "@/hooks/useSetParams";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { ICategory } from "@/types/category";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const Cateogory = () => {
  const { searchParams, updateSearchParams } = useSetSearchParams();
  const category = searchParams.get("category") || "";
  const selectedCategories = category.split(",");
  const defaultCategory = searchParams.get("dcategory") || "";
  const [localSelectedCategories, setLocalSelectedCategories] =
    useState<string[]>(selectedCategories);

  const [categories, setCategories] = useState<
    Pick<ICategory, "id" | "label">[]
  >([...categoryData]);

  const [debouncedValue, setDebouncedValue] = useDebounce("");
  const { data, isFetching } = useGetAllCategoriesQuery({
    searchTerm: debouncedValue,
  });
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleFilterCategories = (categories: ICategory[]) => {
    return categories.filter(
      (category) => !selectedCategories.includes(category.id)
    );
  };

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

  useEffect(() => {
    if (defaultCategory) {
      updateSearchParams({ category: defaultCategory, dcategory: "" });
      setLocalSelectedCategories([defaultCategory]);
    }
  }, [defaultCategory, updateSearchParams]);

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category].filter((c) => {
          if (c) return c;
        });

    updateSearchParams({ category: newCategories.join(",") });
    setLocalSelectedCategories([...newCategories]);
  };

  const handleAddCategory = (category: ICategory) => {
    const newCategories = [category, ...categories].filter((c) => {
      if (c) return c;
    });
    setCategories(newCategories);

    const newSelectedCategories = [...selectedCategories, category.id];
    setLocalSelectedCategories(newSelectedCategories);
    updateSearchParams({ category: newSelectedCategories.join(",") });

    setIsFocus(false);
  };

  return (
    <div>
      <h3 className="mb-2 text-lg font-medium">Categories</h3>

      <div className="w-full" ref={containerRef}>
        <div className="rounded-[8px] px-3 py-[12px] border-[1px] border-input w-full flex items-center justify-start gap-[10px]">
          <div className="w-full relative">
            <input
              className="w-full pl-[5px] outline-none"
              onChange={(e) => setDebouncedValue(e.target.value)}
              onFocus={() => setIsFocus(true)}
              placeholder="Search category"
              id="input-category"
            />
            {isFocus &&
            handleFilterCategories(data?.data || []).length &&
            !isFetching ? (
              <Card className="w-full absolute top-[44px] left-0 py-4 px-0 max-h-[250px] overflow-auto smoothBar">
                <CardContent className="p-0">
                  {handleFilterCategories(data?.data || []).map(
                    (category, i) => (
                      <div
                        key={i}
                        className="rounded-[8px] cursor-pointer px-4 py-4 hover:bg-primary-foreground flex items-center justify-start gap-[15px]"
                        onClick={() => handleAddCategory(category)}
                      >
                        <Image
                          width={30}
                          height={30}
                          src={"/images/logo.jpg"}
                          alt={`${category.label} thumbnail`}
                        />{" "}
                        <p>{category.label}</p>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      <div className="mt-[20px]">
        {categories.map(({ label, id }, i) => (
          <div className="flex items-center" key={i + "category"}>
            <Checkbox
              id={label}
              checked={localSelectedCategories.includes(id)}
              onCheckedChange={() => handleCategoryChange(id)}
            />
            <label htmlFor={label} className="ml-2 cursor-pointer capitalize">
              {label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cateogory;
