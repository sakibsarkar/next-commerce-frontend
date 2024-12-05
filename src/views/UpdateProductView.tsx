"use client";
import ImageUpload from "@/components/ProductFields/ImageUpload";
import PrimaryInfo from "@/components/ProductFields/PrimaryInfo";
import { Button } from "@/components/ui/button";
import DashboardHeading from "@/components/uiElements/DashboardHeading";
import {
  useGetProductByIdQuery,
  useUpdateProductMutation,
} from "@/redux/features/product/product.api";
import { IProduct } from "@/types/product";
import { productValidation } from "@/validation/productValidation";
import { Form, Formik } from "formik";
import { Loader } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
const UpdateProductView = () => {
  const id = useParams().id as string;
  const router = useRouter();

  const { data, isFetching } = useGetProductByIdQuery(id);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  const [initialValues, setInitialValues] = useState<IProduct | undefined>();
  useEffect(() => {
    setInitialValues(data?.data);
  }, [data]);

  if (!initialValues || isFetching) {
    return <Loader />;
  }

  const handleUpdateProduct = async (values: IProduct) => {
    const { categoryId, description, images } = initialValues;

    if (!categoryId) {
      return toast.error("Please add a category");
    }

    if (!description) {
      return toast.error("Please add a description");
    }

    if (!images.length) {
      return toast.error("Please upload at least one image");
    }

    const payload = {
      name: values?.name?.trim(),
      price: Number(values?.price),
      discount: Number(values?.discount),
      tag: values?.tag?.trim(),
      categoryId,
      description,
      images,
    };

    try {
      const res = await updateProduct({ payload: payload, id: id });
      const error = res.error as any;

      if (error) {
        toast.error(error?.data?.message || "Something went wrong");
        router.push("/dashboard/vendor/manage-products");
        return;
      }

      router.push("/dashboard/vendor/manage-products");
      toast.success("Product updated successfully");

      toast.success("Product updated successfully");
    } catch {
      toast.error("Something went wrong while updating your product");
    }
  };

  return (
    <div className="w-full mx-auto">
      <DashboardHeading
        title="Update Product"
        description="Updating your existing product"
        className="mb-[20px]"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={productValidation}
        onSubmit={handleUpdateProduct}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-full mx-auto space-y-8">
            <ImageUpload
              onSave={(urls) =>
                setInitialValues({ ...initialValues, images: urls })
              }
              defaultImages={initialValues.images}
            />
            <PrimaryInfo
              values={values}
              setFieldValue={setFieldValue}
              defaultCategory={initialValues.categoryInfo}
              defaultDescription={initialValues.description}
              onDescriptionChange={(description) =>
                setInitialValues({ ...initialValues, description })
              }
              onCategoryChange={(categories) =>
                // @ts-ignore
                setInitialValues({ ...initialValues, categories })
              }
            />

            <div className="center gap-[20px] w-fit">
              <Button type="button" className="w-full" variant={"destructive"}>
                Cancel
              </Button>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Product"}
                {isLoading && <FaSpinner className="animate-spin ml-2" />}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProductView;
