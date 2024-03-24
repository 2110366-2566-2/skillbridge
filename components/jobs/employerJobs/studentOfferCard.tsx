"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { convertStateNameToThai } from "@/lib/Jobs/adapter";
import CallToActionButtons from "../CallToActionButtons";

type Props = {
    studentId: string;
    jobId: string;
    studentName: string;
    applicationDate: Date;
    status: string;
    price: number;
};

const colorMatcher: Map<string, string> = new Map<string, string>([
    ["PENDING", "bg-yellow-100"],
    ["DISCLAIMED", "bg-rose-100"],
    ["DEPOSIT_PENDING", "bg-yellow-100"],
    ["IN_PROGRESS", "bg-yellow-100"],
    ["DELIVERED", "bg-green-100"],
    ["WAGE_PAYMENT_PENDING", "bg-yellow-100"],
    ["DONE", "bg-green-100"],
    ["ACCEPTED", "bg-green-100"],
    ["REJECTED", "bg-rose-100"],
    ["CANCELED", "bg-rose-100"],
]);

function studentOfferCard({
    studentId,
    jobId,
    studentName,
    applicationDate,
    status,
    price,
}: Props) {
    const [isDropDownOpen, setDropDownOpen] = useState(false);

    return (
        <div className="bg-gradient-to-r from-slate-100 px-5 pt-7 pb-5 rounded-3xl shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-200 h-fit transition duration-300 ease-in-out">
            <section className="flex flex-row justify-between items-center">
                <p className="font-semibold text-lg md:text-xl lg:text-2xl line-clamp-2 hover:underline min-h-[40px] h-fit flex items-center">
                    {studentName}
                </p>

                <p className="font-semibold text-lg md:text-xl lg:text-2xl line-clamp-2">
                    ฿{price.toLocaleString()}
                </p>
            </section>

            <section className="flex flex-row justify-between">
                <div className="flex flex-row">
                    <div className="font-medium flex items-center">
                        {applicationDate.toLocaleString("en-GB")} น.
                    </div>

                    <div
                        className={`${colorMatcher.get(status)} rounded-full flex align-center w-fit h-fit py-2 px-3 mx-2`}
                    >
                        <p className="text-xs font-medium sm:text-nowrap text-wrap">
                            {convertStateNameToThai("employer", status)}
                        </p>
                    </div>
                </div>

                {/* DropDownObject is a component that is shown when the card is clicked */}
                <Image
                    className={`${isDropDownOpen ? "rotate-180" : ""} transition duration-300 ease-out hover:cursor-pointer`}
                    src={"/icons/dropdown.svg"}
                    width={20}
                    height={20}
                    alt={isDropDownOpen ? "dropup" : "dropdown"}
                    onClick={() => setDropDownOpen(!isDropDownOpen)}
                />
            </section>

            <div className={`${isDropDownOpen ? "mt-6" : "hidden"}`}>
                <CallToActionButtons
                    jobId={jobId}
                    studentId={studentId}
                    status={status}
                    role="employer"
                />
            </div>
        </div>
    );
}

export default studentOfferCard;
