"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useDeleteCouponByIdMutation } from "@/redux/features/coupon/coupon.api";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

interface IProps {
  code: string;
  couponId: string;
}
const DeleteCouponById: React.FC<IProps> = ({ code, couponId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputCode, setInputCode] = useState("");

  const [deleteCoupon, { isLoading }] = useDeleteCouponByIdMutation();

  const handleDelete = async () => {
    if (isLoading) return;
    try {
      const res = await deleteCoupon(couponId);
      const error = res.error as any;

      if (error) {
        toast.error(error?.data?.message || "Something went wrong");
        setIsOpen(false);
        return;
      }

      toast.success("Coupon deleted successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
      setIsOpen(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className="w-[30px] h-[30px] bg-destructive center text-white rounded-full">
          <Trash2 className="h-4 w-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive font-[600]">
            Are you sure you want to delete this coupon?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            coupon code <span className="font-semibold">{code}</span> and remove
            it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4">
          <label
            htmlFor="couponCodeInput"
            className="block text-sm font-medium mb-2 bg-destructive/10 text-destructive rounded-[3px] px-[3px] w-fit"
          >
            Enter the coupon code <span className="font-[700]">{code}</span> to
            confirm deletion:
          </label>
          <Input
            id="couponCodeInput"
            type="text"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Enter coupon code"
            className="w-full"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleDelete}
            variant={"destructive"}
            disabled={inputCode !== code || isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Coupon"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCouponById;
