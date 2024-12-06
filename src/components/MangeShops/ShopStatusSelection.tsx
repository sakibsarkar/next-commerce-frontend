import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useState } from "react";

interface IProps {
  onChange: (role: string) => void;
}

const ShopStatusSelection: React.FC<IProps> = ({ onChange }) => {
  const [roleFilter, setRoleFilter] = useState<string>(" ");

  const handlechange = (value: string) => {
    onChange(value);
    setRoleFilter(value);
  };

  return (
    <div className="mb-4">
      <Select onValueChange={(value) => handlechange(value)} defaultValue=" ">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value=" ">All</SelectItem>
          <SelectItem value="1">Black Listed</SelectItem>
          <SelectItem value="0">Non Black Listed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ShopStatusSelection;
