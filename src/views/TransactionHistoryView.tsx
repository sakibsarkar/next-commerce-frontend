"use client";
import { useGetTransactionHistoryQuery } from "@/redux/features/admin/admin.api";
import { useState } from "react";
const TransactionHistoryView = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
  });
  const { data } = useGetTransactionHistoryQuery(query);
  console.log(data);

  return <div></div>;
};

export default TransactionHistoryView;
