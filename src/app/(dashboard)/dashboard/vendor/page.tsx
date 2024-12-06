import Protectedroute from "@/provider/Protectedroute";
import MyShopView from "@/views/MyShopView";

const page = () => {
  return (
    <Protectedroute role={"VENDOR"}>
      <MyShopView />
    </Protectedroute>
  );
};

export default page;
