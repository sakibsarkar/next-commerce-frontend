import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function BecomeVendor() {
  return (
    <section className="w-full py-12 lg:py-0 bg-gradient-to-b from-white to-gray-50 mt-[28px]">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Earn With Us as a Vendor
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our thriving marketplace and turn your passion into profit.
                As a vendor, you&apos;ll get access to our vast customer base,
                powerful selling tools, and dedicated support to help your
                business grow.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/register/vendor"
                className="inline-flex items-center gap-2 bg-main text-white px-[15px] py-[5px] rounded-[5px] hover:bg-main/20 hover:text-main"
                style={{ transition: "0.3s" }}
              >
                Join Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <Card className="bg-main/20">
                <CardContent className="p-4 space-y-2">
                  <div className="text-3xl font-bold text-main">100K+</div>
                  <p className="text-xs text-main">Active Buyers</p>
                </CardContent>
              </Card>
              <Card className="bg-main/20">
                <CardContent className="p-4 space-y-2 text-main">
                  <div className="text-3xl font-bold">$2M+</div>
                  <p className="text-xs text-main">Monthly Sales</p>
                </CardContent>
              </Card>
              <Card className="bg-main/20">
                <CardContent className="p-4 space-y-2">
                  <div className="text-3xl font-bold text-main">5K+</div>
                  <p className="text-xs text-main">Successful Vendors</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Vendor Partnership Illustration"
              className="aspect-square overflow-hidden rounded-xl object-contain object-center"
              height={600}
              src="/images/vendorShip.png"
              width={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
