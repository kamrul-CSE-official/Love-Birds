"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useStore from "@/app/lib/store";
import ProductCard from "@/components/share/productCard";
import Lottie from "lottie-react";
import emptyAddToCart from "@/assets/empty.json";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Package, CreditCard } from "lucide-react";

const AddToCartPage = () => {
  const { products, addToOrderList } = useStore();
  const router = useRouter();

  const totalPrice = products.reduce(
    (acc, product) => acc + parseFloat(product.price),
    0
  );
  const totalProducts = products.length;

  const handlePlaceOrder = () => {
    addToOrderList(products);
    router.push("/place-order");
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-32">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {products.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent>
            <Lottie
              className="w-1/3 mx-auto my-8"
              animationData={emptyAddToCart}
            />
            <p className="text-xl font-medium text-gray-700 mt-4">
              Your cart is empty. Add some items to make it happy!
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={() => router.push("/")} variant="outline">
              Continue Shopping
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Cart Summary</CardTitle>
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
                    Total Price
                  </span>
                  <span className="font-semibold">
                    BDT. {totalPrice.toFixed(2)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Grand Total</span>
                  <span>BDT. {totalPrice.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handlePlaceOrder} className="w-full">
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

export default AddToCartPage;
