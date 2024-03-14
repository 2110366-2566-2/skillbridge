"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function EditJobHeader() {
  const pathName = usePathname();
  return (
    <>
      {pathName === "/jobs/edit" && (
        <div className="px-[24px]">
          <h1 className="text-[30px] font-semibold text-slate-50 mb-4">
            แก้ไขงาน
          </h1>
        </div>
      )}
    </>
  );
}
