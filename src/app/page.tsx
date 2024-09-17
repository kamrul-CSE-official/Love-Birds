"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import FamousProducts from "@/components/pageComponents/famoursProducts";
import banner1 from "@/assets/banner image.jpg";
import banner2 from "@/assets/banner1.1.jpg";
import banner3 from "@/assets/banner1.2.jpg";
import banner4 from "@/assets/banner1.3.jpg";
import banner5 from "@/assets/banner1.4.jpg";
import banner6 from "@/assets/banner1.5.jpg";
import banner7 from "@/assets/banner1.6.jpg";
import banner8 from "@/assets/banner1.7.jpg";
import banner9 from "@/assets/banner1.8.jpg";
import banner10 from "@/assets/banner1.9.jpg";
import banner11 from "@/assets/banner1.10.jpg";
import banner12 from "@/assets/banner1.11.jpg";
import banner13 from "@/assets/banner1.12.jpg";

import categories1 from "@/assets/Handicraft-1.jpg";
import categories2 from "@/assets/Water-2.jpg";
import categories3 from "@/assets/Pendulum-3.jpg";
import categories4 from "@/assets/Hangings-4.jpg";
import categories5 from "@/assets/kitchen-5.jpg";

const categories = [
  { name: "Handicraft Items", image: categories1 },
  { name: "Water Fountains", image: categories2 },
  { name: "Pendulum Clocks", image: categories3 },
  { name: "Wall Hangings", image: categories4 },
  { name: "KITCHEN & DINING", image: categories5 },
];

// List of banners
const banners = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  banner7,
  banner8,
  banner9,
  banner10,
  banner11,
  banner12,
  banner13,
];

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    // Function to change the banner every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentBanner((prevBanner) =>
        prevBanner === banners.length - 1 ? 0 : prevBanner + 1
      );
    }, 5000); // Change every 5 seconds

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative w-full flex-grow h-[75vh] mt-0 lg:mt-9">
        <motion.div
          key={currentBanner}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={banners[currentBanner]}
            alt="Decorative handicraft items"
            layout="fill"
            objectFit="cover"
            priority
            className="w-full h-full"
          />
        </motion.div>
      </div>

      {/* Categories Section */}
      <div className="bg-secondary py-4 px-2 sm:px-4 mb-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center flex-wrap gap-8 lg:gap-10">
            {categories.map((category, index) => (
              <Link
                href={`/category/${category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                key={index}
              >
                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2">
                    <Image
                      src={category.image}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full border-2 border-primary group-hover:scale-125 transform transition duration-100"
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-center font-semibold">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Famous Products */}
      <FamousProducts />
    </div>
  );
}
