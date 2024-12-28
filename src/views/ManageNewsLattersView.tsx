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
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import TableDataFetching from "@/components/uiElements/TableDataFetching";
import TableDataLoading from "@/components/uiElements/TableDataLoading";
import { useGetNewsLettersQuery } from "@/redux/features/newsLetter/newsLetter.api";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
const ManageNewsLattersView = () => {
  const [query, setQuery] = useState({
    page: 1,
    searchTerm: "",
  });

  const { data, isFetching, isLoading } = useGetNewsLettersQuery(query);
  return (
    <Card className="w-full mx-auto relative">
      <CardHeader>
        <CardTitle>Review Newsletters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-between gap-[15px] flex-wrap">
          <NextSearchBox
            className="mb-4"
            onValueChange={(value) => setQuery({ ...query, searchTerm: value })}
          />
        </div>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Requested</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="relative">
            {isLoading && isFetching && <TableDataLoading cell={4} row={10} />}
            {isFetching ? <TableDataFetching /> : ""}

            {data?.data?.map((newsLetter) => (
              <TableRow key={newsLetter.id}>
                <TableCell className="font-medium">{newsLetter.id}</TableCell>
                <TableCell className="font-medium">
                  {newsLetter.email}
                </TableCell>

                <TableCell>
                  {formatDistanceToNow(newsLetter.createdAt, {
                    addSuffix: true,
                  })}{" "}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ManageNewsLattersView;
