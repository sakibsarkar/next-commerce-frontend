"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryData } from "@/const/category";
import { useCreateNewsLetterMutation } from "@/redux/features/newsLetter/newsLetter.api";
import Link from "next/link";
import { useState } from "react";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { CiYoutube } from "react-icons/ci";
import { FaFacebook, FaSpinner } from "react-icons/fa6";
import { supportIssues } from "../Home/SupportForm";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const footerLinks = [
  {
    title: "Shop",
    links: [
      {
        label: "New Arrival",
        href: "#latest",
      },
      ...categoryData.map((cat) => ({
        label: cat.label,
        href: `/product?category=${cat.id}`,
      })),
    ],
  },
  {
    title: "Important Links",
    links: [
      {
        label: "Terms & Conditions",
        href: "/legal/term-and-condition",
      },
      {
        label: "Privacy Policy",
        href: "/legal/privacy-policy",
      },
      {
        label: "Work with us",
        href: "/register/vendor",
      },
    ],
  },
  {
    title: "Help & Support",
    links: supportIssues.map((issue) => ({
      label: issue.value,
      href: `/help-support?issue=${issue.value}`,
    })),
  },
];

const socialLinks = [
  { name: "Facebook", icon: FaFacebook, url: "https://facebook.com" },
  { name: "Twitter", icon: BsTwitter, url: "https://twitter.com" },
  { name: "Instagram", icon: BsInstagram, url: "https://instagram.com" },
  { name: "YouTube", icon: CiYoutube, url: "https://youtube.com" },
];
const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{
    success?: boolean;
    message?: string;
  }>({});
  const [createNewsLetter, { isLoading }] = useCreateNewsLetterMutation();
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus({ success: false, message: "Please enter your email" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setStatus({ success: false, message: "Please enter a valid email" });
      return;
    }

    try {
      const form = e.target as HTMLFormElement;
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
  };
  return (
    <footer className="bg-[#2C2C2C] text-main">
      <div className="py-12 layout_container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Desktop Footer Links */}
          <div className="col-span-3 hidden md:grid md:grid-cols-3 gap-8">
            {footerLinks.map((column) => (
              <div key={column.title}>
                <h3 className="text-lg font-semibold mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map(({ href, label }, i) => (
                    <li key={href + i}>
                      <Link
                        href={href}
                        className="text-white hover:text-main transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden">
            <Accordion type="single" collapsible className="w-full">
              {footerLinks.map((column, index) => (
                <AccordionItem
                  value={`item-${index}`}
                  key={column.title}
                  className="border-main"
                >
                  <AccordionTrigger className="text-main hover:text-white">
                    {column.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {column.links.map(({ href, label }) => (
                        <li key={href}>
                          <Link
                            href={href}
                            className="text-white hover:text-main transition-colors"
                          >
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Subscribe to our newsletter
            </h3>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#3C3C3C] border-main text-white placeholder-gray-400 focus:ring-main focus:border-main"
              />

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
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-main text-[#2C2C2C] hover:bg-[#d3a912] transition-colors center gap-[5px]"
              >
                Subscribe {isLoading && <FaSpinner className="animate-spin" />}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-main flex flex-col md:flex-row justify-between items-center">
          {/* Social Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-main hover:text-white transition-colors"
              >
                <social.icon className="h-6 w-6" />
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-main">Language:</span>
            <Select defaultValue="en">
              <SelectTrigger className="w-[180px] bg-[#3C3C3C] border-main text-white focus:ring-main focus:border-main">
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent className="bg-[#3C3C3C] border-main">
                <SelectItem
                  value="en"
                  className="text-white hover:bg-main hover:text-[#2C2C2C]"
                >
                  English
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-white text-sm">
          © {new Date().getFullYear()} Next Commerce. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
