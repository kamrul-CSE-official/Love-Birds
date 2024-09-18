"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

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

import offerImg from "@/assets/offer dialog.gif"; // Importing the offer GIF image
import localStorageServices from "@/helper/localStorageServices";

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

const HomePageBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog open

  // Cycle through banners every 7 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBanner((prevBanner) =>
        prevBanner === banners.length - 1 ? 0 : prevBanner + 1
      );
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  // Preload the next banner image
  useEffect(() => {
    const nextBanner = (currentBanner + 1) % banners.length;
    const img = new window.Image();
    img.src = banners[nextBanner].src;
  }, [currentBanner]);

  // Automatically open the dialog on first-time visit
  useEffect(() => {
    const hasVisited = localStorageServices.getItemWithExpiry("hasVisited");

    if (!hasVisited) {
      setTimeout(() => {
        setIsDialogOpen(true);
        localStorageServices.setItemWithExpiry(
          "hasVisited",
          "true",
          4 * 60 * 1000 // 4 min
        );
      }, 2500);
    }
  }, []);

  return (
    <div className="relative w-full flex-grow h-[69vh] mt-0 lg:mt-9">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Exclusive Offer</DialogTitle>
            <DialogDescription>
              Get the best deals on our unique handicraft items. Limited time
              only!
            </DialogDescription>
          </DialogHeader>

          {/* Adding the offer GIF inside the dialog */}
          <div className="flex justify-center my-1">
            <Image
              src={offerImg}
              alt="Exclusive Offer"
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>

          <DialogFooter>
            <Button type="submit" onClick={() => setIsDialogOpen(false)}>
              Claim Offer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Banner slider with animation */}
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
          priority={currentBanner === 0} // Prioritize first image
          className="w-full h-full"
        />
      </motion.div>
    </div>
  );
};

export default HomePageBanner;
