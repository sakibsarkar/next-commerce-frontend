"use client";
import CategoryTable from "@/components/ManageCategories/CategoryTable";
import CreateCategory from "@/components/ManageCategories/CreateCategory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useGetAllCategoriesQuery } from "@/redux/features/category/category.api";
import { useState } from "react";
const ManageCategoriesView = () => {
  const [query, setQuery] = useState({
    page: 1,
    searchTerm: "",
  });
  const { data } = useGetAllCategoriesQuery(query);
  console.log(data);

  return (
    <Card className="w-full mx-auto relative">
      <CardHeader>
        <CardTitle>Category Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-between gap-[15px] flex-wrap">
          <NextSearchBox
            className="mb-4"
            onValueChange={(value) => setQuery({ ...query, searchTerm: value })}
          />
          <CreateCategory />
        </div>
        <CategoryTable categories={data?.data || []} />
      </CardContent>
    </Card>
  );
};

export default ManageCategoriesView;
