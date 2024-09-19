"use client";

import * as React from "react";
import Image from "next/image";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "@/assets/love-bards logo.png";
import Link from "next/link";
import ThemeToggle from "./themeToggle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MenuSquareIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useStore from "@/app/lib/store";

// Navigation items and product types as constants
const navItems = [
  { _id: "1", name: "BAGS", path: "/products/BAGS" },
  { _id: "2", name: "BASKETS", path: "/products/BASKETS" },
  { _id: "3", name: "HOME DECOR", path: "/products/HOME_DECOR" },
  { _id: "4", name: "KITCHEN & DINING", path: "/products/KITCHEN_DINING" },
  { _id: "5", name: "BEST SELLES", path: "/best-selles" },
  { _id: "6", name: "ACCESSORIES", path: "/accessories" },
  { _id: "7", name: "ABOUT US", path: "/about-us" },
];

const productsTypes = [
  { _id: "1", name: "BAGS", path: "/products/BAGS" },
  { _id: "2", name: "BASKETS", path: "/products/BASKETS" },
  { _id: "3", name: "HOME DECOR", path: "/products/HOME_DECOR" },
  { _id: "4", name: "KITCHEN & DINING", path: "/products/KITCHEN_DINING" },
  { _id: "6", name: "ACCESSORIES", path: "/accessories" },
];

export default function Navbar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const router = useRouter();
  const { products, wishlist } = useStore();

  const handleSearch = () => {
    let queryParams = "";

    // Construct query based on searchValue and category
    if (searchValue && category) {
      queryParams = new URLSearchParams({
        name: searchValue,
        category,
      }).toString();
    } else if (searchValue && !category) {
      queryParams = new URLSearchParams({
        name: searchValue,
      }).toString();
    } else if (!searchValue && category) {
      queryParams = new URLSearchParams({
        category,
      }).toString();
    }

    // Only append query parameters if they exist
    const searchPath = queryParams ? `/products?${queryParams}` : "/products";
    router.push(searchPath);
  };

  return (
    <nav className="flex flex-col w-full">
      {/* Top section */}
      <div className="bg-primary text-white py-2 sm:py-4 px-2 sm:px-4">
        <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link className="order-1 sm:order-2 lg:order-1" href="/">
            <Image
              className="rounded-full h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]"
              src={logo}
              alt="logo"
              width={100}
              height={100}
            />
          </Link>

          {/* Search for desktop */}
          <div className="hidden lg:flex items-center order-2 flex-grow max-w-xl mx-4">
            <Input
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="What are you looking for?"
              className="bg-transparent border-white text-white placeholder-white flex-grow"
            />
            <Button onClick={handleSearch} variant="secondary" className="ml-2">
              <FaSearch />
            </Button>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4 order-2 sm:order-3">
            <Link href="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:inline-flex"
              >
                <FaUser className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/wish-list">
              <Button variant="ghost" size="icon" className="relative">
                <FaHeart className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-white text-primary rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              </Button>
            </Link>
            <Link href="/add-to-cart">
              <Button variant="ghost" size="icon" className="relative">
                <FaShoppingCart className="h-5 w-5" />
                <span className="absolute top-0 right-0 bg-white text-primary rounded-full h-4 w-4 flex items-center justify-center text-xs">
                  {products.length}
                </span>
              </Button>
            </Link>
            <ThemeToggle />
            {/* Dropdown Menu for mobile and tablet */}
            <div className="block lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <MenuSquareIcon className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {navItems.map((item) => (
                    <DropdownMenuItem key={item._id} asChild>
                      <Link
                        href={item.path}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search for mobile */}
          <div className="lg:hidden order-3 w-full mt-2 sm:w-auto sm:mt-0">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-black dark:text-white"
                >
                  <FaSearch className="mr-2" /> Search
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Search</DialogTitle>
                  <DialogDescription>
                    Search through our products and categories.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Type your search keywords"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                  <Select onValueChange={(value) => setCategory(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700">
                      {productsTypes.map((type) => (
                        <SelectItem key={type._id} value={type.name}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button className="w-full" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Navigation bar for large screens */}
      <div className="bg-secondary py-2 px-4 border-t border-[#A0522D] hidden lg:block">
        <ul className="flex flex-wrap justify-center space-x-4 xl:space-x-8 max-w-7xl mx-auto text-sm">
          {navItems.map((item) => (
            <li key={item._id} className="hover:underline cursor-pointer">
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
