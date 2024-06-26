import { getEmploymentTracking } from "@/actions/employmentHistoryDetail/employmentHistoryDetail";
import { EmploymentTrack } from "@/types/employmentTrackType";
import React from "react";
import ProgressIcon, {
    getIconColor,
    getThaiProgressText,
} from "./ProgressIcon";
import SearchNotFound from "../searchJob/SearchNotFound";

type Props = {
    jobId: string;
    studentId: string;
};

function condenseBeforeAfterStates(data: Array<EmploymentTrack>) {
    return data.map((item) => {
        return {
            status: `${item.status.before || ""}-${item.status.after}`,
            date: item.date,
        };
    });
}

async function ProgressTracker({ jobId, studentId }: Props) {
    const data: Array<EmploymentTrack> =
        (await getEmploymentTracking(jobId, studentId)).data || [];
    const condensedData = condenseBeforeAfterStates(data);
    if (condensedData.length === 0) {
        return (
            <div className="flex justify-center items-center">
                <SearchNotFound text="ไม่พบประวัติ" />
            </div>
        );
    } else {
        return condensedData.map((item, index) => {
            if (index === 0) {
                return (
                    <main
                        key={index}
                        className="flex flex-col min-w-[300px] xl:min-w-[400px]"
                    >
                        <section className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center gap-4">
                                <ProgressIcon status={item.status} />
                                <p className="font-semibold text-md">
                                    {getThaiProgressText(item.status)}
                                </p>
                            </div>
                            <p className="font-light text-md">
                                {item.date.toLocaleDateString("en-GB")}
                            </p>
                        </section>
                    </main>
                );
            } else {
                const color = getIconColor(item.status);
                const prevColor = getIconColor(condensedData[index - 1].status);
                return (
                    <main
                        key={index}
                        className="flex flex-col min-w-[300px] xl:min-w-[400px]"
                    >
                        {/* vertical line */}
                        <div
                            className={`h-[45px] w-[3px] ml-[21px] border-slate-600 bg-gradient-to-t ${
                                color === "red-400"
                                    ? "from-red-400"
                                    : color === "green-600"
                                    ? "from-green-600"
                                    : "from-slate-600"
                            } ${
                                prevColor === "red-400"
                                    ? "to-red-400"
                                    : prevColor === "green-600"
                                    ? "to-green-600"
                                    : "to-slate-600"
                            }`}
                        ></div>
                        <section className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center gap-4">
                                <ProgressIcon status={item.status} />
                                <p className="font-semibold text-md">
                                    {getThaiProgressText(item.status)}
                                </p>
                            </div>
                            <p className="font-light text-md">
                                {item.date.toLocaleDateString("en-GB")}
                            </p>
                        </section>
                    </main>
                );
            }
        });
    }
}

export default ProgressTracker;
