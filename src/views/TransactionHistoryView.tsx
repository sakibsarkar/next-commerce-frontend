"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { NextPagination } from "@/components/uiElements/NextPagination";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useGetTransactionHistoryQuery } from "@/redux/features/admin/admin.api";
import { format } from "date-fns";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TransactionHistoryView = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    transactionId: "",
  });
  const { data } = useGetTransactionHistoryQuery(query);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.message("Copied to clipboard");
  };

  return (
    <div>
      <NextSearchBox
        placeholder="Search by transaction id"
        onValueChange={(value) => setQuery({ ...query, transactionId: value })}
      />
      <Card className="w-full mx-auto mt-[25px]">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <p
                      onClick={() => handleCopy(transaction.transactionId)}
                      className="flex items-center gap-[5px] group/tnx hover:underline cursor-pointer"
                    >
                      <Copy className="w-[13px] opacity-0 group-hover/tnx:opacity-[1]" />
                      {transaction.transactionId}
                    </p>
                  </TableCell>
                  <TableCell>
                    ${(transaction.amount / 100).toFixed(2)}
                  </TableCell>
                  <TableCell>{transaction.status}</TableCell>
                  <TableCell>
                    {format(transaction.createdAt, "dd/MM/yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <NextPagination
        totalDocs={data?.meta.totalDoc || 0}
        limit={10}
        onPageChange={(page) => setQuery({ ...query, page })}
        showText
      />
    </div>
  );
};

export default TransactionHistoryView;
