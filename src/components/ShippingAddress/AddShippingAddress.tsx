"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateShippingAddressMutation } from "@/redux/features/address/address.api";
import { useFormik } from "formik";
import { CirclePlus, FileText, LoaderCircle, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { Textarea } from "../ui/textarea";
const validationSchema = Yup.object({
  city: Yup.string().required("City is required"),
  zip_code: Yup.string()
    .matches(/^\d+$/, "ZIP Code must be a number")
    .required("ZIP Code is required"),
  detailed_address: Yup.string().required("Address is required"),
});

const initialValues = {
  city: "",
  zip_code: "",
  detailed_address: "",
};

type TFormValues = typeof initialValues;

interface IProps {
  children?: React.ReactNode;
}

const AddShippingAddress: React.FC<IProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState({ value: "", error: "" });

  const [addShippingAddress, { isLoading }] =
    useCreateShippingAddressMutation();

  const handleSubmit = async (values: TFormValues) => {
    if (
      !isPossiblePhoneNumber(phoneNumber.value) ||
      !isValidPhoneNumber(phoneNumber.value)
    ) {
      setPhoneNumber({ ...phoneNumber, error: "Invalid phone number" });
      return;
    }

    const payload = {
      ...values,
      phone: phoneNumber.value,
    };

    try {
      const data = await addShippingAddress(payload);
      const error = data.error as any;

      if (error) {
        toast.error(error.data?.message || "something went wrong");
        return;
      }

      toast.success("Address added successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("something went wrong");
      setIsOpen(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="center gap-[6px]">
            Add Address <CirclePlus width={16} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-[60vw]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-right">
              City
            </Label>
            <div className="relative">
              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="city"
                name="city"
                className="pl-8"
                placeholder="Enter city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.city && formik.errors.city && (
                <p className="text-sm text-red-600">{formik.errors.city}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip_code" className="text-right">
              ZIP Code
            </Label>
            <div className="relative">
              <FileText className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id="zip_code"
                name="zip_code"
                className="pl-8"
                placeholder="Enter ZIP code"
                value={formik.values.zip_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.zip_code && formik.errors.zip_code && (
                <p className="text-sm text-red-600">{formik.errors.zip_code}</p>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="detailed_address" className="text-right">
              Address
            </Label>
            <div className="relative">
              <MapPin className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="detailed_address"
                name="detailed_address"
                className="pl-8 min-h-[150px]"
                placeholder="Enter detailed address"
                value={formik.values.detailed_address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.detailed_address &&
                formik.errors.detailed_address && (
                  <p className="text-sm text-red-600">
                    {formik.errors.detailed_address}
                  </p>
                )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-right">
              Phone
            </Label>
            <div className="relative">
              <PhoneInput
                countries={["BD"]}
                defaultCountry="BD"
                international
                countryCallingCodeEditable={false}
                placeholder="Enter your phone number"
                onChange={(value) => {
                  const number = value ? value.toString() : "";

                  if (
                    !isPossiblePhoneNumber(number!) ||
                    !isValidPhoneNumber(number!)
                  ) {
                    setPhoneNumber({
                      value: number,
                      error: "Enter a valid number",
                    });
                    return;
                  }
                  setPhoneNumber({ value: number!, error: "" });
                }}
                className={`border-borderColor border-[1px] bg-background px-3 py-[12px] text-sm rounded-[5px] outline-none
                  `}
              />
              {phoneNumber.error && (
                <p className="text-sm text-red-600">{phoneNumber.error}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              disabled={isLoading}
              type="submit"
              className="w-full center gap-[15px]"
            >
              Add Address
              {isLoading ? <LoaderCircle className="w-[20px] spin" /> : ""}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddShippingAddress;
