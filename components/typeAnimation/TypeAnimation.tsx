"use client";

import { TypeAnimation as TypeAnimationPackage } from "react-type-animation";

type Props = {
  jobTags: {
    id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
  }[],
};

export default function TypeAnimation(props: Props) {
  const { jobTags } = props;
  const jobTagsWithDelay = jobTags.flatMap((jobTag, index) =>
    index < jobTags.length - 1 ? [jobTag.title, 1000] : [jobTag.title],
  );

  return (
    <TypeAnimationPackage
      className="text-4xl font-semibold py-2 md:text-8xl md:font-bold"
      sequence={jobTagsWithDelay}
      wrapper="span"
      speed={10}
      repeat={Infinity}
    />
  );
}
