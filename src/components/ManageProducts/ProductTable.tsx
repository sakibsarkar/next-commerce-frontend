import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IProduct } from "@/types/product";
import { trimText } from "@/utils/trimText";
import Link from "next/link";
import { FaRegCopy } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import NoTableDataFound from "../uiElements/NoTableDataFound";
import TableDataFetching from "../uiElements/TableDataFetching";
import TableDataLoading from "../uiElements/TableDataLoading";
import DuplicateProduct from "./DuplicateProduct";
import ProductDelete from "./ProductDelete";

interface IProps {
  products: IProduct[];
  isLoading: boolean;
  isFetching: boolean;
}

const ProductTable: React.FC<IProps> = ({
  products,
  isLoading,
  isFetching,
}) => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.message("Copied to clipboard");
  };

  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Product Id</TableHead>
              <TableHead className="w-[300px]">Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Average Rating</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="relative">
            {isLoading ? <TableDataLoading /> : ""}

            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <p
                    onClick={() => handleCopy(product.id)}
                    className="line-clamp-2 flex items-center gap-[5px] hover:underline cursor-pointer"
                  >
                    <FaRegCopy /> {trimText(product.id, 20)}
                  </p>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="line-clamp-2">{trimText(product.name, 70)}</p>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.avgRating}</TableCell>
                <TableCell>{product.discount}%</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-[10px]">
                    <Link
                      href={`update-product/${product.id}`}
                      className="w-[40px] h-[40px] bg-[#16d120] text-white rounded-full center hover:bg-[#1a7e1f]"
                    >
                      <MdEdit />
                    </Link>
                    <ProductDelete
                      productId={product.id}
                      productName={product.name}
                    />
                    <DuplicateProduct productId={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {isFetching && !isLoading ? <TableDataFetching /> : ""}

            {!isFetching && products.length === 0 && (
              <NoTableDataFound span={5} />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductTable;
