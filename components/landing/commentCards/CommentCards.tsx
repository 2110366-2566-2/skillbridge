import CommentCard from "./commentCard/CommentCard";
import CardSlider from "../cardSlider/CardSlider";
import { getReviews } from "@/actions/reviews/getReviews";

export default async function CommentCards() {
  const reviews = await getReviews();
  return (
    <>
      <div className="w-screen overflow-x-scroll flex gap-3 pb-5 px-5 md:hidden">
        {reviews.map((review: any) => (
          <CommentCard
            key={review.id}
            name={review.name}
            position={review.position}
            organization={review.organization}
            jobTag={review.jobTag}
            description={review.description}
            profileImage={review.profileImage}
          />
        ))}
      </div>
      <div className="hidden md:flex w-full justify-center md:px-32 md:max-w-[1600px]">
        <CardSlider>
          {reviews.map((review: any) => (
            <CommentCard
              key={review.id}
              name={review.name}
              position={review.position}
              organization={review.organization}
              jobTag={review.jobTag}
              description={review.description}
              profileImage={review.profileImage}
            />
          ))}
        </CardSlider>
      </div>
    </>
  );
}
