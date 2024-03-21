import React from "react";
import JobCardType from "@/types/JobCardType";
import JobDescription from "./jobStatus/jobDescription";
import SearchNotFound from "../../searchJob/SearchNotFound";
import StudentJobCard from "./StudentJobCard";
import { applicationInfo } from "@/actions/jobs/jobCards/fetchJobCards";

type Props = {
  data: Array<applicationInfo>;
};

function StudentJobsPanel({ data }: Props) {
  return (
    <main className="flex flex-col">
      {data.length !== 0 ? (
        <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
          {data.map((data, index) => {
            return (
              <>
                <StudentJobCard jobId={data.jobId} name={data.title} category={data.tag} startDate={data.startDate} endDate={data.endDate}/>
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
