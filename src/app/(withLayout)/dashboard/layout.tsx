import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <TabsList className="flex flex-col items-start h-full space-y-2">
            <TabsTrigger value="account" asChild>
              <Link href="/dashboard">Account Dashboard</Link>
            </TabsTrigger>
            <TabsTrigger value="information" asChild>
              <Link href="/dashboard/information">Account Information</Link>
            </TabsTrigger>
            <TabsTrigger value="address" asChild>
              <Link href="/dashboard/address">Address Book</Link>
            </TabsTrigger>
            <TabsTrigger value="orders" asChild>
              <Link href="/dashboard/orders">My Orders</Link>
            </TabsTrigger>
            <TabsTrigger value="addToCart" asChild>
              <Link href="/dashboard/add-to-cart">Add To Cart</Link>
            </TabsTrigger>
            <TabsTrigger value="wishlist" asChild>
              <Link href="/dashboard/wish-list">My Wishlist</Link>
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
