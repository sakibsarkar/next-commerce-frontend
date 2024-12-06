"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRegisterCustomerMutation } from "@/redux/features/auth/auth.api";
import { setToken, setUser } from "@/redux/features/auth/auth.slice";
import { useCreateShopMutation } from "@/redux/features/shop/shop.api";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  email: "",
  first_name: "",
  last_name: "",
  password: "",
  shop_name: "",
  shop_description: "",
};
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  shop_name: Yup.string().required("Shop Name is required"),
  shop_description: Yup.string().required("Shop Description is required"),
  password: Yup.string()
    .min(8, "* Password must be at least 8 characters long")
    .required("* Password is required"),
});

type TFormValues = typeof initialValues;

export default function RegisterPage() {
  const [logo, setLogo] = useState<File | null>(null);
  const router = useRouter();

  const [uploadSingle] = useUploadSingleFileMutation();
  const [register, { isLoading }] = useRegisterCustomerMutation();
  const [creatShop, { isLoading: shopLoading }] = useCreateShopMutation();

  const dispatch = useDispatch();

  const handleSubmit = async (values: TFormValues) => {
    if (isLoading || shopLoading) {
      toast.error("Please wait...");
      return;
    }

    if (!logo) {
      toast.error("Failed to add image, try another image");
      return;
    }

    const toastId = toast.loading("Please wait...");
    try {
      const registerPayload = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        role: "VENDOR",
      };
      const res = await register(registerPayload);

      const data = res?.data || {};
      const error = res?.error as any;

      if (!data) {
        return toast.error("Something went wrong");
      }
      if (!data.success || error) {
        return toast.error(error?.data?.message || "Something went wrong");
      }
      dispatch(setUser({ user: data?.data?.result || {} }));
      dispatch(setToken(data?.data?.accessToken || ""));

      const form = new FormData();
      form.append("file", logo);

      const { data: imgData } = await uploadSingle(form);
      const url = imgData?.data || "";

      const shopPayload = {
        name: values.shop_name,
        description: values.shop_description,
        logo: url,
      };
      await creatShop(shopPayload);
      toast.success("Successfully registered");
      router.push("/dashboard/vendor");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }
    setLogo(file);
  };

  return (
    <div className="mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Register for Vendor</CardTitle>
          <CardDescription>
            Create your account and set up your shop
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Field
                      as={Input}
                      id="first_name"
                      name="first_name"
                      placeholder="John"
                    />
                    <ErrorMessage
                      name="first_name"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Field
                      as={Input}
                      id="last_name"
                      name="last_name"
                      placeholder="Doe"
                    />
                    <ErrorMessage
                      name="last_name"
                      component="p"
                      className="text-sm text-red-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="Password">Password</Label>
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shop_name">Shop Name</Label>
                  <Field
                    as={Input}
                    id="shop_name"
                    name="shop_name"
                    placeholder="My Awesome Shop"
                  />
                  <ErrorMessage
                    name="shop_name"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shop_description">Shop Description</Label>
                  <Field
                    as={Textarea}
                    id="shop_description"
                    name="shop_description"
                    placeholder="Describe your shop..."
                  />
                  <ErrorMessage
                    name="shop_description"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Shop Logo</Label>
                  {logo ? (
                    <Image
                      src={URL.createObjectURL(logo)}
                      alt="logo"
                      width={100}
                      height={100}
                    />
                  ) : (
                    ""
                  )}
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    required={true}
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-gray-500">
                    * Choose a logo for your shop
                  </p>
                </div>
                <Button type="submit" className="w-full bg-main">
                  Register
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
