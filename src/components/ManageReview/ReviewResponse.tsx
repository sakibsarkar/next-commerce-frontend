import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCreateReviewResponseMutation } from "@/redux/features/review/review.api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface IProps {
  reviewId: string;
}

const ReviewResponse: React.FC<IProps> = ({ reviewId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createResponse] = useCreateReviewResponseMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const response = form.response.value;
    const result = await createResponse({ description: response, reviewId });
    const error = result.error as any;

    if (error) {
      toast.error(error?.data?.message || "Something went wrong");
      setIsDialogOpen(false);
      return;
    }

    toast.success("Response added successfully");
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-2">
          Respond
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Respond to Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Textarea
            placeholder="Type your response here..."
            className="min-h-[100px]"
            name="response"
          />
          <Button type="submit">Submit Response</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewResponse;
