"use client";
import ColorsInfo from "@/components/ProductFields/ColorsInfo";
import ImageUpload from "@/components/ProductFields/ImageUpload";
import PrimaryInfo from "@/components/ProductFields/PrimaryInfo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeading from "@/components/uiElements/DashboardHeading";
import { useCreateProductMutation } from "@/redux/features/product/product.api";
import { IProduct } from "@/types/product";
import { productValidation } from "@/validation/productValidation";
import { Form, Formik } from "formik";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

type TProductCreateForm = Pick<
  IProduct,
  "colors" | "name" | "price" | "stock" | "tag" | "discount"
>;
type TProductCreateNonForm = Pick<IProduct, "description" | "images"> & {
  categoryId: string;
};

export type TProductData = TProductCreateForm & TProductCreateNonForm;

const CreateProductView = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const [nonFormData, setNonFormData] = useState<TProductCreateNonForm>({
    categoryId: "",
    description: "",
    images: [],
  });

  const [initialValues] = useState<TProductCreateForm>({
    name: "",
    price: 0,
    stock: 0,
    discount: 0,
    tag: "featured",
    // @ts-ignore
    colors: [{ color: "", sizes: [{ size: "", quantity: 0 }] }],
  });

  const handleCreateProduct = async (value: TProductCreateForm) => {
    if (!nonFormData.images.length)
      return toast.error(
        "Please upload at least one image or save your image before creating a product"
      );

    if (!nonFormData.categoryId) return toast.error("Please add a category");
    if (!nonFormData.description)
      return toast.error("Please add a description");
    const totalStock = value.colors.reduce((acc, curr) => {
      return (
        acc +
        curr.sizes.reduce((acc, curr) => {
          return acc + curr.quantity;
        }, 0)
      );
    }, 0);

    const payload: TProductData = {
      ...value,
     
      ...nonFormData,
      stock: totalStock,
    };

    console.log(payload);

    try {
      const res = await createProduct(payload);
      const error = res.error as any;

      if (error) {
        toast.error(error.data?.message || "Unknown error occureds");
        return;
      }

      toast.success("Product created successfully");
    } catch {
      toast.error("Something went wrong while creating your product");
    }
  };

  return (
    <div className="w-full mx-auto">
      <DashboardHeading
        title="Create new product"
        description="Create a new product and add it to your store"
        className="mb-[20px]"
      />
      <Formik
        initialValues={initialValues}
        validationSchema={productValidation}
        onSubmit={handleCreateProduct}
      >
        {({ values, setFieldValue }) => (
          <Form className="w-full mx-auto space-y-8">
            <ImageUpload
              onSave={(url) => setNonFormData({ ...nonFormData, images: url })}
            />
            <PrimaryInfo
              values={values}
              setFieldValue={setFieldValue}
              onDescriptionChange={(description) =>
                setNonFormData({ ...nonFormData, description })
              }
              onCategoryChange={(category) =>
                setNonFormData({ ...nonFormData, categoryId: category || "" })
              }
            />

            {/* Offers */}
            <Card>
              <CardHeader>
                <CardTitle>Other information</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-[20px] flex-wrap lg:flex-nowrap">
                <ColorsInfo colors={values.colors} />
              </CardContent>
            </Card>

            <Button type="submit" className="w-full" disabled={isLoading}>
              Create product
              {isLoading && <FaSpinner className="animate-spin ml-2" />}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProductView;
