"use client";

import UserRoleSelector from "@/components/ManageUsers/UserRoleSelector";
import UsersTable from "@/components/ManageUsers/UsersTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NextPagination } from "@/components/uiElements/NextPagination";
import NextSearchBox from "@/components/uiElements/NextSearchBox";
import { useGetUserListQuery } from "@/redux/features/admin/admin.api";
import { useState } from "react";

const MangeUsersView = () => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    role: "",
    searchTerm: "",
  });
  const { data, isFetching } = useGetUserListQuery(query);

  return (
    <Card className="w-full mx-auto relative">
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <NextSearchBox
          className="mb-4"
          placeholder="eg. first name, last name or email"
          onValueChange={(searchTerm) => {
            setQuery({ ...query, searchTerm });
          }}
        />
        <UserRoleSelector
          onRoleChange={(role) => {
            const newRole = role === " " ? "" : role;
            setQuery({ ...query, role: newRole });
          }}
        />
        <UsersTable users={data?.data || []} />
        <NextPagination
          totalDocs={data?.meta.totalDoc || 0}
          limit={10}
          onPageChange={(page) => setQuery({ ...query, page })}
        />
      </CardContent>
      {isFetching ? (
        <span className="absolute w-full h-full center text-[18px]">
          loading...
        </span>
      ) : (
        ""
      )}
    </Card>
  );
};

export default MangeUsersView;
