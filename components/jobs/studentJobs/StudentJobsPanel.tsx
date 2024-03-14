import React from "react";
import JobStatus from "../../jobManage/jobStatus/jobStatus";
import StudentJobCardType from "@/types/StudentJobCardType";
import sortArray from "@/lib/Jobs/sortStudentArray";

type Props = {
  startDateSortOption: string;
  endDateSortOption: string;
  statusSortOption: string;
  data: Array<StudentJobCardType>;
};

function StudentJobsPanel({
  startDateSortOption,
  endDateSortOption,
  statusSortOption,
  data,
}: Props) {
  const sortedData = sortArray(
    data,
    startDateSortOption,
    endDateSortOption,
    statusSortOption,
  );
  return (
    <main className="flex flex-col">
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
        {sortedData.length !== 0 ? (
          sortedData.map((data, index) => {
            return (
              <JobStatus
                key={index}
                userId={data.userId}
                jobId={data.jobId}
                title={data.title}
                startDate={data.startDate}
                endDate={data.endDate}
                category={data.category}
                status={data.status}
              />
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
