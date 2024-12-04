import useDebounce from "@/hooks/useDebounce";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface IProps {
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  debounceTimeOut?: number;
}
const NextSearchBox: React.FC<IProps> = ({
  onValueChange,
  className,
  debounceTimeOut,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounceValue, setDebounceValue] = useDebounce("", debounceTimeOut);

  useEffect(() => {
    onValueChange(debounceValue);
  }, [debounceValue]);

  const handleSerch = () => {
    onValueChange(searchTerm);
  };

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const keyCode = e.keyCode;
    const value = e.currentTarget.value;
    if (debounceTimeOut === undefined) {
      if (keyCode === 13) {
        onValueChange(value);
      }
      setSearchTerm(value);
    } else {
      setDebounceValue(value);
    }
  };

  return (
    <div
      className={`w-[500px] flex items-start md:items-center flex-col md:flex-row gap-[5px] ${
        className || ""
      }`}
    >
      <Input
        type="text"
        placeholder={placeholder || "Search..."}
        onKeyUp={handleChange}
        onBlur={debounceValue ? undefined : handleSerch}
        className="w-full"
      />
      {debounceTimeOut ? null : (
        <Button onClick={handleSerch} className="bg-main">
          <Search size={20} />
        </Button>
      )}
    </div>
  );
};

export default NextSearchBox;
