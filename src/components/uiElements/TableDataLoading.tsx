import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";
const TableDataLoading = ({ cell, row }: { cell?: number; row?: number }) => {
  return (
    <>
      {Array.from({ length: row || 3 }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: cell || 3 }).map((_, indx) => (
            <TableCell key={indx}>
              <Skeleton className="w-[200px] h-4" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default TableDataLoading;
