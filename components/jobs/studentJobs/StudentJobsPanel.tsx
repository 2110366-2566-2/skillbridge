import React from "react";
import JobStatus from "./jobStatus/jobStatus";
import StudentJobCardType from "@/types/StudentJobCardType";
import sortArray from "@/lib/Jobs/sortStudentArray";
import { convertStateNameToThai } from "@/lib/Jobs/adapter";
import { applicationInfo } from "@/actions/jobs/jobCards/fetchJobCards";
import SearchNotFound from "@/components/searchJob/SearchNotFound";
import StudentJobCard from "./StudentJobCard";

type Props = {
    isLoading: boolean;
    startDateSortOption: string;
    endDateSortOption: string;
    statusSortOption: string;
    data: Array<applicationInfo>;
    isDone: boolean;
};

function StudentJobsPanel({
    isLoading,
    startDateSortOption,
    endDateSortOption,
    statusSortOption,
    data,
    isDone = true,
}: Props) {
  console.log(data);
    const sortedData = sortArray(
        data,
        startDateSortOption,
        endDateSortOption,
        statusSortOption
    );
    return (
        <main className="flex flex-col">
            <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
                {isLoading ? (
                    <div className="flex justify-center items-center">
                        <div className="font-medium text-lg text-slate-500 mt-4 mx-auto md:text-2xl md:my-6 lg:font-normal">
                            กำลังโหลดข้อมูล
                        </div>
                    </div>
                ) : // check if it is empty
                sortedData.length !== 0 ? (
                    // check if it is done tasks
                    isDone === false ? (
                        sortedData.map((data, index) => {
                            return (
                                <JobStatus
                                    key={index}
                                    jobId={data.jobId}
                                    title={data.title}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    category={data.tag}
                                    status={convertStateNameToThai(
                                        "student",
                                        data.status
                                    )}
                                />
                            );
                        })
                    ) : (
                        sortedData.map((data, index) => {
                            return (
                                <StudentJobCard
                                    key={index}
                                    jobId={data.jobId}
                                    name={data.title}
                                    category={data.tag}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    status={convertStateNameToThai("student", data.status)}
                                />
                            );
                        })
                    )
                ) : (
                    <div className="flex justify-center items-center">
                        <SearchNotFound text={"ไม่พบงาน"} />
                    </div>
                )}
            </main>
        </main>
    );
}

export default StudentJobsPanel;
