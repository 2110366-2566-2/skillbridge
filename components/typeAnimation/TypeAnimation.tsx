"use client";

import { TypeAnimation as TypeAnimationPackage } from "react-type-animation";

type Props = {
  taskCategories: string[];
};

export default function TypeAnimation(props: Props) {
  const { taskCategories } = props;
  const taskCategoriesWithDelay = taskCategories.flatMap((element, index) =>
    index < taskCategories.length - 1 ? [element, 1000] : [element],
  );

  return (
    <TypeAnimationPackage
      className="text-4xl font-semibold py-2 md:text-8xl md:font-bold"
      sequence={taskCategoriesWithDelay}
      wrapper="span"
      speed={10}
      repeat={Infinity}
    />
  );
}
