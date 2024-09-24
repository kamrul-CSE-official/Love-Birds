import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";
import envConfig from "@/config/envConfig";

// Components
import FamousProducts from "@/components/pageComponents/famoursProducts";
import BestSellsProducts from "@/components/pageComponents/bestSellsProducts";
import TestimonialCarousel from "@/components/pageComponents/testimonals";
import YouMayLike from "@/components/pageComponents/youMayLike";

// Dynamic imports
const ProductInfo = dynamic(
  () => import("@/components/pageComponents/productInfo"),
  { ssr: false }
);

// Category images
import categories1 from "@/assets/Handicraft-1.jpg";
import categories2 from "@/assets/Water-2.jpg";
import categories3 from "@/assets/Pendulum-3.jpg";
import categories4 from "@/assets/Hangings-4.jpg";
import categories5 from "@/assets/kitchen-5.jpg";
import Link from "next/link";
import HomePageBanner from "@/components/pageComponents/homePageBanner";

const categories = [
  { name: "Kitchen", image: categories1 },
  { name: "Home Decor", image: categories2 },
  { name: "Stationery", image: categories3 },
  { name: "Jewelry", image: categories4 },
];

export default async function Home() {
  let data = await fetch(`${envConfig.API.PRIMARY_API}/products/top-visited`, {
    cache: "no-store",
  });
  const famousProducts = await data.json();

  data = await fetch(`${envConfig.API.PRIMARY_API}/products/best-sellers`, {
    cache: "force-cache",
  });
  const bestSellsProducts = await data.json();

  data = await fetch(
    `${envConfig.API.PRIMARY_API}/products/66ed8906e563f3131c95c01f/related`,
    { cache: "force-cache" }
  );
  const youMayLike = await data.json();

  return (
    <div className="flex flex-col">
      {/* Full-height Banner */}
      <HomePageBanner />

      {/* Categories Section */}
      <div className="bg-secondary py-4 px-2 sm:px-4 mb-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-6 flex-wrap">
            {categories.map((category, index) => (
              <Link
                href={`/products?category=${category.name
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
                      className="rounded-full border-2 border-primary group-hover:scale-105 transform transition duration-150"
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
        <FamousProducts data={famousProducts} />

        {/* Best Sells Products */}
        <BestSellsProducts data={bestSellsProducts} />

        {/* Products Info */}
        <Suspense fallback={<div>Loading products info</div>}>
          <ProductInfo />
        </Suspense>

        {/* You May Like */}
        <YouMayLike data={youMayLike} />

        {/* Testimonial */}
        <TestimonialCarousel />
      </div>
    </div>
  );
}
