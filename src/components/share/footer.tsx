import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import logo from "@/assets/love-bards logo.png";
import googlePlay from "@/assets/google-play-logo.webp";
import appStore from "@/assets/app-store-logo.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-8 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold mb-4">ONLINE SHOPPING</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Men",
              "Women",
              "Kids",
              "Home & Living",
              "Beauty",
              "Gift Cards",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="font-bold mt-6 mb-4">USEFUL LINKS</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Blog",
              "Careers",
              "Site Map",
              "Corporate Information",
              "Whitehat",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">CUSTOMER POLICIES</h3>
          <ul className="space-y-2 text-sm">
            {[
              "Contact Us",
              "FAQ",
              "T&C",
              "Terms Of Use",
              "Track Orders",
              "Shipping",
              "Cancellation",
              "Returns",
              "Privacy Policy",
              "Grievance Officer",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-4">EXPERIENCE MOBILE APP</h3>
          <div className="flex space-x-2 mb-6">
            <Image
              src={googlePlay}
              alt="Google Play"
              className="h-10"
              width={100}
              height={100}
            />
            <Image
              src={appStore}
              alt="App store"
              className="h-10"
              width={100}
              height={100}
            />
          </div>
          <h3 className="font-bold mb-4">KEEP IN TOUCH</h3>
          <div className="flex space-x-4">
            <FaFacebookF className="text-xl" />
            <FaTwitter className="text-xl" />
            <FaYoutube className="text-xl" />
            <FaInstagram className="text-xl" />
          </div>
        </div>
        <div>
          <div className="flex items-center mb-4">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="mr-2 h-12 w-12"
            />
            <div>
              <p className="font-bold">100% ORIGINAL</p>
              <p className="text-sm">guarantee for all products</p>
            </div>
          </div>
          <div className="flex items-center mb-6">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="mr-2 h-12 w-12"
            />

            <div>
              <p className="font-bold">Return within 30days</p>
              <p className="text-sm">of receiving your order</p>
            </div>
          </div>
          <h3 className="font-bold mb-2">SUBSCRIBE TO OUR NEWSLETTER</h3>
          <div className="flex">
            <Input
              type="email"
              placeholder="Enter Email Address"
              className="rounded-r-none"
            />
            <Button className="rounded-l-none">SUBSCRIBE</Button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-sm text-center">
        <p>In case of any concern, Contact Us</p>
        <p>© {currentYear} www.love-birds.com. All rights reserved.</p>
      </div>
    </footer>
  );
}
