"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateNewsLetterMutation } from "@/redux/features/newsLetter/newsLetter.api";
import { Loader2, Mail, ShoppingBag } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export default function NewsletterSection() {
  const [status, setStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});

  const [createNewsLetter, { isLoading }] = useCreateNewsLetterMutation();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const form = e.target as HTMLFormElement;
      const email = form.email?.value || "";
      const result = await createNewsLetter({ email });
      const error = result.error as any;

      if (error) {
        setStatus({
          success: false,
          message:
            error?.data?.message || "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({
        success: true,
        message: "Subscribed successfully",
      });
    } catch (error) {
      setStatus({
        success: false,
        message: "Something went wrong. Please try again.",
      });
    }
  }

  return (
    <section className="relative overflow-hidden border-t bg-white my-[50px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700" />
        <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600" />
      </div>

      <div className="relative container px-4 py-16 md:py-24 lg:px-8 lg:py-32 mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-8 rounded-full bg-primary/10">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stay up to date with our latest offers
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Subscribe to our newsletter and get 10% off your first purchase,
            plus exclusive access to new arrivals and special promotions.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            {status.message && (
              <div
                className={`mt-4 text-sm ${
                  status.success
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
                role="alert"
              >
                {status.message}
              </div>
            )}
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            By subscribing, you agree to our{" "}
            <Link
              href="/legal/term-and-condition"
              className="underline underline-offset-2 hover:text-primary"
            >
              Terms & Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/legal/privacy-policy"
              className="underline underline-offset-2 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
