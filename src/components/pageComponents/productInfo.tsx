"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  FaHandHoldingHeart,
  FaExchangeAlt,
  FaShieldAlt,
  FaShoppingCart,
} from "react-icons/fa";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import secondBanner1 from "@/assets/second banner.jpg";
import secondBanner2 from "@/assets/product info 2.jpg";
import secondBanner3 from "@/assets/second banner.jpg";
import secondBanner4 from "@/assets/product info 4.jpg";

const infoImag = [secondBanner1, secondBanner2, secondBanner3, secondBanner4];

const headerItems = [
  { icon: FaHandHoldingHeart, text: "Support Independent Artisans" },
  { icon: FaExchangeAlt, text: "Easy Returns and Exchanges" },
  { icon: FaShieldAlt, text: "Secure Payments" },
  { icon: FaShoppingCart, text: "Seamless Shopping Experience" },
];

export default function ProductInfo() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBanner((prevBanner) =>
        prevBanner === infoImag.length - 1 ? 0 : prevBanner + 1
      );
    }, 3500); // Change every 3.5 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Preload the next image
    const nextBanner = (currentBanner + 1) % infoImag.length;

    // Use HTMLImageElement for correct typing
    const img = new window.Image(); // Explicitly refer to window.Image
    img.src = infoImag[nextBanner].src; // Use the `src` field correctly
  }, [currentBanner]);
  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header Section */}
      <Card className="mb-8 bg-primary rounded-md lg:rounded-full overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center justify-center lg:justify-around gap-3 flex-wrap lg:flex-nowrap">
            {headerItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 text-center border-b sm:border-b-0 sm:border-r last:border-0 border-[#A0522D]"
              >
                <item.icon className="mr-2 text-xl text-white" />
                <span className="text-sm text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Banner and Text Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 relative">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={infoImag[currentBanner]}
              alt="Decorative handicraft items"
              layout="fill"
              objectFit="cover"
              priority={currentBanner === 0}
              className="w-full h-full"
            />
          </motion.div>
        </div>
        <div className="md:w-1/2">
          <h2 className="text-sm mb-2 text-gray-500">HANDMADE WITH LOVE</h2>
          <h1 className="text-3xl font-semibold mb-4">
            Unique Handcrafted Pieces for Your Home
          </h1>
          <p className="text-sm md:text-base">
            Discover our collection of exquisite handcrafted items made by
            talented artisans from around the world. Each piece tells a story,
            combining tradition, artistry, and a passion for craftsmanship.
            Whether you are looking to add a touch of elegance to your living
            space or searching for the perfect gift, our selection offers
            something truly special.
          </p>
          <p className="mt-4 text-sm md:text-base">
            We are committed to supporting independent creators and ensuring
            that their work reaches a broader audience. By purchasing from our
            store, you are not just buying a product—you are supporting a
            community of passionate artisans who put their heart into every item
            they create.
          </p>
        </div>
      </div>
    </div>
  );
}
