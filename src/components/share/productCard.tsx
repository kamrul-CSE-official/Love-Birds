"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BiHeart, BiTrash } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
import Link from "next/link";
import useStore from "@/app/lib/store";
import { IProduct } from "@/types/product.type";
import { Minus, Plus } from "lucide-react";
import { Input } from "../ui/input";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const { addToCart, addToWishlist, removeFromCart, removeFromWishlist } =
    useStore();

  const handleAddToCart = (item: IProduct) => {
    addToCart(item);
  };

  const handleAddToWishList = (item: IProduct) => {
    addToWishlist(item);
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (product.from) {
    product.quantity = Number(quantity);
  }
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg cursor-pointer hover:scale-105 duration-150">
      <CardContent className="p-0">
        <div className="relative">
          {/* Wrap the image and name in the Link to redirect to product details */}
          <Link href={`/product/${product._id}`}>
            <Image
              src={product?.image}
              alt={product.name}
              className="w-full h-56 object-cover"
              width={300}
              height={300}
            />
          </Link>
          <div className="absolute top-2 right-2 z-30 flex flex-col gap-3 items-center">
            {product?.from === "addToCart" ? (
              <Button
                variant="destructive"
                size="icon"
                className="group text-xs font-extralight"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromCart(product._id);
                }}
              >
                <BiTrash className="h-6 w-6 text-white group-hover:text-red-600" />
                {/* You can add text if needed */}
              </Button>
            ) : (
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
            )}

            {product?.from === "wishlist" ? (
              <Button
                variant="destructive"
                size="icon"
                className="group text-xs font-extralight"
                onClick={(e) => {
                  e.preventDefault();
                  removeFromWishlist(product._id);
                }}
              >
                <BiTrash className="h-6 w-6 text-white group-hover:text-red-600" />
              </Button>
            ) : (
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
            )}
          </div>
        </div>
        <Link href={`/product/${product._id}`}>
          <div className="p-5">
            <p className="text-xs text-gray-500 mb-1">{product.category}</p>
            <h3 className="text-sm font-medium line-clamp-2 mb-2">
              {product.name}
            </h3>
            <p className="text-lg font-semibold">BDT. {product.price}</p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
