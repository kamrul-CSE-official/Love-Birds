"use client";

import React, { useState } from "react";
import useStore from "@/app/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import localStorageServices from "@/services/localStorageServices";
import createAxiosInstance from "@/services/axiosInstance";
import clsx from "clsx";

interface OrderFormData {
  address: string;
  mobile: string;
  paymentMethod: "Cash on Delivery" | "Card Payment";
}

interface Product {
  _id: string;
  name: string;
  price: number;
}

const PlaceOrder = () => {
  const { orderList, removeFromOrderList } = useStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OrderFormData>({
    defaultValues: {
      paymentMethod: "Cash on Delivery",
    },
  });

  const calculateTotal = () => {
    return orderList.reduce((total, product) => {
      const quantity = quantities[product._id] || 1;
      return total + product.price * quantity;
    }, 0);
  };

  const onSubmit = async (data: OrderFormData) => {
    try {
      const isLoggedIn = localStorageServices.getUserData();
      if (!isLoggedIn) {
        router.push("/auth");
        return;
      }

      
      const orderData = {
        products: orderList
          .filter((product) => quantities[product._id] > 0)
          .map((product) => ({
            product: product?._id,
            quantity: quantities[product._id] || 1,
          })),
        totalAmount: calculateTotal(),
        address: data.address,
        mobile: data.mobile,
        paymentWith: data.paymentMethod,
        user: isLoggedIn?.userId,
      };
      console.log(orderData);
      await createAxiosInstance().post("/orders", orderData);
      toast.success("Order placed successfully!");
      router.push("/dashboard/my-orders");
    } catch (error:any) {
      console.error("Error placing order:", error?.response?.data || error?.message || error);
      toast.error("Failed to place order");
    }
  };

  const handleQuantityChange = (id: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1),
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-28">
      <h1 className="text-3xl font-bold mb-8">Place Your Order</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ৳{calculateTotal().toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {orderList.map((product: Product) => {
                const quantity = quantities[product._id] || 1;
                const totalPrice = product.price * quantity;
                return (
                  <div
                    key={product._id}
                    className="flex items-center justify-between py-4 border-b last:border-b-0"
                  >
                    <div className="flex-1">
                      <h2 className="font-semibold">{product.name}</h2>
                      <p className="text-sm text-gray-600">
                        Price: ৳{product.price}
                      </p>
                      <p className="text-sm font-medium">
                        Total: ৳{totalPrice.toFixed(2)}
                      </p>
                      <p className="text-sm font-medium">
                        Quantity: {quantity}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product._id, -1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleQuantityChange(product._id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeFromOrderList(product._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
              <CardHeader>
                <CardTitle>Delivery Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    {...register("address", { required: true })}
                  />
                  {errors.address && (
                    <p className="text-red-500">Address is required</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter your mobile number"
                    {...register("mobile", { required: true })}
                  />
                  {errors.mobile && (
                    <p className="text-red-500">Mobile number is required</p>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Cash on Delivery" id="cash" />
                        <Label htmlFor="cash">Cash on Delivery</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Card Payment" id="card" />
                        <Label htmlFor="card">Card Payment</Label>
                      </div>
                    </RadioGroup>
                  )}
                />
              </CardContent>
            </Card>
            <Button className="w-full" size="lg" type="submit">
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
