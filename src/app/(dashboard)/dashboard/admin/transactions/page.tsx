import Protectedroute from "@/provider/Protectedroute";
import TransactionHistoryView from "@/views/TransactionHistoryView";

const page = () => {
  return (
    <Protectedroute role={"ADMIN"}>
      <TransactionHistoryView />
    </Protectedroute>
  );
};

export default page;
