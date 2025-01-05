import ShopDetailsView from "@/views/ShopDetailsView";

const page = ({ params }: { params: { id: string } }) => {
  return <ShopDetailsView shopId={params.id} />;
};

export default page;
