"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function PaymentHeader() {
    const pathName = usePathname();
    const isProfilePage = pathName.startsWith('/profile');
    return (
        <>
            {isProfilePage && (
                <div className="px-[24px]">
                    <h1 className="text-[30px] font-semibold text-slate-50 mb-4">
                        โปรไฟล์
                    </h1>
                </div>
            )}
        </>
    );
}
