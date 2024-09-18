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
  const [category, setCategory] = useState<string | null>(searchCategory);
  const [brand, setBrand] = useState<string | null>(searchBrand);
  const [maxPrice, setMaxPrice] = useState<string | null>(searchMaxPrice);
  const [minPrice, setMinPrice] = useState<string | null>(searchMinPrice);
  const [page, setPage] = useState<string | null>(searchPage);
  const [quantity, setQuantity] = useState<string | null>(searchQuantity);
  const [sort, setSort] = useState<string | null>(searchSort);

  useEffect(() => {
    if (searchName) {
      setName(searchName);
    } else if (searchPage) {
      setPage(searchPage);
    } else if (searchQuantity) {
      setQuantity(searchQuantity);
    }
  }, []);

  const [url, setUrl] = useState<string>(
    `/products?quantity=${quantity}&page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}&category=${category}&name=${name}&sort=${sort}`
  );

  useEffect(() => {
    setUrl(
      `/products?quantity=${quantity}&page=${page}&minPrice=${minPrice}&maxPrice=${maxPrice}&brand=${brand}&category=${category}&name=${name}&sort=${sort}`
    );
  }, [
    name,
    category,
    brand,
    maxPrice,
    minPrice,
    page,
    quantity,
    searchName,
    searchPage,
    searchQuantity,
    route,
  ]);

  useEffect(() => {
    route.push(url);
  }, [url]);

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
}: {
  category: string | null;
  setCategory: (value: string | null) => void;
  brand: string | null;
  setBrand: (value: string | null) => void;
  minPrice: string | null;
  setMinPrice: (value: string | null) => void;
  maxPrice: string | null;
  setMaxPrice: (value: string | null) => void;
}) {
  return (
    <nav className="space-y-6">
      <div>
        <h3 className="font-semibold mb-2">Refine By</h3>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Category</h4>
          <FilterCheckbox
            label="DECORATIVE & SPORTS ITEMS (1007)"
            value="decorative"
            checked={category === "decorative"}
            onChange={() => setCategory("decorative")}
          />
          <FilterCheckbox
            label="SPORTS & GIFTS (194)"
            value="sports"
            checked={category === "sports"}
            onChange={() => setCategory("sports")}
          />
          <FilterCheckbox
            label="LEAF CUPS & SAUCERS (32)"
            value="leaf_cups"
            checked={category === "leaf_cups"}
            onChange={() => setCategory("leaf_cups")}
          />
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
          <Button size="sm" onClick={() => console.log("Filter applied")}>
            Go
          </Button>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Brand</h4>
        <FilterCheckbox
          label="Brand A"
          value="brand_a"
          checked={brand === "brand_a"}
          onChange={() => setBrand("brand_a")}
        />
        <FilterCheckbox
          label="Brand B"
          value="brand_b"
          checked={brand === "brand_b"}
          onChange={() => setBrand("brand_b")}
        />
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
    <div className="flex items-center space-x-2">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <label>{label}</label>
    </div>
  );
}
