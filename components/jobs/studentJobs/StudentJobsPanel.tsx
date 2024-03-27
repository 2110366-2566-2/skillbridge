import React from "react";
import sortArray from "@/lib/Jobs/sortStudentArray";
import { applicationInfo } from "@/actions/jobs/jobCards/fetchJobCards";
import SearchNotFound from "@/components/searchJob/SearchNotFound";
import StudentJobCard from "./StudentJobCard";
import { getStudentUserId } from "@/actions/jobs/jobCards/utils";

type Props = {
    isLoading: boolean;
    startDateSortOption: string;
    endDateSortOption: string;
    statusSortOption: string;
    data: Array<applicationInfo>;
    isDone: boolean;
    studentId: string;
};

function StudentJobsPanel({
    isLoading,
    startDateSortOption,
    endDateSortOption,
    statusSortOption,
    data,
    isDone = true,
    studentId,
}: Props) {
    // console.log(data);
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
                
                    isDone === false ? (
                        sortedData.map((data, index) => {
                            return (
                                <StudentJobCard
                                    key={index}
                                    jobId={data.jobId}
                                    studentId={studentId}
                                    name={data.title}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    category={data.tag}
                                    status={data.status}
                                    isDone={isDone}
                                />
                            );
                        })
                    ) : (
                        sortedData.map((data, index) => {
                            return (
                                <StudentJobCard
                                    key={index}
                                    jobId={data.jobId}
                                    studentId={studentId}
                                    name={data.title}
                                    category={data.tag}
                                    startDate={data.startDate}
                                    endDate={data.endDate}
                                    status={data.status}
                                    isDone={isDone}
                                />
                            );
                        })
                    )
                }
            </main>
            {
            (sortedData.length === 0 && !isLoading) &&
            (
                <div className="flex justify-center items-center">
                    <SearchNotFound text={"ไม่พบงาน"} />
                </div>
            )
            }
        </main>
    );
}

export default StudentJobsPanel;
