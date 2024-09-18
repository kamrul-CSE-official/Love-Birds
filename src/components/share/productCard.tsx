"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BiHeart } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
import { IProduct } from "@/types/product.type";
import Link from "next/link";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);
  const [wishList, setWishList] = useState<IProduct[]>([]);

  const handleAddToCart = (item: IProduct) => {
    setCartItems((prevItems) => [...prevItems, item]);
    console.log(cartItems);
  };

  const handleAddToWishList = (item: IProduct) => {
    setWishList((prevItems) => [...prevItems, item]);
    console.log(wishList);
  };

  console.log(cartItems, wishList);

  return (
    <Card className="overflow-hidden rounded-lg shadow-lg cursor-pointer hover:scale-105 duration-150">
      <CardContent className="p-0">
        <div className="relative">
          {/* Wrap the image and name in the Link to redirect to product details */}
          <Link href={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
              width={300}
              height={300}
            />
          </Link>
          <div className="absolute top-2 right-2 z-30 flex flex-col gap-3 items-center">
            <Button
              variant="secondary"
              size="icon"
              className="group"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(product);
              }}
            >
              <TiShoppingCart className="h-6 w-6 text-white group-hover:text-blue-600" />
            </Button>

            <Button
              variant="default"
              size="icon"
              className="group hover:bg-transparent hover:border-2"
              onClick={(e) => {
                e.preventDefault();
                handleAddToWishList(product);
              }}
            >
              <BiHeart className="h-6 w-6 text-white group-hover:text-primary" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-500 mb-1">{product.category}</p>
          {/* Wrap only the product name in the Link to product details */}
          <Link href={`/product-details/${product._id}`}>
            <h3 className="text-sm font-medium line-clamp-2 mb-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-lg font-semibold">{product.price}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
