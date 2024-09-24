"use client";

import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import localStorageServices from "@/services/localStorageServices";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    localStorageServices.logOutService();
  };

  useEffect(() => {
    const accessToken = localStorageServices.getItemWithExpiry("accessToken");
    const userData = localStorageServices.getUserData();
    console.log(userData);
    if (!accessToken || !userData) {
      window.location.href = "/";
    }
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="text-sm breadcrumbs mb-4">
        <ul>
          <li>
            <Link className="my-1" href="/">
              <Button variant="secondary">Go To Home 🏠</Button>
            </Link>
          </li>
          <li>
            Hi👋 <span>MD.Kamrul Hasan</span>
          </li>
        </ul>
      </div>

      <h1 className="text-3xl font-bold mb-8">My Dashboard</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <Tabs
          defaultValue="account"
          className="w-full md:w-64 space-y-4"
          orientation="vertical"
        >
          <TabsList className="flex flex-col items-start h-full space-y-2 py-5">
            <TabsTrigger value="account" asChild>
              <Link href="/dashboard">Account Dashboard</Link>
            </TabsTrigger>

            <TabsTrigger value="orders" asChild>
              <Link href="/dashboard/my-orders">My Orders</Link>
            </TabsTrigger>
            <TabsTrigger value="addToCart" asChild>
              <Link href="/dashboard/add-to-cart">Add To Cart</Link>
            </TabsTrigger>
            <TabsTrigger value="wishlist" asChild>
              <Link href="/dashboard/wish-list">My Wishlist</Link>
            </TabsTrigger>
            <TabsTrigger value="logout" asChild>
              <Button
                className="w-full"
                onClick={() => handleLogout()}
                variant="destructive"
              >
                Logout
              </Button>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex-1 p-6 rounded-lg shadow lg:shadow-primary ">
          {children}
        </div>
      </div>
    </div>
  );
}
