"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";


export const categories = ["Kitchen", "Home Decor", "Stationery", "Jewelry"];
export const brands = [
  "CraftyHands",
  "WeaveWonders",
  "ArtisanClay",
  "LeatherCraft",
  "NatureJewels",
];

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const route = useRouter();

  const searchName = searchParams.get("name");
  const searchCategory = searchParams.get("category");
  const searchBrand = searchParams.get("brand");
  const searchMaxPrice = searchParams.get("max_price");
  const searchMinPrice = searchParams.get("min_price");
  const searchPage = searchParams.get("page") || "1";
  const searchQuantity = searchParams.get("quantity") || "12";
  const searchSort = searchParams.get("sort");

  const [name, setName] = useState<string | null>(searchName);
  const [category, setCategory] = useState<string | null>(categories[0]);
  const [brand, setBrand] = useState<string | null>(brands[0]);
  const [maxPrice, setMaxPrice] = useState<string | null>(searchMaxPrice);
  const [minPrice, setMinPrice] = useState<string | null>(searchMinPrice);
  const [page, setPage] = useState<string | null>(searchPage);
  const [quantity, setQuantity] = useState<string | null>(searchQuantity);
  const [sort, setSort] = useState<string | null>(searchSort);

  // Update URL dynamically when filter values change
  useEffect(() => {
    const updatedUrl = `/products?quantity=${quantity}&page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}&category=${category}&name=${name}&sort=${sort}`;
    route.push(updatedUrl);
  }, [name, category, brand, maxPrice, minPrice, page, quantity, sort, route]);

  return (
    <div className="flex h-screen overflow-hidden mt-[7rem]">
      {/* Sidebar for larger screens */}
      <aside className="hidden w-64 bg-background border-r p-4 lg:block overflow-y-auto">
        <SidebarContent
          category={category}
          setCategory={setCategory}
          brand={brand}
          setBrand={setBrand}
          minPrice={minPrice}
          setMinPrice={setMinPrice}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          page={page}
          setPage={setPage}
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto p-4">
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <div className="flex items-center gap-2">
            {/* Mobile sidebar */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <MenuIcon className="h-6 w-6" />
                  <span className="sr-only">Toggle sidebar</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0 mt-24">
                <SidebarContent
                  category={category}
                  setCategory={setCategory}
                  brand={brand}
                  setBrand={setBrand}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  page={page}
                  setPage={setPage}
                />
              </SheetContent>
            </Sheet>
            <h3 className="text-sm lg:text-lg font-bold lg:font-extrabold whitespace-nowrap">
              51,176 ITEMS FOUND
            </h3>
          </div>
          <Select onValueChange={(value) => setSort(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort Options</SelectLabel>
                <SelectItem value="price-high-to-low">
                  Price (High to Low)
                </SelectItem>
                <SelectItem value="price-low-to-high">
                  Price (Low to High)
                </SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {children}
      </main>
    </div>
  );
}

// Sidebar content for filters with input fields and handlers
function SidebarContent({
  category,
  setCategory,
  brand,
  setBrand,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  page,
  setPage,
}: {
  category: string | null;
  setCategory: (value: string | null) => void;
  brand: string | null;
  setBrand: (value: string | null) => void;
  minPrice: string | null;
  setMinPrice: (value: string | null) => void;
  maxPrice: string | null;
  setMaxPrice: (value: string | null) => void;
  page: string | null;
  setPage: (value: string | null) => void;
}) {
  return (
    <nav className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Refine By</h3>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Category</h4>
          {categories.map((cat: string, i: number) => (
            <FilterCheckbox
              key={i}
              label={cat}
              value={cat}
              checked={category === cat}
              onChange={() => setCategory(cat)}
            />
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Price Range</h4>
        <div className="flex items-center space-x-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice ?? ""}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-20"
          />
          <span>to</span>
          <Input
            type="number"
            placeholder="Max"
            value={maxPrice ?? ""}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-20"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Brand</h4>
        {brands?.map((brand: string, i: number) => (
          <FilterCheckbox
            key={i}
            label={brand}
            value={brand}
            checked={brand === brand}
            onChange={() => setBrand(brand)}
          />
        ))}
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Pagination</h4>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              setPage(Number(page) > 1 ? (Number(page) - 1).toString() : "1")
            }
          >
            <BiLeftArrow />
          </Button>
          <Button>{page}</Button>
          <Button
            variant="secondary"
            onClick={() => setPage((Number(page) + 1).toString())}
          >
            <BiRightArrow />
          </Button>
        </div>
      </div>
    </nav>
  );
}

function FilterCheckbox({
  label,
  value,
  checked,
  onChange,
}: {
  label: string;
  value: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center space-x-2">
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        id={value}
        aria-label={label}
      />
      <span>{label}</span>
    </label>
  );
}
