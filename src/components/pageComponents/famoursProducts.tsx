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
import Link from "next/link";
import { IProduct } from "@/types/product.type";

interface FamousProductsProps {
  data: { data: IProduct[] };
}

const FamousProducts = ({ data }: FamousProductsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const isForward = direction === "forward";
        const isLastIndex = prevIndex === data.data.length - 1;
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
  }, [direction, data.data.length]);

  return (
    <div className="w-full lg:max-w-7xl mx-auto">
      <Carousel>
        <CarouselContent>
          {data?.data?.map((item) => (
            <CarouselItem
              key={item._id}
              className="basis-full md:basis-1/2 lg:basis-1/3 p-4"
            >
              <Link href={`/product/${item._id}`}>
                <Card className="w-full h-full">
                  <CardContent className="p-0 relative w-full h-full">
                    <div className="relative min-w-96 h-96">
                      <Image
                        src={item.images[0]}
                        alt={`${item.name} product`}
                        fill // Updated prop for next/image to use "fill"
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center">
                      {item.name}
                    </div>
                  </CardContent>
                </Card>
              </Link>
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
