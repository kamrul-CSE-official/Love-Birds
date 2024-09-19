"use client";

import useStore from "@/app/lib/store";
import ProductCard from "@/components/share/productCard";
import React from "react";
import emptyAddToCart from "@/assets/empty.json"; // Corrected the variable name
import Lottie from "lottie-react";

const WishListPage = () => {
  const { wishlist } = useStore();

  return (
    <div className="max-w-7xl mx-auto">
      <h3 className="text-xl font-extrabold my-5">Wish list💗</h3>{" "}
      {/* Fixed typo here */}
      {wishlist.length === 0 ? (
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Lottie className="w-1/3 my-8 p-5" animationData={emptyAddToCart} />
          <p className="text-lg font-medium text-gray-700">
            Your cart is empty. Add some items to make it happy!
          </p>{" "}
          {/* Enhanced the message */}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-16">
          {wishlist?.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishListPage;
