"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function PaymentHeader() {
    const pathName = usePathname();
    return (
        <>
            {pathName.includes("payment") && (
                <div className="px-[24px]">
                    <h1 className="text-[30px] font-semibold text-slate-50 mb-4">
                        ชำระเงิน
                    </h1>
                </div>
            )}
        </>
    );
}
