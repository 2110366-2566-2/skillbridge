import { getEmploymentTracking } from "@/actions/employmentHistoryDetail/employmentHistoryDetail";
import { EmploymentTrack } from "@/types/employmentTrackType";
import React from "react";
import ProgressIcon, { getThaiProgressText } from "./ProgressIcon";

type Props = {
    jobId: string;
    studentId: string;
};

const testList = [
    {
        status: "-PENDING",
        date: "2022-12-12",
    },
    {
        status: "PENDING-REJECTED",
        date: "2022-12-12",
    },
    {
        status: "PENDING-ACCEPTED",
        date: "2022-12-12",
    },
    {
        status: "PENDING-DISCLAIMED",
        date: "2022-12-12",
    },
    {
        status: "ACCEPTED-DISCLAIMED",
        date: "2022-12-12",
    },
    {
        status: "ACCEPTED-DEPOSIT_PENDING",
        date: "2022-12-12",
    },
    {
        status: "DEPOSIT_PENDING-IN_PROGRESS",
        date: "2022-12-12",
    },
    {
        status: "IN_PROGRESS-CANCELED",
        date: "2022-12-12",
    },
    {
        status: "IN_PROGRESS-DELIVERED",
        date: "2022-12-12",
    },
    {
        status: "DELIVERED-IN_PROGRESS",
        date: "2022-12-12",
    },
    {
        status: "DELIVERED-WAGE_PAYMENT_PENDING",
        date: "2022-12-12",
    },
    {
        status: "WAGE_PAYMENT_PENDING-DONE",
        date: "2022-12-12",
    },
];

async function ProgressTracker({ jobId, studentId }: Props) {
    const data: Array<EmploymentTrack> =
        (await getEmploymentTracking(jobId, studentId)).data || [];
    return testList.map((item, index) => {
        if (index === 0) {
            return (
                <main key={index} className="flex flex-col w-[300px]">
                    <section className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center gap-4">
                            <ProgressIcon status={item.status} />
                            <p className="font-semibold text-md">
                                {getThaiProgressText(item.status)}
                            </p>
                        </div>
                        <p className="font-light text-md">{item.date}</p>
                    </section>
                </main>
            );
        } else {
            return (
                <main key={index} className="flex flex-col w-[300px]">
                    <hr className="border-t-2 border-gray-300 my-4" />
                    <section className="flex flex-row justify-between items-center">
                        <div className="flex flex-row items-center gap-4">
                            <ProgressIcon status={item.status} />
                            <p className="font-semibold text-md">
                                {getThaiProgressText(item.status)}
                            </p>
                        </div>
                        <p className="font-light text-md">{item.date}</p>
                    </section>
                </main>
            );
        }
    });
}

export default ProgressTracker;
