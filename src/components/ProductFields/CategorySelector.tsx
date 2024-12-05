import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { ICategory } from "@/types/category";
import { Logs, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface IProps {
  onChange: (categoriesId: string | undefined) => void;
  defaultValue?: ICategory;
}

const CategorySelector: React.FC<IProps> = ({ onChange, defaultValue }) => {
  const [debouncedValue, setDebouncedValue] = useDebounce("");
  const { data, isFetching } = useGetAllCategoriesQuery(
    { searchTerm: debouncedValue },
    {
      skip: !debouncedValue,
    }
  );
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRemovCategory = () => {
    setSelectedCategory(undefined);
    onChange(undefined);
  };

  const handleFilterCategories = (categories: ICategory[]) => {
    return categories.filter(
      (category) => category.id !== selectedCategory?.id
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
    if (defaultValue) {
      onChange(defaultValue.id);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectCategory = (category: ICategory) => {
    const input = document.getElementById("input-category") as HTMLInputElement;
    setSelectedCategory(category);
    onChange(category.id);
    input.value = "";
    input.blur();
  };

  return (
    <div className="w-full mt-[30px]" ref={containerRef}>
      <Label>Category</Label>
      <div className="rounded-[8px] px-3 py-[12px] border-[1px] border-input w-full flex items-center justify-start gap-[10px]">
        {selectedCategory ? (
          <Badge
            variant={"outline"}
            className="shrink-0 cursor-pointer center gap-[5px]"
            onClick={() => handleRemovCategory()}
          >
            {selectedCategory?.label}{" "}
            <Trash2 width={13} className="text-destructive" />
          </Badge>
        ) : (
          ""
        )}
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
            <Card className="w-full absolute top-[44px] left-0 py-4 px-4 max-h-[250px] overflow-auto smoothBar">
              <CardContent className="p-0">
                {handleFilterCategories(data?.data || []).map((category, i) => (
                  <div
                    key={i}
                    className="rounded-[8px] cursor-pointer px-4 py-4 hover:bg-primary-foreground flex items-center justify-start gap-[15px]"
                    onClick={() => handleSelectCategory(category)}
                  >
                    <Logs width={20} /> <p>{category.label}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;
