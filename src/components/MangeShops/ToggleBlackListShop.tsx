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
import { useToggleShopBlacklistByIdMutation } from "@/redux/features/admin/admin.api";
import { IShop } from "@/types/shop";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

const ToggleBlackListShop = ({ shop }: { shop: IShop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleBlackListStatus, { isLoading }] =
    useToggleShopBlacklistByIdMutation();
  const handleConfrim = async () => {
    if (isLoading) return;

    if (!shop?.id) {
      toast.error("User not found");
      return;
    }

    try {
      const res = await toggleBlackListStatus(shop?.id);
      const error = res.error as any;

      if (error) {
        toast.error(error?.data?.message || "Something went wrong");
        setIsOpen(false);
        return;
      }

      toast.success("shop blacklist status updated successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={shop.isBlackListed ? "outline" : "default"}>
          {shop.isBlackListed ? "Remove from Blacklist" : "Blacklist"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Confirm {shop?.isBlackListed ? "Remove from" : "Add to"} Blacklist
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to {shop?.isBlackListed ? "remove" : "add"}{" "}
            {shop?.name} {shop?.isBlackListed ? "from" : "to"} the blacklist?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleConfrim}
            variant={shop?.isBlackListed ? "default" : "destructive"}
            className="center gap-[5px]"
          >
            {shop?.isBlackListed ? "Remove from Blacklist" : "Blacklist"}

            {isLoading ? <FaSpinner className="animate-spin" /> : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ToggleBlackListShop;
