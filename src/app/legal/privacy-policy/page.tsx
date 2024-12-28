import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const page = () => {
  return (
    <div className="container max-w-3xl py-6 lg:py-10">
      <div className="flex items-center space-x-2 mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl lg:text-3xl">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-loose space-y-6">
          <section>
            <p>
              Your privacy is important to us. It is [Your Store Name]&apos;s
              policy to respect your privacy regarding any information we may
              collect from you across our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              1. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Name and contact information</li>
              <li>Billing and shipping addresses</li>
              <li>Payment information</li>
              <li>Order history</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Process your orders and payments</li>
              <li>Communicate with you about your orders and products</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              3. Cookies and Tracking
            </h2>
            <p>
              We use cookies and similar tracking technologies to track the
              activity on our website and hold certain information. Cookies are
              files with small amount of data which may include an anonymous
              unique identifier.
            </p>
            <p className="mt-2">We use cookies for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Maintaining your shopping cart</li>
              <li>Remembering your preferences</li>
              <li>Understanding how you use our website</li>
              <li>Improving our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security
              measures to protect your personal information against accidental
              or unlawful destruction, loss, alteration, unauthorized
              disclosure, or access.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              5. Third-Party Services
            </h2>
            <p>
              We may employ third-party companies and individuals due to the
              following reasons:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>To facilitate our Service</li>
              <li>To provide the Service on our behalf</li>
              <li>To perform Service-related services</li>
              <li>To assist us in analyzing how our Service is used</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to our use of your information</li>
              <li>Withdraw consent where applicable</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              7. Children&apos;s Privacy
            </h2>
            <p>
              Our Service does not address anyone under the age of 13. We do not
              knowingly collect personally identifiable information from
              children under 13.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page
              and updating the &quot;last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:{" "}
              <Link
                href="mailto:privacy@example.com"
                className="text-primary hover:underline"
              >
                privacy@example.com
              </Link>
            </p>
          </section>

          <div className="text-muted-foreground text-xs mt-8">
            Last updated: January 1, 2024
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
