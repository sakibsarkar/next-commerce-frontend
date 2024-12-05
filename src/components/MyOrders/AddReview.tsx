"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReviewMutation } from "@/redux/features/review/review.api";
import { useUploadSingleFileMutation } from "@/redux/features/upload/upload.api";
import { useFormik } from "formik";
import { Star, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  rating: 1,
  description: "",
};

type TFormValues = typeof initialValues;

const AddReview = ({ orderId }: { orderId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<{ file: File | null; url: string }>({
    file: null,
    url: "",
  });

  const [updateSingle, { isLoading }] = useUploadSingleFileMutation();
  const [addReview, { isLoading: reviewLoading }] = useCreateReviewMutation();

  const handleSubmit = async (value: TFormValues) => {
    if (isLoading || reviewLoading) {
      return;
    }
    const payload = {
      orderId,
      rating: value.rating,
      description: value.description,
      image: file.url,
    };

    try {
      const res = await addReview(payload);
      const error = res.error as any;
      if (error) {
        toast.error("Something went wrong");
        return;
      }
      toast.success("Review added successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      rating: Yup.number()
        .required("Rating is required")
        .min(1, "Minimum rating is 1"),
      description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters long"),
    }),
    onSubmit: handleSubmit,
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const uploadedFie = event.target.files?.[0];

    if (!uploadedFie) {
      return;
    }

    setFile({
      file: uploadedFie,
      url: file.url,
    });

    const form = new FormData();
    form.append("file", uploadedFie!);

    const res = await updateSingle(form);

    const error = res.error as any;

    if (error) {
      setFile({
        file: null,
        url: "",
      });
      toast.error("Something went wrong while uplaoding the image", {
        description: "Please try another image",
      });
      return;
    }

    const imageUrl = res.data?.data || "";
    console.log({ imageUrl });

    setFile({
      file: uploadedFie,
      url: imageUrl,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer ${
                  star <= formik.values.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
                onClick={() => formik.setFieldValue("rating", star)}
              />
            ))}
          </div>
          {formik.errors.rating && formik.touched.rating && (
            <p className="text-sm text-red-500">{formik.errors.rating}</p>
          )}
          <Textarea
            placeholder="Write your review here..."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="description"
            className="min-h-[100px]"
          />
          {formik.errors.description && formik.touched.description && (
            <p className="text-sm text-red-500">{formik.errors.description}</p>
          )}
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("image-upload")?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Image
            </Button>
            {file.file && (
              <div className="relative w-[100] h-[100px]">
                <Image
                  src={URL.createObjectURL(file.file as Blob)}
                  alt="Uploaded image"
                  width={100}
                  height={100}
                  className="w-[100px] h-[100px] object-cover rounded-md"
                />
                {isLoading ? (
                  <span className="absolute top-0 right-0 w-full h-full bg-[#ffffff91] center">
                    <FaSpinner className="animate-spin" />
                  </span>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={
              formik.values.rating === 0 ||
              formik.values.description.trim() === ""
            }
          >
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReview;
