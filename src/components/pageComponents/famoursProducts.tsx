"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";

import product1 from "@/assets/p-1.jpg";
import product2 from "@/assets/p-2.jpg";
import product3 from "@/assets/p-3.jpg";
import product4 from "@/assets/p-4.jpg";
import product5 from "@/assets/p-5.jpg";
import product6 from "@/assets/p-6.jpg";
import product7 from "@/assets/p-7.jpg";
import product8 from "@/assets/p-8.jpg";
import product9 from "@/assets/p-9.jpg";
import product10 from "@/assets/p-10.jpg";

const famousProducts = [
  { _id: "1", name: "Dress", image: product1, path: "/" },
  { _id: "2", name: "Handbag", image: product2, path: "/" },
  { _id: "3", name: "Jewelry", image: product3, path: "/" },
  { _id: "4", name: "Shoes", image: product4, path: "/" },
  { _id: "5", name: "Hat", image: product5, path: "/" },
  { _id: "6", name: "Scarf", image: product6, path: "/" },
  { _id: "7", name: "Watch", image: product7, path: "/" },
  { _id: "8", name: "Sunglasses", image: product8, path: "/" },
  { _id: "9", name: "Goods", image: product9, path: "/" },
  { _id: "10", name: "Village", image: product10, path: "/" },
];

const FamousProducts: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  console.log(currentIndex);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const isForward = direction === "forward";
        const isLastIndex = prevIndex === famousProducts.length - 1;
        const isFirstIndex = prevIndex === 0;

        if (isForward && isLastIndex) {
          setDirection("backward");
          prevButtonRef.current?.click();
          return prevIndex - 1;
        }

        if (!isForward && isFirstIndex) {
          setDirection("forward");
          nextButtonRef.current?.click();
          return prevIndex + 1;
        }

        isForward
          ? nextButtonRef.current?.click()
          : prevButtonRef.current?.click();
        return isForward ? prevIndex + 1 : prevIndex - 1;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [direction]);

  return (
    <div className="w-full lg:max-w-7xl mx-auto">
      <Carousel>
        <CarouselContent>
          {famousProducts.map(({ _id, name, image }) => (
            <CarouselItem
              key={_id}
              className="basis-full md:basis-1/2 lg:basis-1/3 p-4"
            >
              <Card className="w-full h-full">
                <CardContent className="p-0 relative w-full h-full">
                  <div className="relative min-w-96 h-96">
                    <Image
                      src={image}
                      alt={`${name} product`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                    {name}
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious ref={prevButtonRef} className="left-2" />
        <CarouselNext ref={nextButtonRef} className="right-2" />
      </Carousel>
    </div>
  );
};

export default FamousProducts;
