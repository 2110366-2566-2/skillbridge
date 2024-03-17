"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function UpdateJobHeader() {
  const pathName = usePathname().split("/");
  return (
    <>
      {pathName.includes("update") && (
        <div className="px-[24px]">
          <h1 className="text-[30px] font-semibold text-slate-50 mb-4">
            แก้ไขงาน
          </h1>
        </div>
      )}
    </>
  );
}
