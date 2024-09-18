import Image from "next/image";
import { Star, Truck, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import productImg from "@/assets/p-11.jpg";
import YouMayLike from "@/components/pageComponents/youMayLike";

export default function ProductPage({ params }: { params: { _id: string } }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <Image
            src={productImg.src}
            alt="Handmade Sabai Grass Roti Box"
            width={500}
            height={500}
            className="w-full h-auto"
          />
          <div className="flex mt-4 space-x-2">
            {[1, 2, 3].map((i) => (
              <Image
                key={i}
                src={productImg.src}
                alt={`Thumbnail ${i}`}
                width={80}
                height={80}
                className="w-20 h-20 object-cover cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Handmade Sabai Grass Roti Box {params?._id}
          </h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              (12 customer reviews)
            </span>
          </div>
          <p className="text-gray-600 mb-4">
            Handmade Sabai Grass Roti Box is a traditional Indian storage
            container used to store Indian flatbread (Roti or Chapati). This box
            keeps your bread fresh and warm for a longer time. The natural grass
            used in making this box has antibacterial properties that help in
            keeping the food fresh.
          </p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">₹180</span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              ₹200
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <Input type="number" defaultValue="1" className="w-20" />
            <Button>Add to Cart</Button>
            <Button variant="secondary">Buy Now</Button>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Free Delivery
            </div>
            <div className="flex items-center">
              <RotateCcw className="w-5 h-5 mr-2" />
              Return Policy
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">DIMENSIONS</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Height: 4 inches</li>
              <li>Diameter: 8 inches</li>
              <li>Weight: 200 grams</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">MATERIAL</h3>
            <ul className="list-disc list-inside text-gray-600">
              <li>Sabai Grass</li>
              <li>Natural Dyes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <Accordion type="single" collapsible className="mt-12">
        <AccordionItem value="item-1">
          <AccordionTrigger>Other Information</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Related Products */}
      <div className="mt-12">
        <YouMayLike />
      </div>
    </div>
  );
}
