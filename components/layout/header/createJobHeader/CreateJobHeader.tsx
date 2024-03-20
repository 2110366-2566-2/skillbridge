"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function CreateJobHeader() {
  const pathName = usePathname().split("/");
  return (
    <>
      {pathName.includes("create") && (
        <div className="px-[24px]">
          <h1 className="text-[30px] font-semibold text-slate-50 mb-4">
            สร้างงาน
          </h1>
        </div>
      )}
    </>
  );
}
