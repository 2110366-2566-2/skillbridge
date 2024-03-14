import React from "react";
import JobCardType from "@/types/JobCardType";
import JobDescription from "../../jobManage/jobStatus/jobDescription";
import NewJobDescription from "../../jobManage/jobStatus/NewJobDescription";

type Props = {
  data: Array<JobCardType>;
};

function StudentJobsPanel({ data }: Props) {
  return (
    <main className="flex flex-col">
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
        {data.length !== 0 ? (
          data.map((data, index) => {
            return (
              <>
                <NewJobDescription
                  jobId={data.jobId}
                  name={data.name}
                  budget={data.budget}
                  description={data.description}
                  category={data.category}
                  applicants={data.applicants}
                  maxApplicants={data.maxApplicants}
                  startDate={data.startDate}
                  endDate={data.endDate}
                  isPending={data.isPending}
                />
                <NewJobDescription
                  jobId={data.jobId}
                  name={data.name}
                  budget={data.budget}
                  description={data.description}
                  category={data.category}
                  applicants={data.applicants}
                  maxApplicants={data.maxApplicants}
                  startDate={data.startDate}
                  endDate={data.endDate}
                  isPending={data.isPending}
                />
                <NewJobDescription
                  jobId={data.jobId}
                  name={data.name}
                  budget={data.budget}
                  description={data.description}
                  category={data.category}
                  applicants={data.applicants}
                  maxApplicants={data.maxApplicants}
                  startDate={data.startDate}
                  endDate={data.endDate}
                  isPending={data.isPending}
                />
                <NewJobDescription
                  jobId={data.jobId}
                  name={data.name}
                  budget={data.budget}
                  description={data.description}
                  category={data.category}
                  applicants={data.applicants}
                  maxApplicants={data.maxApplicants}
                  startDate={data.startDate}
                  endDate={data.endDate}
                  isPending={data.isPending}
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
                />
              </>
            );
          })
        ) : (
          <div className="flex justify-center items-center">
            <div className="font-medium text-lg text-slate-500 mt-4 mx-auto md:text-2xl md:my-6 lg:font-normal">
              ขออภัย ไม่พบงานที่ค้นหา
            </div>
          </div>
        )}
      </main>
    </main>
  );
}

export default StudentJobsPanel;
