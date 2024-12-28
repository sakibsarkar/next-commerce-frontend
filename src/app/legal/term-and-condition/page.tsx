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
          <CardTitle className="text-2xl lg:text-3xl">
            Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-loose space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to [Your Store Name]. By accessing and using this website,
              you accept and agree to be bound by the terms and provision of
              this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the
              materials (information or software) on [Your Store Name]&apos;s
              website for personal, non-commercial transitory viewing only.
            </p>
            <p className="mt-2">
              This is the grant of a license, not a transfer of title, and under
              this license you may not:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                on the website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
              <li>
                Transfer the materials to another person or &quot;mirror&quot;
                the materials on any other server
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">3. Disclaimer</h2>
            <p>
              The materials on [Your Store Name]&apos;s website are provided on
              an &apos;as is&apos; basis. [Your Store Name] makes no warranties,
              expressed or implied, and hereby disclaims and negates all other
              warranties including, without limitation, implied warranties or
              conditions of merchantability, fitness for a particular purpose,
              or non-infringement of intellectual property or other violation of
              rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">4. Limitations</h2>
            <p>
              In no event shall [Your Store Name] or its suppliers be liable for
              any damages (including, without limitation, damages for loss of
              data or profit, or due to business interruption) arising out of
              the use or inability to use the materials on [Your Store
              Name]&apos;s website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              5. Accuracy of Materials
            </h2>
            <p>
              The materials appearing on [Your Store Name]&apos;s website could
              include technical, typographical, or photographic errors. [Your
              Store Name] does not warrant that any of the materials on its
              website are accurate, complete, or current.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">6. Links</h2>
            <p>
              [Your Store Name] has not reviewed all of the sites linked to its
              website and is not responsible for the contents of any such linked
              site. The inclusion of any link does not imply endorsement by
              [Your Store Name] of the site. Use of any such linked website is
              at the user&apos;s own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">7. Modifications</h2>
            <p>
              [Your Store Name] may revise these terms of service for its
              website at any time without notice. By using this website, you are
              agreeing to be bound by the then current version of these terms of
              service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">8. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in
              accordance with the laws and you irrevocably submit to the
              exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">
              9. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us at:{" "}
              <Link
                href="mailto:support@example.com"
                className="text-primary hover:underline"
              >
                support@example.com
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
