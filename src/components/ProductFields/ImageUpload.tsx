import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUploadMultipleFileMutation } from "@/redux/features/upload/upload.api";

import { CircleCheck, Loader, Upload } from "lucide-react";
import { ChangeEvent, DragEvent, useState } from "react";
import { toast } from "sonner";

interface IProps {
  onSave: (urls: string[]) => void;
  defaultImages?: string[];
}

const ImageUpload: React.FC<IProps> = ({ onSave, defaultImages }) => {
  const [images, setImages] = useState<File[]>([]);
  const [savedImages, setSavedImages] = useState<string[]>(defaultImages || []);
  const [uploadMultiImage, { isLoading }] =
    useUploadMultipleFileMutation(undefined);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);

    const types = ["image/jpeg", "image/png", "image/gif", "image/jpeg"];

    const validFiles = files.filter((file) => types.includes(file.type)) || [];

    setImages((prevImages) => [...prevImages, ...validFiles]);
  };
  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleSaveImages = async () => {
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("images", image);
      });

      const res = await uploadMultiImage(formData);
      const ulrs = res?.data?.data || [];
      onSave(ulrs);
      setSavedImages([...savedImages, ...ulrs]);

      setImages([]);
      toast.success("Images uploaded successfully");
    } catch (error) {
      toast.error("Something went wrong while uploading your images");
    }
  };

  const handleRemoveSavedImage = (index: number) => {
    setSavedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
      </CardHeader>
      <CardContent>
        <div onDrop={handleDrop} onDragOver={handleDragOver}>
          {images.length < 1 ? (
            <Label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG or GIF
                </p>
              </div>
            </Label>
          ) : (
            <div className="flex flex-col gap-[15px]">
              <h3 className="text-[18px] font-[600]">
                Uploaded Images ({images.length})
              </h3>
              <div className="flex flex-wrap justify-start items-start gap-[15px]">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-[150px] h-[150px] center shrink-0 border-[1px] border-input rounded-[8px]"
                  >
                    <img
                      width={150}
                      height={150}
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      className="w-full h-auto max-h-full object-cover rounded-lg shadow-md"
                    />
                    <p className="absolute bottom-0 left-0 text-white bg-[#0000004f] bg-opacity-50 p-1 rounded w-full overflow-hidden max-h-[50px]">
                      {image.name}
                    </p>
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full h-[16px] w-[16px] text-xs"
                      title="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                ))}{" "}
                <Label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center h-[150px] w-[150px] border-2 border-dashed border-primary rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 "
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    Upload More
                    <br /> or <br /> Drop anywhere
                  </div>
                </Label>
              </div>
              <p className="mt-[20px] text-muted-foreground italic">
                * Dont forgot to save images
              </p>
            </div>
          )}
          {savedImages.length > 0 && (
            <div className="flex flex-col gap-[15px] mt-[20px]">
              <h3 className="text-[18px] font-[600] text-green-500 flex items-center gap-[5px]">
                <CircleCheck width={22} /> Saved Images ({savedImages.length})
              </h3>
              <div className="flex flex-wrap justify-start items-start gap-[15px]">
                {savedImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-[150px] h-[150px] center shrink-0 border-[1px] border-input rounded-[8px]"
                  >
                    <img
                      width={150}
                      height={150}
                      src={image}
                      alt={"saved image"}
                      className="w-full h-auto max-h-full object-cover rounded-lg shadow-md"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveSavedImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full h-[16px] w-[16px] text-xs"
                      title="Remove image"
                    >
                      &times;
                    </button>
                  </div>
                ))}{" "}
              </div>
            </div>
          )}
          {images.length > 0 && (
            <Button
              type="button"
              onClick={handleSaveImages}
              className="center gap-[10px] disabled:!cursor-not-allowed mt-[20px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  Saving... <Loader className="animate-spin" />
                </>
              ) : (
                "Save"
              )}
            </Button>
          )}
          <Input
            id="image-upload"
            type="file"
            className="hidden"
            accept=".png, .jpg, .jpeg, .gif"
            onChange={handleImageChange}
            aria-label="Upload image"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
