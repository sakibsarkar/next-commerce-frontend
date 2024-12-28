import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICategory } from "@/types/category";
import EditCategory from "./EditCategory";
import TableDataLoading from "../uiElements/TableDataLoading";

interface IProps {
  categories: ICategory[];

  isFetching: boolean;
}

const CategoryTable: React.FC<IProps> = ({ categories,isFetching }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      { isFetching && <TableDataLoading cell={3} row={3} />}
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.label}</TableCell>
            <TableCell>
              {new Date(category.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <EditCategory category={category} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
