import AllProductsView from "@/views/AllProductsView";

const page = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return <AllProductsView searchParams={searchParams} />;
};

export default page;
