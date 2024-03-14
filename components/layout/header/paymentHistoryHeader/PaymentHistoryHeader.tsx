"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function PaymentHistoryHeader() {
  const pathName = usePathname();
  return (
    <>
      {pathName === "/payment-history" && (
        <div className="px-[24px]">
          <h1 className="text-[30px] font-semibold text-slate-50 mb-4">
            ประวัติการเงิน
          </h1>
        </div>
      )}
    </>
  );
}
