import Protectedroute from "@/provider/Protectedroute";
import MangeShopView from "@/views/MangeShopView";

const page = () => {
  return (
    <Protectedroute role={"ADMIN"}>
      <MangeShopView />
    </Protectedroute>
  );
};

export default page;
