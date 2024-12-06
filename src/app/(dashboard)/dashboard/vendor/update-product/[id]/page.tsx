import Protectedroute from "@/provider/Protectedroute";
import UpdateProductView from "@/views/UpdateProductView";

const page = () => {
  return (
    <Protectedroute role={"VENDOR"}>
      <UpdateProductView />
    </Protectedroute>
  );
};

export default page;
