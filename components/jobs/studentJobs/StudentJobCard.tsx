"use client";

import { convertStateNameToThai } from "@/lib/Jobs/adapter";
import Image from "next/image";
import React, { useState } from "react";
import CallToActionButtons from "../CallToActionButtons";
import Link from "next/link";

type Props = {
    jobId: string;
    studentId: string;
    name: string;
    category: string;
    startDate: Date;
    endDate: Date;
    status: string;
    isDone?: boolean;
    employerId?: string;
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

// This is a card component for the student's job list
const StudentJobCard = ({
    jobId,
    studentId,
    name,
    category,
    startDate,
    endDate,
    status,
    isDone = true,
    employerId = "",
}: Props) => {
    const [isDropDownOpen, setDropDownOpen] = useState(false);

    return (
        <div className="bg-gradient-to-r from-slate-100 px-5 py-7 rounded-3xl shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-200 max-w-[500px] h-fit transition duration-300 ease-in-out">
            <div className="flex flex-row justify-between">
                <div className="max-w-[85%]">
                    <div className="h-[60px]">
                        <Link
                            className="font-semibold text-2xl line-clamp-2 hover:underline"
                            href={`progress/${jobId}/${studentId}`}
                            target="_blank"
                        >
                            {name}
                        </Link>
                    </div>
                </div>
                <div
                    className={`${colorMatcher.get(
                        status
                    )} rounded-full flex align-center w-fit h-fit py-2 px-3 mx-2`}
                >
                    <p className="text-xs font-medium sm:text-nowrap text-wrap">
                        {convertStateNameToThai("student", status)}
                    </p>
                </div>
            </div>

            <div className="font-medium my-2">
                {startDate.toLocaleDateString("en-GB")} -{" "}
                {endDate.toLocaleDateString("en-GB")}
            </div>

            <div className="flex flex-row justify-between">
                <div className="bg-slate-200 rounded p-2 w-fit">{category}</div>

                {/* DropDownObject is a component that is shown when the card is clicked */}
                <Image
                    className={`${isDone ? "hidden" : ""} ${
                        isDropDownOpen ? "rotate-180" : ""
                    } transition duration-300 ease-out hover:cursor-pointer`}
                    src={"/icons/dropdown.svg"}
                    width={20}
                    height={20}
                    alt={isDropDownOpen ? "dropup" : "dropdown"}
                    onClick={() => setDropDownOpen(!isDropDownOpen)}
                />
            </div>

            <div
                className={`${!isDone && isDropDownOpen ? "" : "hidden"} mt-6`}
            >
                <CallToActionButtons
                    jobId={jobId}
                    status={status}
                    role="student"
                    employerId={employerId}
                />
            </div>
        </div>
    );
};

export default StudentJobCard;
