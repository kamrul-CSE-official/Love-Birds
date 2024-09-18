"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const ProductsPage = () => {
  const searchParams = useSearchParams();

  // Extract search parameters
  const name = searchParams.get("name");
  const category = searchParams.get("category");
  const price = searchParams.get("price");
  const brand = searchParams.get("brand");
  const size = searchParams.get("size");
  const page = searchParams.get("page");
  const quantity = searchParams.get("quantity");

  return (
    <div>
      <h1 className="text-xl">This is the product page for {name}</h1>
      <p>Category: {category}</p>
      <p>Price: {price}</p>
      <p>Brand: {brand}</p>
      <p>Size: {size}</p>
      <p>Page: {page}</p>
      <p>Quantity: {quantity}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam quas
        quod sint fugiat voluptates magni eos obcaecati? Quo dolorum odit
        impedit soluta, autem aperiam, id et veniam, recusandae libero alias.
      </p>
    </div>
  );
};

export default ProductsPage;
