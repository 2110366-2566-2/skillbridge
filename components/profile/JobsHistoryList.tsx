"use client";

import Image from "next/image";
import JobHistory from "./subProfile/JobHistory";
import { AllJobsHistory } from "@/lib/profile/studentJobAdapter";

export default function JobsHistoryList({
  allJobsHistory,
  userId,
  isStudent,
}: {
  allJobsHistory: AllJobsHistory[];
  userId: string;
  isStudent: boolean;
}) {
  return (
    <div className="mt-[20px] w-full md:max-w-[600px] md:mt-0">
      <p className="font-bold text-[24px] text-[#94A3B8] lg:text-[26px]">
        {isStudent ? "ประวัติการทำงาน" : "ประวัติการจ้างงาน"}
      </p>
      <div className="border-t border-1 border-[#cbd5e1] flex flex-col items-center">
        {allJobsHistory ? (
          <div className="w-full md:max-h-[750px] md:overflow-y-scroll">
            {allJobsHistory.map((job: AllJobsHistory, index: number) => (
              <JobHistory
                key={index}
                userId={userId}
                jobId={job.jobId}
                jobTitle={job.title}
                jobPeriod={`${job.estimateStartDate.toLocaleDateString(
                  "en-US"
                )} - ${job.estimateEndDate.toLocaleDateString("en-US")}`}
                jobTag={job.jobTag}
                isStudent={isStudent}
              />
            ))}
          </div>
        ) : (
          <div className="mt-[40px] md:mt-[100px]">
            <Image
              src={"/icons/notFound.svg"}
              width={156}
              height={156}
              alt="not found"
            />
            <p className="font-medium text-[24px] text-[#64748b] mt-[15px] text-center">
              ไม่พบงาน
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
