"use client";

import { Button } from "@/components/ui/button";

import ProductCard from "../share/productCard";
import Link from "next/link";
import { IProduct } from "@/types/product.type";

interface BestSellsProductsProps {
  data: { data: IProduct[] };
}
export default function BestSellsProducts({ data }: BestSellsProductsProps) {
  return (
    <div className="container mx-auto px-4 py-8 bg-secondary rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm">Best-selling products</p>
          <h1 className="text-3xl font-semibold">Best Sellers</h1>
        </div>
        <Link href="/products">
          <Button variant="outline" size="sm">
            SEE ALL
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {data?.data?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
