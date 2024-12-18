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
import { MdEdit } from "react-icons/md";
import { Card, CardContent } from "../ui/card";
import NoTableDataFound from "../uiElements/NoTableDataFound";
import DuplicateProduct from "./DuplicateProduct";
import ProductDelete from "./ProductDelete";

interface IProps {
  products: IProduct[];
  isLoading: boolean;
}

const ProductTable: React.FC<IProps> = ({ products, isLoading }) => {
  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Average Rating</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
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

            {!isLoading && products.length === 0 && (
              <NoTableDataFound span={5} />
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ProductTable;
