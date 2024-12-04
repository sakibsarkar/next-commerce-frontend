import Protectedroute from "@/provider/Protectedroute";
import ShopDetailsView from "@/views/ShopDetailsView";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <Protectedroute role={"*"}>
      <ShopDetailsView shopId={params.id} />
    </Protectedroute>
  );
};

export default page;
