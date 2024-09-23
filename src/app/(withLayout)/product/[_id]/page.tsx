"use client";

import Image from "next/image";
import { Star, Truck, RotateCcw, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, memo } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/app/lib/store";
import SuggestedProducts from "@/components/pageComponents/suggestProducts";
import Reviews from "@/components/pageComponents/reviews";
import Loading from "@/app/loading";
import {
  useIsBought,
  useProductDetails,
  useReviews,
  useSuggestedProducts,
} from "@/hooks/productHooks";
import { IReview } from "@/types/reviewsType";

// Define a type for productDetails
type ProductDetails = {
  name: string;
  description: string;
  price: number;
  images: string[];
  brand?: string;
  category?: string;
  features?: string[];
};

// Memoized StarRating Component
const StarRating = memo(() => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-current" />
    ))}
  </div>
));

export default function ProductPage({ params }: { params: { _id: string } }) {
  const { productDetails, isLoading, error } = useProductDetails(params._id);
  const {
    reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useReviews(params._id);
  const {
    isBought,
    isLoading: boughtLoading,
    error: boughtError,
  } = useIsBought(params._id);

  const {
    suggestedProducts,
    isLoading: suggestedLoading,
    error: suggestedError,
  } = useSuggestedProducts(params._id);

  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToOrderList } = useStore();
  const route = useRouter();

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleBuyNow = () => {
    if (productDetails) {
      addToOrderList([productDetails]);
      route.push("/place-order");
    }
  };

  if (isLoading) return <Loading />;
  if (error) return <p>Failed to load product details</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-28">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        {productDetails && (
          <ProductImages
            images={productDetails.images}
            name={productDetails.name}
          />
        )}

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{productDetails?.name}</h1>
          <div className="flex items-center mb-4">
            <StarRating />
            <span className="ml-2 text-sm text-gray-600">
              (12 customer reviews)
            </span>
          </div>
          <p className="text-gray-600 mb-4">{productDetails?.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">
              ৳ {productDetails?.price}
            </span>
            <span className="ml-2 text-sm text-gray-500 line-through">
              ৳ {productDetails?.price + (productDetails.price * 20) / 100}
            </span>
          </div>

          {/* Quantity Input and Buttons */}
          <div className="flex items-center space-x-4 mb-4 flex-wrap">
            <QuantitySelector
              quantity={quantity}
              handleDecrease={handleDecrease}
              handleIncrease={handleIncrease}
            />
            <Button onClick={() => addToCart(productDetails)}>
              Add to Cart
            </Button>
            <Button onClick={handleBuyNow} variant="secondary">
              Buy Now
            </Button>
          </div>

          <ProductFeatures />
        </div>
      </div>

      {/* Tabs for Description and Reviews */}
      <TabsSection
        productDetails={productDetails}
        reviews={reviews}
        reviewsLoading={reviewsLoading}
        bought={isBought}
      />

      {/* Suggested Products */}
      {suggestedLoading ? (
        <Loading />
      ) : suggestedError ? (
        <p>Suggested products not found!</p>
      ) : (
        <SuggestedProducts data={suggestedProducts?.data} />
      )}
    </div>
  );
}

// Separated components for clarity
const ProductImages = ({
  images,
  name,
}: {
  images: string[];
  name: string;
}) => {
  // State to manage the currently displayed image
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <div>
      {/* Main Product Image */}
      <div className="relative w-full h-[30rem]">
        <Image
          src={currentImage}
          alt={name || "Product Image"}
          fill
          objectFit="cover"
          className="rounded-xl"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex mt-4 space-x-2">
        {images?.map((image, i) => (
          <div key={i} className="relative w-20 h-20">
            <Image
              src={image}
              alt={`Thumbnail ${i}`}
              fill
              objectFit="cover"
              className="rounded-md cursor-pointer"
              onClick={() => setCurrentImage(image)} // Update main image on click
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const QuantitySelector = ({
  quantity,
  handleIncrease,
  handleDecrease,
}: {
  quantity: number;
  handleIncrease: () => void;
  handleDecrease: () => void;
}) => (
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
);

const ProductFeatures = () => (
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
);

const TabsSection = ({
  productDetails,
  reviews,
  reviewsLoading,
  bought,
}: {
  productDetails: ProductDetails;
  reviews: { data: IReview[] };
  reviewsLoading: boolean;
  bought: boolean;
}) => (
  <div className="my-12">
    <Tabs defaultValue="reviews" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="description">DESCRIPTION</TabsTrigger>
        <TabsTrigger value="reviews">REVIEWS</TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Product Overview</h2>
          <p className="text-gray-600">{productDetails?.description}</p>
          <p className="text-gray-600">Brand: {productDetails?.brand}</p>
          <p className="text-gray-600">Category: {productDetails?.category}</p>
          <h3 className="text-lg font-semibold">Key Features:</h3>
          <ul className="list-disc ml-5 space-y-1 text-gray-600">
            {productDetails?.features?.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      </TabsContent>
      <TabsContent value="reviews">
        {reviewsLoading ? (
          <Loading />
        ) : (
          <Reviews bought={bought} reviews={reviews?.data} />
        )}
      </TabsContent>
    </Tabs>
  </div>
);
