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
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

import productImg from "@/assets/p-11.jpg";
import YouMayLike from "@/components/pageComponents/youMayLike";
import useStore from "@/app/lib/store";
import createAxiosInstance from "@/services/axiosInstance";
import useSWR from "swr";
import { useState } from "react";
import Loading from "@/app/loading";
import SuggestedProducts from "@/components/pageComponents/suggestProducts";
import { useRouter } from "next/navigation";

// Fetcher function for SWR
const fetcher = async (url: string) =>
  createAxiosInstance()
    .get(url)
    .then((res) => res);

// Mock reviews and ratings (replace with dynamic data when available)
const reviews = [
  {
    author: "Nicolas Cage",
    date: "3 Days ago",
    rating: 5,
    content:
      "Great Product! There are many variations of passages of Lorem ipsum available, but most have suffered alteration in some form.",
  },
  {
    author: "Sr. Robert Downey",
    date: "5 Days ago",
    rating: 5,
    content:
      "The best product in the market! Contrary to popular belief, Lorem Ipsum is not simply random text.",
  },
];

const ratingCounts = [70, 15, 10, 3, 2];

export default function ProductPage({ params }: { params: { _id: string } }) {
  const { data, error, isLoading } = useSWR(`/products/${params._id}`, fetcher);
  const productDetails = data?.data;
  const {
    data: suggestedData,
    error: suggestedError,
    isLoading: suggestedLogin,
  } = useSWR(`/products/${params._id}/related`, fetcher);
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToOrderList } = useStore();

  const route = useRouter();

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (isLoading)
    return (
      <p className="mt-32">
        <Loading />
      </p>
    );
  if (error) return <p>Failed to load product details</p>;

  const handleBuyNow = () => {
    addToOrderList([productDetails]);
    route.push("/place-order");
  };
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <Image
            src={productDetails.images[0]}
            alt={productDetails?.name || "Product Image"}
            width={300}
            height={300}
            className="w-full h-[30rem] rounded-xl"
          />
          <div className="flex mt-4 space-x-2">
            {productDetails?.images?.map((image: string, i: number) => (
              <Image
                key={i}
                src={image || productImg}
                alt={`Thumbnail ${i}`}
                width={80}
                height={80}
                objectFit="cover"
                className="w-20 h-20 object-cover cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{productDetails?.name}</h1>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              (12 customer reviews)
            </span>
          </div>
          <p className="text-gray-600 mb-4">{productDetails?.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">৳ {productDetails?.price}</span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              ৳ {productDetails?.price + (productDetails.price * 20) / 100}
            </span>
          </div>

          {/* Quantity Input and Buttons */}
          <div className="flex items-center space-x-4 mb-4 flex-wrap">
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
            <Button onClick={() => addToCart(productDetails)}>
              Add to Cart
            </Button>
            <Button onClick={() => handleBuyNow()} variant="secondary">
              Buy Now
            </Button>
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

      {/* Tabs for Description and Reviews */}
      <div className="my-12">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="description">DESCRIPTION</TabsTrigger>
            <TabsTrigger value="reviews">REVIEWS</TabsTrigger>
          </TabsList>

          {/* Description Tab */}
          <TabsContent value="description">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Product Overview</h2>
              <p className="text-gray-600">{productDetails?.description}</p>
              <p className="text-gray-600">Brand: {productDetails?.brand}</p>
              <p className="text-gray-600">
                Catagory: {productDetails?.category}
              </p>
              <h3 className="text-lg font-semibold">Key Features:</h3>
              <ul className="list-disc ml-5 space-y-1 text-gray-600">
                {productDetails?.features?.map((feature: string, i: number) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <div className="space-y-8">
              {/* Product Rating */}
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold">4.8</div>
                <div>
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">Product Rating</div>
                </div>
              </div>

              {/* Star Rating Breakdown */}
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

              {/* Customer Reviews */}
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="w-10 h-10 rounded-full">
                        <div className="bg-primary text-primary-foreground flex items-center justify-center">
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
                      {[...Array(5)].map((_, star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.content}</p>
                  </div>
                ))}
              </div>

              {/* Review Form */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
                <div className="space-y-4">
                  <div>
                    <div className="mb-2">Rate the product</div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-8 h-8 cursor-pointer ${
                            i < rating ? "fill-yellow-400" : ""
                          }`}
                          onClick={() => setRating(i + 1)}
                        />
                      ))}
                    </div>
                  </div>
                  <Textarea placeholder="Write your review here..." />
                  <Button>Submit Review</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {suggestedData ? (
        <SuggestedProducts data={suggestedData} />
      ) : suggestedLogin ? (
        <p>Loading...</p>
      ) : suggestedError ? (
        <p>Suggest product Not Found!</p>
      ) : (
        ""
      )}
    </div>
  );
}
