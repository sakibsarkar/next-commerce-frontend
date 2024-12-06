import Protectedroute from "@/provider/Protectedroute";
import ManageCategoriesView from "@/views/ManageCategoriesView";

const page = () => {
  return (
    <Protectedroute role={"ADMIN"}>
      <ManageCategoriesView />
    </Protectedroute>
  );
};

export default page;
