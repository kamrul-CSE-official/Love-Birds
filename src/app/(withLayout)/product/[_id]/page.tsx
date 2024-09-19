"use client";

import Image from "next/image";
import { Star, Truck, RotateCcw, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

import productImg from "@/assets/p-11.jpg";
import YouMayLike from "@/components/pageComponents/youMayLike";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export default function ProductPage({ params }: { params: { _id: string } }) {
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const reviews = [
    {
      author: "Nicolas Cage",
      date: "3 Days ago",
      rating: 5,
      content:
        "Greate Product\nThere are many variations of passages of Lorem ipsum available, but the majority have suffered alteration in some form, by injected humour",
    },
    {
      author: "Sr.Robert Downey",
      date: "5 Days ago",
      rating: 5,
      content:
        "The best product in Market\nContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    },
  ];

  const ratingCounts = [70, 15, 10, 3, 2];

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

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

          {/* Quantity Input and Buttons */}
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center">
              <Button onClick={handleDecrease} variant="secondary">
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                readOnly
                className="w-20 text-center mx-2"
              />
              <Button onClick={handleIncrease} variant="secondary">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
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

      {/* Additional Product Info (Tabs) */}
      <div className="mt-12">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">DESCRIPTION</TabsTrigger>
            <TabsTrigger value="reviews">REVIEWS</TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Product Overview</h2>
              <p className="text-gray-600">
                The Handmade Sabai Grass Roti Box is a traditional storage
                solution for keeping Indian flatbreads, such as rotis and
                chapatis, fresh and warm. Crafted from natural Sabai grass, this
                eco-friendly container is not only practical but also stylish.
                Its breathable, antibacterial properties help maintain the
                quality of the food inside, ensuring freshness for longer
                periods.
              </p>

              <h3 className="text-lg font-semibold">Key Features:</h3>
              <ul className="list-disc ml-5 space-y-1 text-gray-600">
                <li>Handmade from sustainable Sabai grass</li>
                <li>Eco-friendly and biodegradable</li>
                <li>Antibacterial properties to keep food fresh</li>
                <li>Retains warmth for longer durations</li>
                <li>Compact and lightweight design for easy storage</li>
              </ul>

              <h3 className="text-lg font-semibold">How to Use:</h3>
              <p className="text-gray-600">
                To use the Sabai Grass Roti Box, simply place freshly made rotis
                or chapatis inside and close the lid. The natural material helps
                in retaining heat, keeping your bread warm for several hours.
                You can also use it to store other types of flatbreads or baked
                goods.
              </p>

              <h3 className="text-lg font-semibold">Care Instructions:</h3>
              <p className="text-gray-600">
                To clean, gently wipe with a damp cloth. Avoid using harsh
                chemicals or soaking the box in water as this can damage the
                natural fibers.
              </p>

              <h3 className="text-lg font-semibold">
                Why Choose This Product?
              </h3>
              <p className="text-gray-600">
                This product offers a perfect balance of tradition and modern
                convenience. Its natural antibacterial properties make it a
                hygienic option for food storage, and its handmade, eco-friendly
                construction supports sustainability. Ideal for those who
                appreciate artisanal products with functional benefits.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold">4.8</div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">Product Rating</div>
                </div>
              </div>

              <div className="space-y-2">
                {ratingCounts.map((count, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-12 text-sm text-gray-500">
                      {5 - index} Star
                    </div>
                    <Progress value={count} className="w-full h-2" />
                    <div className="w-12 text-sm text-gray-500 text-right">
                      {count}%
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar>
                        <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center">
                          {review.author[0]}
                        </div>
                      </Avatar>
                      <div>
                        <div className="font-semibold">{review.author}</div>
                        <div className="text-sm text-gray-500">
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <div className="flex text-yellow-400 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 whitespace-pre-line">
                      {review.content}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2">What is it like to Product?</div>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 cursor-pointer ${
                            star <= rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                          onClick={() => setRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="review-title" className="block mb-2">
                      Review Title
                    </label>
                    <Input id="review-title" placeholder="Great Products" />
                  </div>
                  <div>
                    <label htmlFor="review-content" className="block mb-2">
                      Review Content
                    </label>
                    <Textarea
                      id="review-content"
                      placeholder="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button>Submit Review</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Additional Information Accordion */}
      <Accordion type="single" collapsible className="mt-12">
        <AccordionItem value="item-1">
          <AccordionTrigger>Other Information-1</AccordionTrigger>
          <AccordionContent>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Other Information-2</AccordionTrigger>
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
