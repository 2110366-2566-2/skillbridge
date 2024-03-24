"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function OfferingHeader() {
  const pathName = usePathname();
  const isOfferingPage = pathName.startsWith("/offer");
  return (
    <>
      {isOfferingPage && (
        <div className="px-[24px]">
          <h1 className="text-[30px] font-semibold text-slate-50 mb-4">
            สมัครงาน
          </h1>
        </div>
      )}
    </>
  );
}
