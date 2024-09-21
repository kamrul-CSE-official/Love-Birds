"use client";

import React from "react";
import useStore from "@/app/lib/store";
import ProductCard from "@/components/share/productCard";
import Lottie from "lottie-react";
import emptyWishlist from "@/assets/empty.json";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heart, Package, CreditCard, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const WishListPage = () => {
  const router = useRouter();
  const { wishlist, addToOrderList } = useStore();

  const totalPrice = wishlist.reduce((acc, product) => acc + product.price, 0);
  const totalProducts = wishlist.length;

  const handlePlaceOrder = () => {
    addToOrderList(wishlist);
    router.push("/place-order");
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <Heart className="mr-2 text-red-500" /> Your Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent>
            <Lottie
              className="w-1/3 mx-auto my-8"
              animationData={emptyWishlist}
            />
            <p className="text-xl font-medium text-gray-700 mt-4">
              Your wishlist is empty. Add some items to make it happy!
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild variant="outline">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {wishlist.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Wishlist Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <Package className="mr-2" size={20} />
                    Total Products
                  </span>
                  <span className="font-semibold">{totalProducts}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center">
                    <CreditCard className="mr-2" size={20} />
                    Total Value
                  </span>
                  <span className="font-semibold">
                    BDT. {totalPrice.toFixed(2)}
                  </span>
                </div>
                <Separator />
                <p className="text-sm text-gray-500">
                  These items are saved for your future purchase. Prices and
                  availability may change.
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handlePlaceOrder()} className="w-full">
                  <ShoppingCart className="mr-2" size={20} />
                  Place Order
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishListPage;
