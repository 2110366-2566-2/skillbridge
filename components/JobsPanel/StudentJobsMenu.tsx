"use client";

import React, { useState } from 'react'
import JobToggler from './JobToggler';
import Sorter from './Sorter';

type Props = {}

const jobTypeList = ['งานที่กำลังสมัคร', 'งานปัจจุบัน', 'งานที่เสร็จสิ้น'];

const StudentJobsMenu = (props: Props) => {
    const [jobType, setJobType] = useState('งานที่กำลังสมัคร');
    const [isOpeningSideBar, setIsOpeningSideBar] = useState(false);
    const [statusSortOption, setStatusSortOption] = useState("-");
    
  const sortOptions = [{name: "สถานะ", value: statusSortOption, set: setStatusSortOption}];

  return (
    <>
        {/* Toggle between PendingJobsPanel and DoneJobsPanel based on the value of isPending. */}
        <JobToggler status={jobType} setStatus={setJobType} statusList={jobTypeList} />

        {/* Sort button */}
      <section className="my-3">
        <div className="flex flex-row gap-2 justify-end">
          {/* This is made to contain height consistency */}
          <div className="bg-transparent text-transparent py-2">|</div>

          {/* Sort button */}
          <Sorter sideBarState={{
            name: 'sidebar',
            value: isOpeningSideBar,
            set: setIsOpeningSideBar
          }} sortOptions={sortOptions} />

        </div>
      </section>

      {/* show jobs */}
        <div className="lg:flex lg:flex-row lg:justify-between gap-2">
            {/* applied, current, done jobs */}
            { jobType === 'งานที่กำลังสมัคร' ? (
                <div>Applied Jobs</div>
            ) : (jobType === 'งานปัจจุบัน' ? (
                <div>Current Jobs</div>
            ) : (
                <div>Done Jobs</div>
            ))
            }
        </div>
    </>
  )
}

export default StudentJobsMenu