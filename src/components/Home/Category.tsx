"use server";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { baseUrl } from "@/redux/api/appSlice";
import { ICategory } from "@/types/category";
import { Tag } from "lucide-react";
import Link from "next/link";

type TCategoryResponse = ICategory & {
  totalProduct: number;
};

const Category = async () => {
  const res = await fetch(`${baseUrl}/category/get-ten`, {
    next: {
      revalidate: 60 * 60 * 2, // 1 hour
    },
  });
  const data = (await res.json()) as { data: TCategoryResponse[] };
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-white my-[50px]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Product Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.data?.map((category) => (
            <Link key={category.id} href={`/product?category=${category.id}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center relative">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-main/5 rounded-full -mr-10 -mt-10 transition-all duration-300 group-hover:scale-150"></div>
                  <div className="mb-4 p-3 bg-main/10 rounded-full group-hover:bg-main/20 transition-colors duration-300 relative z-10">
                    <Tag className="h-6 w-6 text-main" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-main transition-colors duration-300">
                    {category.label}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="group-hover:bg-main/20 group-hover:text-main  transition-colors duration-300"
                  >
                    {category.totalProduct}{" "}
                    {category.totalProduct === 1 ? "Product" : "Products"}
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
