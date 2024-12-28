"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSetSearchParams from "@/hooks/useSetParams";
import { CreditCard, RefreshCcw, Store, User } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const supportIssues = [
  {
    value: "order payment",
    label: "Order/Payment related issue",
    icon: CreditCard,
  },
  { value: "account", label: "Account related", icon: User },
  { value: "vendor account", label: "Vendor account related", icon: Store },
  { value: "refund or return", label: "Refund or return", icon: RefreshCcw },
];
const SupportForm = () => {
  const { searchParams } = useSetSearchParams();
  const defaultIssue = searchParams.get("issue") || "";
  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Your Name *</Label>
        <Input id="name" placeholder="Your Name" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Your Email *</Label>
        <Input id="email" type="email" placeholder="Your Email" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="issue-type">Issue Type *</Label>
        <Select defaultValue={defaultIssue}>
          <SelectTrigger id="issue-type" className="w-full">
            <SelectValue placeholder="Select an issue type" />
          </SelectTrigger>
          <SelectContent>
            {supportIssues.map((issue) => (
              <SelectItem key={issue.value} value={issue.value}>
                <div className="flex items-center">
                  <issue.icon className="mr-2 h-4 w-4" />
                  <span>{issue.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Issue Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your issue"
          required
          className="min-h-[120px]"
        />
      </div>
      <Button type="submit" className="w-full">
        Send Message
      </Button>
    </form>
  );
};

export default SupportForm;
