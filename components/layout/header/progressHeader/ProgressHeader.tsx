"use client";

import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

const ProgressHeader = (props: Props) => {
    const pathName = usePathname();
    const isProgressPage = pathName.startsWith("/progress");

    return (
        <>
            {isProgressPage && (
                <div className="font-semibold text-[30px] text-white ml-5 mb-4">
                    ความคืบหน้างาน
                </div>
            )}
        </>
    );
};

export default ProgressHeader;
