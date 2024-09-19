"use client";

import React, { useState } from "react";
import useStore from "@/app/lib/store";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const PlaceOrder = () => {
  const { orderList, removeFromOrderList } = useStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleQuantityChange = (id: string, change: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) + change, 1),
    }));
  };

  const calculateTotal = () => {
    return orderList.reduce((total, product) => {
      const quantity = quantities[product._id] || 1;
      return total + parseFloat(product.price) * quantity;
    }, 0);
  };

  const handleSubmit = async () => {
    try {
      await axios.post("/api/orders", {
        orderList: orderList.map((product) => ({
          ...product,
          quantity: quantities[product._id] || 1,
        })),
        total: calculateTotal(),
        address,
        mobile,
        paymentMethod,
      });
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-28">
      <h1 className="text-3xl font-bold mb-8">Place Your Order</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {orderList.map((product) => {
                const quantity = quantities[product._id] || 1;
                const totalPrice = parseFloat(product.price) * quantity;
                return (
                  <div
                    key={product._id}
                    className="flex items-center justify-between py-4 border-b last:border-b-0"
                  >
                    <div className="flex-1">
                      <h2 className="font-semibold">{product.name}</h2>
                      <p className="text-sm text-gray-600">
                        Price: ${product.price}
                      </p>
                      <p className="text-sm font-medium">
                        Total: ${totalPrice.toFixed(2)}
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
          <Card>
            <CardHeader>
              <CardTitle>Total Amount</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                ${calculateTotal().toFixed(2)}
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
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
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Card Payment</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
          <Button className="w-full" size="lg" onClick={handleSubmit}>
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
