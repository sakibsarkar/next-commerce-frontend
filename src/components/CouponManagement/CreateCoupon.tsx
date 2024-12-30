"use client";

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
import { useCreateCouponMutation } from "@/redux/features/coupon/coupon.api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  code: "",
  discount: "",
  productId: "",
};

const validationSchema = Yup.object().shape({
  code: Yup.string()
    .required("Code is required")
    .min(3, "Code must be at least 3 characters"),
  discount: Yup.number()
    .typeError("Discount must be a number")
    .positive("Discount must be greater than zero")
    .max(100, "Discount cannot exceed 100")
    .required("Discount is required"),
  productId: Yup.string().required("Product ID is required"),
});

export default function CreateCoupon() {
  const [open, setOpen] = useState(false);
  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  const handleSubmit = async (values: typeof initialValues) => {
    const payload = {
      ...values,
      discount: parseFloat(values.discount),
    };

    try {
      const res = await createCoupon(payload);
      const error = res.error as any;

      if (error) {
        toast.error(error.data.message || "Something went wrong");
        return;
      }

      toast.success("Coupon created successfully");

      setOpen(false);
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Coupon</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Coupon</DialogTitle>
          <DialogDescription>
            Enter the details for the new coupon. Click create when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="code">Code</Label>
                <Field
                  as={Input}
                  id="code"
                  name="code"
                  placeholder="Enter coupon code"
                />
                <ErrorMessage
                  name="code"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="discount">Discount</Label>
                <Field
                  as={Input}
                  id="discount"
                  name="discount"
                  type="number"
                  placeholder="Enter discount amount"
                />
                <ErrorMessage
                  name="discount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="productId">Product ID</Label>
                <Field
                  as={Input}
                  id="productId"
                  name="productId"
                  placeholder="Enter product ID"
                />
                <ErrorMessage
                  name="productId"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full center gap-[5px]"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      Creating <FaSpinner className="animate-spin" />
                    </>
                  ) : (
                    "Create Coupon"
                  )}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
