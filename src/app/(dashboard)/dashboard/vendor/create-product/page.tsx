import Protectedroute from "@/provider/Protectedroute";
import CreateProductView from "@/views/CreateProductView";

const page = () => {
  return (
    <Protectedroute role={"VENDOR"}>
      <CreateProductView />
    </Protectedroute>
  );
};

export default page;
