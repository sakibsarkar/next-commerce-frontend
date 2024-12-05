import * as Yup from "yup";

export const productValidation = Yup.object({
  name: Yup.string().required("Product name is required"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be positive"),
  tag: Yup.string().optional(),
  discount: Yup.number().min(0, "Discount must be positive").optional(),
  stock: Yup.number()
    .required("Stock is required")
    .min(0, "Stock must be positive")
    .optional(),
  colors: Yup.array()
    .of(
      Yup.object({
        color: Yup.string().required("Color name is required"),
        sizes: Yup.array()
          .of(
            Yup.object({
              size: Yup.string().required("Size name is required"),
              quantity: Yup.number()
                .required("Quantity is required")
                .min(1, "Quantity must be at least 1"),
            })
          )
          .min(1, "At least one size is required if color is added"),
      })
    )
    .min(1, "At least one color is required"),
});
export const productprimaryInfoValidation = Yup.object({
  name: Yup.string().required("Product name is required"),
  price: Yup.number()
    .required("Price is required")
    .min(1, "Price must be positive"),
  tag: Yup.string().optional(),
});
