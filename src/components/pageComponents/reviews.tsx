import { Star } from "lucide-react";
import React from "react";
import { Progress } from "../ui/progress";
import { Avatar } from "../ui/avatar";
import { IReview } from "@/types/reviewsType";

const Reviews = ({
  reviews,
  bought,
}: {
  reviews: IReview[];
  bought: boolean;
}) => {
  // Initialize counts for each star rating
  const ratingCounts = [0, 0, 0, 0, 0]; // Index 0 for 1-star, Index 4 for 5-star

  // Count the number of reviews for each rating
  reviews?.forEach((review: IReview) => {
    ratingCounts[5 - review.rating] += 1;
  });

  const totalReviews = reviews?.length;

  let totalRatingSum = 0;

  // Count the number of reviews for each rating and calculate total sum of ratings
  reviews?.forEach((review: IReview) => {
    ratingCounts[5 - review.rating] += 1;
    totalRatingSum += review.rating;
  });

  // Calculate percentage for each star rating
  const ratingPercentages = ratingCounts.map((count) =>
    totalReviews ? (count / totalReviews) * 100 : 0
  );
  const averageRating = totalReviews ? totalRatingSum / totalReviews : 0;

  return (
    <div>
      <div className="flex items-center space-x-4 my-3 space-y-3">
        <div className="text-4xl font-bold">{averageRating}</div>
        <div>
          <div className="flex text-yellow-400 mb-1">
            {[...Array(averageRating)]?.map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <div className="text-sm text-gray-500">Product Rating</div>
        </div>
      </div>
      {/* Star Rating Breakdown */}
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
      {/* Customer Reviews */}
      <div className="space-y-4">
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
      {bought && <p>This product you already bought.....</p>}
    </div>
  );
};

export default Reviews;
