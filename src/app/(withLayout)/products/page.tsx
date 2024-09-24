"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import createAxiosInstance from "@/services/axiosInstance";
import Loading from "@/components/share/loading";
import ProductCard from "@/components/share/productCard";

// Fetcher function for API requests
const fetcher = (url: string) =>
  createAxiosInstance()
    .get(url)
    .then((res) => res.data);

const ProductsPage = () => {
  const searchParams = useSearchParams();

  // Local state to hold the search parameters
  const [filters, setFilters] = useState({
    name: searchParams.get("name") || "",
    category: searchParams.get("category") || "",
    maxPrice: searchParams.get("max_price") || "",
    minPrice: searchParams.get("min_price") || "",
    brand: searchParams.get("brand") || "",
    size: searchParams.get("size") || "",
    sort: searchParams.get("sort") || "",
    page: parseInt(searchParams.get("page") || "1", 10),
    quantity: parseInt(searchParams.get("quantity") || "12", 10),
  });

  // Listen to changes in search parameters and update state
  useEffect(() => {
    setFilters({
      name: searchParams.get("name") || "",
      category: searchParams.get("category") || "",
      maxPrice: searchParams.get("max_price") || "",
      minPrice: searchParams.get("min_price") || "",
      brand: searchParams.get("brand") || "",
      size: searchParams.get("size") || "",
      page: parseInt(searchParams.get("page") || "1", 10),
      quantity: parseInt(searchParams.get("quantity") || "12", 10),
      sort: searchParams.get("sort") || "",
    });
  }, [searchParams, searchParams.get("min")]);

  // Construct the API URL dynamically based on filters
  const apiUrl = `/products?category=${filters.category}&name=${filters.name}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&brand=${filters.brand}&size=${filters.size}&page=${filters.page}&quantity=${filters.quantity}`;

  // SWR hook to fetch data, re-fetches when `apiUrl` changes
  const { data, error, isLoading, mutate } = useSWR(apiUrl, fetcher);

  // Handle manual changes to category, name, or other filters and refetch data
  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    mutate(
      `/products?category=${filters.category}&name=${filters.name}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&brand=${filters.brand}&size=${filters.size}&page=${filters.page}&quantity=${filters.quantity}`
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Products in{" "}
        {!filters?.category || filters?.category == "null"
          ? "All Categories"
          : filters?.category}{" "}
        -{" "}
        {!filters?.name || filters?.name == "null"
          ? "All Products"
          : filters?.name}
      </h1>
      <div className="mb-2">
        <p>Category: {filters.category}</p>
        <p>
          Price: {filters.minPrice}{" "}
          {filters?.maxPrice && `- ${filters?.maxPrice}`}
        </p>
        <p>Brand: {filters.brand}</p>
        <p>Size: {filters.size}</p>
        <p>Page: {filters.page}</p>
        <p>Quantity: {filters.quantity}</p>
      </div>

      {/* Display Products */}
      <div>
        {data?.length > 0 ? (
          <div className="space-y-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {data.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p>No products found for the selected filters.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
