import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import FamousProducts from "@/components/pageComponents/famoursProducts";
import BestSellsProducts from "@/components/pageComponents/bestSellsProducts";
import TestimonialCarousel from "@/components/pageComponents/testimonals";
import YouMayLike from "@/components/pageComponents/youMayLike";

const HomePageBanner = React.lazy(
  () => import("@/components/pageComponents/homePageBanner")
);
const ProductInfo = React.lazy(
  () => import("@/components/pageComponents/productInfo")
);

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

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <Suspense fallback={<div>Loading banner...</div>}>
        <HomePageBanner />
      </Suspense>

      {/* Categories Section */}
      <div className="bg-secondary py-4 px-2 sm:px-4 mb-5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <Link
                href={`/category/${category.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                key={index}
              >
                <div className="flex flex-col items-center group">
                  <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 mb-2">
                    <Image
                      src={category.image}
                      alt={category.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-full border-2 border-primary group-hover:scale-1 transform transition duration-150"
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

      <div className="space-y-8 mb-10">
        {/* Famous Products */}
        <FamousProducts />

        {/* Best Sells Products */}
        <BestSellsProducts />

        {/* Products Info */}
        <Suspense fallback={<div>Loading products info</div>}>
          <ProductInfo />
        </Suspense>

        {/* You May Like */}
        <YouMayLike />

        {/* Testimonial */}
        <TestimonialCarousel />
      </div>
    </div>
  );
}
