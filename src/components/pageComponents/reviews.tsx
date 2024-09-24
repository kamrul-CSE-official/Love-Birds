"use client";

import { Star } from "lucide-react";
import React from "react";
import { Progress } from "../ui/progress";
import { Avatar } from "../ui/avatar";
import { IReview } from "@/types/reviewsType";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import toast from "react-hot-toast";
import localStorageServices from "@/services/localStorageServices";
import createAxiosInstance from "@/services/axiosInstance";

interface ReviewFormData {
  rating: string;
  comment: string;
}

const Reviews = ({
  productId,
  reviews,
  bought,
}: {
  reviews: IReview[];
  bought: boolean;
  productId: string;
}) => {
  const ratingCounts = [0, 0, 0, 0, 0];
  let totalRatingSum = 0;

  const userData = localStorageServices.getUserData();

  reviews?.forEach((review: IReview) => {
    ratingCounts[5 - review.rating] += 1;
    totalRatingSum += review.rating;
  });

  const totalReviews = reviews?.length;
  const ratingPercentages = ratingCounts.map((count) =>
    totalReviews ? (count / totalReviews) * 100 : 0
  );
  const averageRating = totalReviews ? totalRatingSum / totalReviews : 0;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    defaultValues: {
      rating: "5",
      comment: "",
    },
  });

  const onSubmit = async (data: ReviewFormData) => {
    try {
      const storedAccessToken = localStorageServices.getItemWithExpiry(
        "accessToken"
      ) as string;
      console.log(storedAccessToken);
      const reviewData = {
        comment: data.comment,
        rating: Number(data.rating),
        product: productId,
        user: userData?.userId,
      };
      const req = await createAxiosInstance().post("/reviews", reviewData);
      toast.success("Review submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    }
  };

  return (
    <div>
      {/* Average Rating Display */}
      <div className="flex items-center space-x-4 my-3 space-y-3">
        <div className="text-4xl font-bold">{averageRating.toFixed(1)}</div>
        <div>
          <div className="flex text-yellow-400 mb-1">
            {[...Array(Math.round(averageRating))]?.map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <div className="text-sm text-gray-500">Product Rating</div>
        </div>
      </div>

      {/* Rating Percentages */}
      <div className="space-y-2">
        {ratingPercentages?.map((percentage, index: number) => (
          <div key={index} className="flex items-center">
            <div className="w-12 text-sm text-gray-500">{5 - index} Star</div>
            <Progress value={percentage} className="w-full h-2" />
            <div className="w-12 text-sm text-gray-500 text-right">
              {percentage.toFixed(1)}%
            </div>
          </div>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4 mt-6">
        {reviews?.map((review: IReview, index: number) => (
          <div key={index} className="border-b pb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Avatar className="w-10 h-10 rounded-full">
                <div className="bg-primary text-primary-foreground flex items-center justify-center">
                  {review?.user?.name[0]}
                </div>
              </Avatar>
              <div>
                <div className="font-semibold">{review?.user?.name}</div>
                <div className="text-sm text-gray-500">{review._id}</div>
              </div>
            </div>
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)]?.map((_, star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star < review?.rating ? "fill-current" : ""
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">{review?.comment}</p>
          </div>
        ))}
      </div>

      {/* Review Form for Purchased Users */}
      {bought && (
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <Controller
                name="rating"
                control={control}
                rules={{ required: "Rating is required" }}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-2"
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div key={value} className="flex items-center space-x-1">
                        <RadioGroupItem
                          value={value.toString()}
                          id={`rating-${value}`}
                        />
                        <Label htmlFor={`rating-${value}`}>{value}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.rating && (
                <p className="text-sm text-red-500">{errors.rating.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="comment">Your Review</Label>
              <Textarea
                id="comment"
                {...register("comment", {
                  required: "Review comment is required",
                })}
                placeholder="Write your review here..."
                className="min-h-[100px]"
              />
              {errors.comment && (
                <p className="text-sm text-red-500">{errors.comment.message}</p>
              )}
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Reviews;
