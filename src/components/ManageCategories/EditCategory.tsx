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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateCategoryMutation } from "@/redux/features/category/category.api";
import { ICategory } from "@/types/category";
import { Pen } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

interface IProps {
  category: ICategory;
}

const EditCategory: React.FC<IProps> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [label, setLabel] = useState(category.label || "");

  const handleCreateCategory = async () => {
    if (isLoading) return;
    if (!label) {
      toast.error("Please add a label");
      return;
    }
    try {
      const res = await updateCategory({ payload: { label }, id: category.id });
      const error = res.error as any;

      if (error) {
        toast.error(error?.data?.message || "Something went wrong");
        setIsOpen(false);
        return;
      }

      toast.success("Category updated successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="center gap-[5px]">
          <Pen className="w-[15px]" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category label below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Label
            </Label>
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              id="name"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateCategory} className="center gap-[5px]">
            Save Changes
            {isLoading ? <FaSpinner className="animate-spin" /> : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
