import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDuplicateProductMutation } from "@/redux/features/product/product.api";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "sonner";
const DuplicateProduct = ({ productId }: { productId: string }) => {
  const [open, setOpen] = useState(false);
  const [duplicate, { isLoading }] = useDuplicateProductMutation();

  const handleDuplicate = async () => {
    try {
      const res = await duplicate(productId);
      const error = res.error as any;
      if (error) {
        toast.error(error?.data?.message || "Something went wrong");
        setOpen(false);
        return;
      }

      toast.success("Product duplicated successfully");
      setOpen(false);
    } catch (error) {}
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-[40px] h-[40px] bg-main/80 text-white rounded-full center hover:bg-main">
          <FaRegCopy />
        </button>
      </DialogTrigger>
      <DialogContent className="w-[555px]">
        <DialogHeader>
          <DialogTitle>Duplicate Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to create a copy of this product ?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-main"
            onClick={handleDuplicate}
            disabled={isLoading}
          >
            {isLoading ? "Duplicating..." : "Confirm Duplication"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DuplicateProduct;
