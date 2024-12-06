import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAppSelector } from "@/redux/hook";
import { TUser } from "@/types/user";
import NoTableDataFound from "../uiElements/NoTableDataFound";
import DeleteUser from "./DeleteUser";
import SuspendUser from "./SuspendUser";
interface IProps {
  users: TUser[];
  isLoading: boolean;
}
const UsersTable: React.FC<IProps> = ({ users, isLoading }) => {
  const { user: authUser } = useAppSelector((state) => state.auth);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.first_name}</TableCell>
            <TableCell>{user.last_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              {new Date(user.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              {authUser?.id === user.id ? (
                "-"
              ) : (
                <div className="flex space-x-2">
                  <SuspendUser user={user} />
                  <DeleteUser user={user} />
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}

        {!isLoading && users.length === 0 && <NoTableDataFound span={7} />}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
