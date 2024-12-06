import Protectedroute from "@/provider/Protectedroute";
import ManageOrdersView from "@/views/ManageOrdersView";

const page = () => {
  return (
    <Protectedroute role={"VENDOR"}>
      <ManageOrdersView />
    </Protectedroute>
  );
};

export default page;
