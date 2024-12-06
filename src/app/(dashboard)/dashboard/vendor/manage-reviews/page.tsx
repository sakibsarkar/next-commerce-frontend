import Protectedroute from "@/provider/Protectedroute";
import ManageReviewsView from "@/views/ManageReviewsView";

const page = () => {
  return (
    <Protectedroute role={"VENDOR"}>
      <ManageReviewsView />
    </Protectedroute>
  );
};

export default page;
