import { Button } from "@/components/ui/button";

import product1 from "@/assets/p-1.jpg";
import product2 from "@/assets/p-2.jpg";
import product3 from "@/assets/p-3.jpg";
import product4 from "@/assets/p-4.jpg";
import product5 from "@/assets/p-5.jpg";
import product6 from "@/assets/p-6.jpg";
import product7 from "@/assets/p-7.jpg";
import product8 from "@/assets/p-8.jpg";
import product9 from "@/assets/p-9.jpg";
import product10 from "@/assets/p-10.jpg";
import ProductCard from "../share/productCard";
import { IProduct } from "@/types/product.type";

const products: IProduct[] = [
  {
    _id: 1,
    name: "The 'Old Fashioned' Hand Glazed Studio Pottery Ceramic Oil Bottle (1000 ML)",
    category: "BRASS PRODUCT",
    price: "BDT. 799",
    image: product1.src,
  },
  {
    _id: 2,
    name: "Elegant Brass Cutlery Set (24 Pcs)",
    category: "BRASS PRODUCT",
    price: "BDT. 1,599",
    image: product2.src,
  },
  {
    _id: 3,
    name: "Handcrafted Brass Oil Lamp (Medium)",
    category: "BRASS PRODUCT",
    price: "BDT. 1,099",
    image: product3.src,
  },
  {
    _id: 4,
    name: "Vintage Brass Vase (Antique Finish)",
    category: "BRASS PRODUCT",
    price: "BDT. 899",
    image: product4.src,
  },
  {
    _id: 5,
    name: "Modern Brass Candle Holder Set (Set of 3)",
    category: "BRASS PRODUCT",
    price: "BDT. 1,299",
    image: product5.src,
  },
  {
    _id: 6,
    name: "Artisanal Brass Serving Tray (Handcrafted)",
    category: "BRASS PRODUCT",
    price: "BDT. 2,499",
    image: product6.src,
  },
  {
    _id: 7,
    name: "The Rustic Brass Tea Kettle (1.5L)",
    category: "BRASS PRODUCT",
    price: "BDT. 1,799",
    image: product7.src,
  },
  {
    _id: 8,
    name: "Brass Spice Box with Lid (6 Compartments)",
    category: "BRASS PRODUCT",
    price: "BDT. 1,199",
    image: product8.src,
  },
  {
    _id: 9,
    name: "Modern Brass Candle Holder",
    category: "BRASS PRODUCT",
    price: "BDT. 1,299",
    image: product9.src,
  },
  {
    _id: 10,
    name: "Handcrafted Brass",
    category: "BRASS PRODUCT",
    price: "BDT. 1,099",
    image: product10.src,
  },
];

export default function YouMayLike() {
  return (
    <div className="container mx-auto px-4 py-8 bg-secondary rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm">Choose the best products</p>
          <h1 className="text-3xl font-semibold">You May Like</h1>
        </div>
        <Button variant="outline" size="sm">
          SEE ALL
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.reverse().map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
