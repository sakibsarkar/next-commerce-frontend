import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetTransactionHistoryQuery } from "@/redux/features/admin/admin.api";
import { format } from "date-fns";
import { Card } from "../ui/card";
import TableDataLoading from "../uiElements/TableDataLoading";
const TransactionTable = () => {
  const { data, isLoading, isFetching } = useGetTransactionHistoryQuery({
    limit: 10,
  });

  return (
    <Card className="w-[40%] overflow-hidden">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && isFetching && <TableDataLoading cell={4} row={10} />}
          {data?.data?.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.transactionId}
              </TableCell>
              <TableCell>{Math.round(transaction.amount)}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    transaction.status === "SUCCESS" ? "default" : "destructive"
                  }
                >
                  {transaction.status}
                </Badge>
              </TableCell>
              <TableCell>
                {format(transaction.createdAt, "dd/MM/yyyy")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default TransactionTable;
