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
import { useToggleUserSuspensionByIdMutation } from "@/redux/features/admin/admin.api";
import { TUser } from "@/types/user";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

interface IProps {
  user: TUser;
}

const SuspendUser: React.FC<IProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toggleUserSuspension, { isLoading }] =
    useToggleUserSuspensionByIdMutation();
  const handleConfrim = async () => {
    if (isLoading) return;

    if (!user?.id) {
      toast.error("User not found");
      return;
    }

    try {
      const res = await toggleUserSuspension(user?.id);
      const error = res.error as any;

      if (error) {
        toast.error(error?.data?.message || "Something went wrong");
        setIsOpen(false);
        return;
      }

      toast.success("User suspension status updated successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button variant={user?.isSuspended ? "outline" : "secondary"}>
          {user.isSuspended ? "Unsuspend" : "Suspend"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Confirm {user?.isSuspended ? "Unsuspension" : "Suspension"}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to{" "}
            {user?.isSuspended ? "unsuspend" : "suspend"} {user?.first_name}{" "}
            {user?.last_name}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            variant={user?.isSuspended ? "outline" : "destructive"}
            onClick={handleConfrim}
            className="center gap-[6px]"
          >
            {user?.isSuspended ? "Unsuspend" : "Suspend"}
            {isLoading && <FaSpinner className="animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuspendUser;
