import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IProduct } from "@/types/product";
import { ErrorMessage, Field, FieldArray } from "formik";
import { Plus, X } from "lucide-react";
const ColorsInfo = ({ colors }: { colors: IProduct["colors"] }) => {
  return (
    <FieldArray name="colors">
      {({ push: pushColor, remove: removeColor }) => (
        <div className="w-full  min-w-[350px]">
          <h2 className="text-lg font-semibold mb-4">Colors and Sizes</h2>
          {colors.map((color, colorIndex) => (
            <div key={colorIndex} className="mb-6 p-4 border rounded-md">
              <div className="flex items-end mb-2">
                <div className="w-full">
                  <Label htmlFor={`colors.${colorIndex}.color`}>Color</Label>
                  <Field
                    name={`colors.${colorIndex}.color`}
                    as={Input}
                    placeholder="Color name"
                    className="mt-1"
                  />
                  <ErrorMessage
                    name={`colors.${colorIndex}.color`}
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeColor(colorIndex)}
                  className="ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Sizes for each color */}
              <FieldArray name={`colors.${colorIndex}.sizes`}>
                {({ push: pushSize, remove: removeSize }) => (
                  <div className="w-[90%]">
                    {colors[colorIndex].sizes.map((size, sizeIndex) => (
                      <div
                        key={sizeIndex}
                        className="flex items-end justify-start mb-2 gap-[20px]"
                      >
                        <div className="w-1/2">
                          <Label
                            htmlFor={`colors.${colorIndex}.sizes.${sizeIndex}.size`}
                          >
                            Size
                          </Label>
                          <Field
                            name={`colors.${colorIndex}.sizes.${sizeIndex}.size`}
                            as={Input}
                            placeholder="Size"
                            className="mt-1"
                          />
                          <ErrorMessage
                            name={`colors.${colorIndex}.sizes.${sizeIndex}.size`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <div className="w-1/2">
                          <Label
                            htmlFor={`colors.${colorIndex}.sizes.${sizeIndex}.quantity`}
                          >
                            Quantity
                          </Label>
                          <Field
                            name={`colors.${colorIndex}.sizes.${sizeIndex}.quantity`}
                            as={Input}
                            type="number"
                            placeholder="Quantity"
                            className="mt-1"
                          />
                          <ErrorMessage
                            name={`colors.${colorIndex}.sizes.${sizeIndex}.quantity`}
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSize(sizeIndex)}
                          className="ml-2"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      onClick={() => pushSize({ size: "", quantity: 0 })}
                      className="mt-4"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Size
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>
          ))}
          <Button
            type="button"
            variant={"outline"}
            onClick={() => pushColor({ color: "", sizes: [] })}
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Color
          </Button>
        </div>
      )}
    </FieldArray>
  );
};

export default ColorsInfo;
