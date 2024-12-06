import Protectedroute from "@/provider/Protectedroute";
import EditMyShopView from "@/views/EditMyShopView";
const page = () => {
  return (
    <Protectedroute role={"VENDOR"}>
      <EditMyShopView />
    </Protectedroute>
  );
};

export default page;
