"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateShopMutation } from "@/redux/features/shop/shop.api";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { IShop } from "@/types/shop";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";
import { Textarea } from "../ui/textarea";

interface IProps {
  initialValues?: Pick<IShop, "name" | "description" | "logo">;
}
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Shop name is required")
    .min(3, "Shop name must be at least 3 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
});
const ShopForm: React.FC<IProps> = ({ initialValues }) => {
  const [logo, setLogo] = useState<{ url?: string; file?: File }>({
    url: initialValues?.logo,
    file: undefined,
  });

  const router = useRouter();

  const [uploadSingleFile, { isLoading: isImageLoading }] =
    useUploadSingleFileMutation();
  const [updateShop, { isLoading }] = useUpdateShopMutation();

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogo({
        url,
        file,
      });
    }
  };

  const handleSubmit = async (values: {
    name: string;
    description: string;
  }) => {
    if (isImageLoading || isLoading) {
      return;
    }

    if (!initialValues && !logo.file) {
      toast.error("Please select a logo for your shop");
      return;
    }

    const payload: Pick<IShop, "logo" | "name" | "description"> = {
      ...values,
      logo: initialValues?.logo || "",
    };

    const toastId = toast.loading("Please wait...");

    if (logo.file) {
      const form = new FormData();
      form.append("file", logo.file);
      const res = await uploadSingleFile(form);
      const error = res.error as any;

      if (error) {
        if (initialValues?.logo) {
          toast.error("An error occurred while uploading the logo", {
            description: "Your logo changes will not be applied",
          });
          payload.logo = initialValues.logo;
        } else {
          toast.error("An error occurred while uploading the logo", {
            description: "Please try again later",
          });
          toast.dismiss(toastId);
          return;
        }
      }

      payload.logo = res.data?.data || "";
    }

    const res = await updateShop(payload);

    const updateError = res.error as any;

    if (updateError) {
      toast.error(updateError.data?.message || "Something went wrong");
      toast.dismiss(toastId);
      return;
    }

    toast.success("Shop updated successfully");
    toast.dismiss(toastId);
    router.push("/dashboard/vendor");
  };

  return (
    <div className="mx-auto p-4">
      <Card className="w-full  mx-auto">
        <CardHeader>
          <CardTitle>{initialValues ? "Update Shop" : "Create Shop"}</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              name: initialValues?.name || "",
              description: initialValues?.description || "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Shop Name</Label>
                <Field
                  name="name"
                  id="name"
                  as={Input}
                  placeholder="Enter your shop name"
                  className="input"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Field
                  name="description"
                  id="description"
                  as={Textarea}
                  placeholder="Describe your shop"
                  className="textarea"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <Input
                  id="logo"
                  type="file"
                  onChange={(e) => handleLogoChange(e)}
                  accept="image/*"
                />
                <ErrorMessage
                  name="logo"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {logo.url && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold mb-2">Logo Preview</h3>
                  <Image
                    src={logo.url}
                    alt="Shop Logo Preview"
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <Button type="submit" className="w-full bg-main">
                {initialValues ? "Update Shop" : "Create Shop"}
              </Button>
            </Form>
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopForm;
