import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const page = () => {
  return (
    <div className="w-full h-screen center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Account Suspended
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Access Restricted</AlertTitle>
            <AlertDescription>
              Your account has been suspended. You cannot access full
              information or take any actions on your profile.
            </AlertDescription>
          </Alert>
          <div className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-400">
            <p>Due to this suspension:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>You cannot view or edit your profile information</li>
              <li>Can&apos;t Place any order</li>
              <li>You cannot make any purchases or transactions</li>
              <li>Shop onwers can&apos;t access their shop any more</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline">Contact Support</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
