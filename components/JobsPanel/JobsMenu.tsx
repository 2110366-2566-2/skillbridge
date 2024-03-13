"use client";

import React, { useState, useEffect } from "react";
import JobsPanel from "./JobsPanel";
import Link from "next/link";
import JobCardType from "../../types/JobCardType";
import fetchInitialData from "../../lib/Jobs/fetchInitialData";
import { useSession } from "next-auth/react";
import JobToggler from "./JobToggler";
import Sorter from "./Sorter";

type Props = {};

const jobTypeList = ["งานปัจจุบัน", "งานที่เสร็จสิ้น"];

// export function
function JobsMenu(props: Props) {
  const [jobType, setJobType] = useState("งานปัจจุบัน");
  const [startDateSortOption, setStartDateSortOption] = useState("-");
  const [endDateSortOption, setEndDateSortOption] = useState("-");
  const [priceSortOption, setPriceSortOption] = useState("-");
  const [applicantsSortOption, setApplicantsSortOption] = useState("-");
  const [isOpeningSideBar, setIsOpeningSideBar] = useState(false);
  const [pendingJobs, setPendingJobs] = useState<JobCardType[]>([]);
  const [doneJobs, setDoneJobs] = useState<JobCardType[]>([]);

  useEffect(() => {
    async function fetchData() {
      /* TODO: later improvement to useServerSide session and pass as props to the client side */
      try {
        const [pendingJobs, doneJobs] = await fetchInitialData();
        setPendingJobs(pendingJobs.filter((jobCard) => !jobCard.isDeleted));
        setDoneJobs(doneJobs.filter((jobCard) => !jobCard.isDeleted));
      } catch (err) {
        console.log("Fetching user's jobs error :", err);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Toggle between PendingJobsPanel and DoneJobsPanel based on the value of isPending. */}
      <JobToggler
        status={jobType}
        setStatus={setJobType}
        statusList={jobTypeList}
      />

      {/* Sort button and Create Work button */}
      <section className="my-3">
        <div className="flex flex-row gap-2 justify-end">
          {/* This is made to contain height consistency */}
          <div className="bg-transparent text-transparent py-2">|</div>

          {/* Sort button */}
          <Sorter
            isOpeningSideBar={isOpeningSideBar}
            setIsOpeningSideBar={setIsOpeningSideBar}
            startDateSortOption={startDateSortOption}
            setStartDateSortOption={setStartDateSortOption}
            endDateSortOption={endDateSortOption}
            setEndDateSortOption={setEndDateSortOption}
            priceSortOption={priceSortOption}
            setPriceSortOption={setPriceSortOption}
            applicantsSortOption={applicantsSortOption}
            setApplicantsSortOption={setApplicantsSortOption}
          />

          {/* Create Work button */}
          <Link href={"/jobs/create"} key={"createJob"}>
            <button
              className={`${jobType === "งานปัจจุบัน" ? "" : "hidden"} bg-slate-900 font-medium text-md text-white rounded-md px-3 py-2 hover:shadow-md`}
            >
              สร้างงาน
            </button>
          </Link>
        </div>
      </section>

      {/* Show jobs */}
      <div className="lg:flex lg:flex-row lg:justify-between gap-2">
        {/* PendingJobsPanel and DoneJobsPanel */}
        {jobType === "งานปัจจุบัน" ? (
          <JobsPanel
            startDateSortOption={startDateSortOption}
            endDateSortOption={endDateSortOption}
            priceSortOption={priceSortOption}
            applicantsSortOption={applicantsSortOption}
            data={pendingJobs}
            isPending={jobType === "งานปัจจุบัน"}
          ></JobsPanel>
        ) : (
          <JobsPanel
            startDateSortOption={startDateSortOption}
            endDateSortOption={endDateSortOption}
            priceSortOption={priceSortOption}
            applicantsSortOption={applicantsSortOption}
            data={doneJobs}
            isPending={jobType === "งานปัจจุบัน"}
          ></JobsPanel>
        )}
      </div>
    </>
  );
}

export default JobsMenu;
