import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IShop } from "@/types/shop";
import { trimText } from "@/utils/trimText";
import ToggleBlackListShop from "./ToggleBlackListShop";

const ShopsTable = ({ shops }: { shops: IShop[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Shop</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shops.map((shop) => (
          <TableRow key={shop.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={shop.logo} alt={shop.name} />
                  <AvatarFallback>
                    {shop.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{shop.name}</span>
              </div>
            </TableCell>
            <TableCell className="max-w-[300px] truncate">
              {trimText(shop.description || "", 40) || "No description"}
            </TableCell>
            <TableCell>
              {new Date(shop.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  shop.isBlackListed
                    ? "bg-destructive/10 text-destructive"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {shop.isBlackListed ? "Blacklisted" : "Active"}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <ToggleBlackListShop shop={shop}/>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShopsTable;
