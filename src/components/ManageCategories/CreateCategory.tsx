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
import { useCreateCategoryMutation } from "@/redux/features/category/category.api";
import { Plus } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";
const CreateCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();
  const [label, setLabel] = useState("");

  const handleCreateCategory = async () => {
    if (isLoading) return;
    if (!label) {
      toast.error("Please add a label");
      return;
    }
    try {
      const res = await createCategory({ label });
      const error = res.error as any;

      if (error) {
        toast.error(error?.data?.message || "Something went wrong");
        setIsOpen(false);
        return;
      }

      toast.success("Category created successfully");
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
          Add Category
          <Plus className="w-[15px]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Create a new category below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label
            </Label>
            <Input
              onChange={(e) => setLabel(e.target.value)}
              id="label"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateCategory}
            disabled={isLoading}
            className="center gap-[5px]"
          >
            Create
            {isLoading ? <FaSpinner className="animate-spin" /> : null}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
