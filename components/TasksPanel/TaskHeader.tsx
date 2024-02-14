"use client";

import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const TaskHeader = (props: Props) => {
  const pathName = usePathname();
  const isTaskPage = pathName.startsWith("/works");

  return (
    <>
      {isTaskPage && (
        <div className="font-semibold text-[30px] text-white ml-5 mb-4">
          งานของฉัน
        </div>
      )}
    </>
  );
};

export default TaskHeader;
