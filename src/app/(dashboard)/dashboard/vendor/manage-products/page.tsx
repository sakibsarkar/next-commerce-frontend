import Protectedroute from "@/provider/Protectedroute";
import ManageProductsView from "@/views/ManageProductsView";

const page = () => {
  return (
    <Protectedroute role={"VENDOR"}>
      <ManageProductsView />
    </Protectedroute>
  );
};

export default page;
