import React from "react";
import CommentCard from "./commentCard/CommentCard";
import CardSlider from "../cardSlider/CardSlider";
import noavatar from "@/public/icons/noavatar.svg";
import { getReviews } from "@/actions/reviews/getReviews";

export default async function CommentCards() {
  try {
    const reviews = await getReviews();

    return (
      <>
        <div className="w-screen overflow-x-scroll flex gap-3 pb-5 px-5">
          {reviews.map((review: any) => (
            <CommentCard
              key={review.id}
              userId={review.userId}
              name={review.name}
              position={review.position}
              organization={review.organization}
              jobTag={review.jobTag}
              description={review.description}
              profileImage={review.profileImage}
            />
          ))}
        </div>

        {/* // TO FIX
        <div className="hidden md:flex w-full justify-center md:px-32 md:max-w-[1600px]">
          <CardSlider>
            {reviews.map((review: any) => (
              <CommentCard
                key={review.id}
                userId={review.userId}
                name={review.name}
                position={review.position}
                organization={review.organization}
                jobTag={review.jobTag}
                description={review.description}
                profileImage={review.profileImage}
              />
            ))}
          </CardSlider>
        </div> */}
      </>
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);
    // Handle error condition here
    return null; // or any fallback UI
  }
}
