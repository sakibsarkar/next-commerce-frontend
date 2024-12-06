import Protectedroute from "@/provider/Protectedroute";
import MangeUsersView from "@/views/MangeUsersView";

const page = () => {
  return (
    <Protectedroute role={"ADMIN"}>
      <MangeUsersView />
    </Protectedroute>
  );
};

export default page;
