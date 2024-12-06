import Protectedroute from "@/provider/Protectedroute";
import DashboardOverviewView from "@/views/DashboardOverviewView";

const page = () => {
  return (
    <Protectedroute role={"ADMIN"}>
      <DashboardOverviewView />
    </Protectedroute>
  );
};

export default page;
