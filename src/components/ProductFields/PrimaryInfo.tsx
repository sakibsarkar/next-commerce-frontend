import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TextEditor from "@/components/uiElements/TextEditor";
import { ICategory } from "@/types/category";
import { ErrorMessage, Field } from "formik";
import CategorySelector from "../ProductFields/CategorySelector";
interface IProps {
  values: Record<string, any>;
  onCategoryChange: (category: string | undefined) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onDescriptionChange: (description: string) => void;
  defaultCategory?: ICategory;
  defaultDescription?: string;
}

const PrimaryInfo: React.FC<IProps> = ({
  onCategoryChange,
  onDescriptionChange,
  defaultCategory,
  defaultDescription,
}) => {
  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Primary Info</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-[20px]">
        <div>
          <Label htmlFor="name">Name</Label>
          <Field
            name="name"
            as={Input}
            id="name"
            placeholder="Product name"
            className="mt-1"
          />

          <ErrorMessage
            name="name"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div>
          <Label htmlFor="tag">Tag name</Label>
          <Field
            name="tag"
            as={Input}
            id="tag"
            placeholder="Product tag name"
            className="mt-1"
          />
          <ErrorMessage
            name="tag"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <TextEditor
            height={350}
            onChange={onDescriptionChange}
            defaultValue={defaultDescription}
          />
        </div>
        <CategorySelector
          onChange={onCategoryChange}
          defaultValue={defaultCategory}
        />
        <div className="flex items-start gap-4">
          <div className="w-full">
            <Label htmlFor="price">Price</Label>
            <Field
              name="price"
              as={Input}
              id="price"
              type="number"
              placeholder="0.00"
              className="mt-1"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500 text-sm"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrimaryInfo;

