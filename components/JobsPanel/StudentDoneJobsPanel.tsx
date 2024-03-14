import React from "react";
import JobCardType from "@/types/JobCardType";
import JobDescription from "../jobStatus/jobDescription";
import SearchNotFound from "../searchJob/SearchNotFound";
import { finalApplicationInfo } from "@/actions/jobCards/fetchJobCards";

type Props = {
    data: Array<finalApplicationInfo>;
};

function StudentJobsPanel({ data }: Props) {
    return (
        <main className="flex flex-col">
            {data.length !== 0 ? (
                <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
                    {data.map((data, index) => {
                        return (
                            <>
                                <JobDescription
                                    jobId={data.jobId}
                                    title={data.title}
                                    price={data.bid.toString()}
                                    jobDescription={data.description}
                                    tag={data.description}
                                    nubmerOfAcceptedApplication={data.numberOfApplication.toString()}
                                    numberOfMaximumAccepted={data.maxNumberOfApplication.toString()}
                                    period={`${data.startDate} - ${data.endDate}`}
                                />
                                {/* <JobDescription
                                    jobId={data.jobId}
                                    title={data.name}
                                    price={data.budget.toLocaleString()}
                                    jobDescription={data.description}
                                    tag={data.description}
                                    nubmerOfAcceptedApplication={data.applicants.toLocaleString()}
                                    numberOfMaximumAccepted={data.maxApplicants.toLocaleString()}
                                    period={`${data.startDate} - ${data.endDate}`}
                                />
                                <JobDescription
                                    jobId={data.jobId}
                                    title={data.name}
                                    price={data.budget.toLocaleString()}
                                    jobDescription={data.description}
                                    tag={data.description}
                                    nubmerOfAcceptedApplication={data.applicants.toLocaleString()}
                                    numberOfMaximumAccepted={data.maxApplicants.toLocaleString()}
                                    period={`${data.startDate} - ${data.endDate}`}
                                />
                                <JobDescription
                                    jobId={data.jobId}
                                    title={data.name}
                                    price={data.budget.toLocaleString()}
                                    jobDescription={data.description}
                                    tag={data.description}
                                    nubmerOfAcceptedApplication={data.applicants.toLocaleString()}
                                    numberOfMaximumAccepted={data.maxApplicants.toLocaleString()}
                                    period={`${data.startDate} - ${data.endDate}`}
                                /> */}
                            </>
                        );
                    })}
                </main>
            ) : (
                <div className="flex justify-center items-center">
                    <SearchNotFound text={"ไม่พบงาน"} />
                </div>
            )}
        </main>
    );
}

export default StudentJobsPanel;
