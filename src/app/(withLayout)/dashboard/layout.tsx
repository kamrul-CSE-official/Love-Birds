"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ShoppingBag, Heart, LogOut, User } from "lucide-react";
import localStorageServices, {
  DecodedToken,
} from "@/services/localStorageServices";
import { IUser } from "@/types/user.type";
import userImg from "@/assets/boy.png";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userData, setUserData] = useState<IUser | DecodedToken | null>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorageServices.getItemWithExpiry("accessToken");
    const storedUserData = localStorageServices.getUserData();

    if (!accessToken || !storedUserData) {
      router.push("/");
    } else {
      setUserData(storedUserData);
    }
  }, [router]);

  const handleLogout = () => {
    localStorageServices.logOutService();
    router.push("/");
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16 md:mt-24">
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`${userImg}`} alt={userData.name} />
                <AvatarFallback>{userData.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">
                  Welcome, {userData.name}! 👋
                </h2>
                <p className="text-gray-500">{userData.email}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Link href="/" passHref>
                <Button variant="outline">
                  <Home className="mr-2 h-4 w-4" /> Home
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="destructive">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-8">
        <Card className="lg:w-64">
          <CardContent className="p-0">
            <Tabs
              defaultValue="account"
              className="w-full"
              orientation="vertical"
            >
              <TabsList className="flex flex-col items-stretch h-full space-y-1">
                <TabsTrigger value="account" className="justify-start" asChild>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-4 py-2"
                  >
                    <User className="mr-2 h-4 w-4" /> Account Dashboard
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="orders" className="justify-start" asChild>
                  <Link
                    href="/dashboard/my-orders"
                    className="flex items-center px-4 py-2"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" /> My Orders
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="cart" className="justify-start" asChild>
                  <Link
                    href="/dashboard/add-to-cart"
                    className="flex items-center px-4 py-2"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" /> Shopping Cart
                  </Link>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="justify-start" asChild>
                  <Link
                    href="/dashboard/wish-list"
                    className="flex items-center px-4 py-2"
                  >
                    <Heart className="mr-2 h-4 w-4" /> My Wishlist
                  </Link>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
