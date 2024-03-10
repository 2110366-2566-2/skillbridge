"use client";

import React, { useState, useEffect } from "react";
import JobsPanel from "./JobsPanel";
import Link from "next/link";
import { CloseOutlined, SortAscendingOutlined } from "@ant-design/icons";
import JobCardType from "../../types/JobCardType";
import fetchInitialData from "../../lib/Jobs/fetchInitialData";
import { useSession } from "next-auth/react";
import JobToggler from "./JobToggler";

type Props = {};

const jobTypeList = ['งานปัจจุบัน', 'งานที่เสร็จสิ้น'];

// export function
const JobsMenu = () => {
  const { data: session } = useSession();
  const [jobType, setJobType] = useState('งานปัจจุบัน');
  const [startDateSortOption, setStartDateSortOption] = useState("-");
  const [endDateSortOption, setEndDateSortOption] = useState("-");
  const [priceSortOption, setPriceSortOption] = useState("-");
  const [applicantsSortOption, setApplicantsSortOption] = useState("-");
  const [isOpeningSideBar, setIsOpeningSideBar] = useState(false);
  const [pendingJobs, setPendingJobs] = useState<JobCardType[]>([]);
  const [doneJobs, setDoneJobs] = useState<JobCardType[]>([]);

  useEffect(() => {
    async function fetchData() {
      if (session) {
        try {
          // session.user.id
          const [pendingJobs, doneJobs] = await fetchInitialData(
            "92e60ed5-51d8-4875-bb4e-5760a09a0449",
          );
          setPendingJobs(
            pendingJobs.filter((jobCard) => !jobCard.isDeleted),
          );
          setDoneJobs(doneJobs.filter((jobCard) => !jobCard.isDeleted));
        } catch (err) {
          console.log("Fetching user's jobs error :", err);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {/* Toggle between PendingJobsPanel and DoneJobsPanel based on the value of isPending. */}
      <JobToggler status={jobType} setStatus={setJobType} statusList={jobTypeList} />
      

      {/* Sort button and Create Work button */}
      <section className="my-3">
        <div className="flex flex-row gap-2 justify-end">
          {/* This is made to contain height consistency */}
          <div className="bg-transparent text-transparent py-2">|</div>

          {/* Sort button */}
          <button
            className="bg-slate-300 font-medium text-md rounded-md px-3 py-2 hover:shadow-md lg:hidden"
            onClick={() => {
              setIsOpeningSideBar(true);
            }}
          >
            <div className="flex align-center">
              <SortAscendingOutlined className="flex place-items-center" />
              <p>จัดเรียง</p>
            </div>
          </button>

          {/* Create Work button */}
          <Link href={"/jobs/create"} key={"createJob"}>
            <button
              className={`${jobType === 'งานปัจจุบัน' ? "" : "hidden"} bg-slate-900 font-medium text-md text-white rounded-md px-3 py-2 hover:shadow-md`}
            >
              สร้างงาน
            </button>
          </Link>
        </div>
      </section>

      <div className="lg:flex lg:flex-row lg:justify-between gap-2">
        {/* PendingJobsPanel and DoneJobsPanel */}
        {jobType === 'งานปัจจุบัน' ? (
          <JobsPanel
            startDateSortOption={startDateSortOption}
            endDateSortOption={endDateSortOption}
            priceSortOption={priceSortOption}
            applicantsSortOption={applicantsSortOption}
            data={pendingJobs}
            isPending={jobType === 'งานปัจจุบัน'}
          ></JobsPanel>
        ) : (
          <JobsPanel
            startDateSortOption={startDateSortOption}
            endDateSortOption={endDateSortOption}
            priceSortOption={priceSortOption}
            applicantsSortOption={applicantsSortOption}
            data={doneJobs}
            isPending={jobType === 'งานปัจจุบัน'}
          ></JobsPanel>
        )}

        {/* Sidebar for sorting for laptop */}
        <aside className="hidden lg:flex lg:flex-col bg-slate-50 rounded-sm pt-7 pb-2 px-4 w-[200px] h-fit shadow-xl">
          <div className="text-2xl font-semibold">จัดเรียง</div>
          <div className="text-lg font-semibold mt-4 mb-2 text-slate-800">
            ช่วงเวลา
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <p className="font-medium text-[16px] text-slate-800 mb-1">
              วันที่เริ่มต้น
            </p>
            <select
              value={startDateSortOption}
              onChange={(e) => {
                setStartDateSortOption(e.target.value);
              }}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
            >
              <option value="">-</option>
              <option value="asc">น้อยไปมาก</option>
              <option value="desc">มากไปน้อย</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-medium text-[16px] text-slate-800 mb-1">
              วันที่สิ้นสุด
            </p>
            <select
              value={endDateSortOption}
              onChange={(e) => {
                setEndDateSortOption(e.target.value);
              }}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
            >
              <option value="">-</option>
              <option value="asc">น้อยไปมาก</option>
              <option value="desc">มากไปน้อย</option>
            </select>
          </div>
          <div className="text-lg font-semibold mt-4 mb-2 text-slate-800">
            ราคา
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <select
              value={priceSortOption}
              onChange={(e) => {
                setPriceSortOption(e.target.value);
              }}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
            >
              <option value="">-</option>
              <option value="asc">น้อยไปมาก</option>
              <option value="desc">มากไปน้อย</option>
            </select>
          </div>
          <div className="text-lg font-semibold mt-4 mb-2 text-slate-800">
            จำนวนผู้สมัคร
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <select
              value={applicantsSortOption}
              onChange={(e) => {
                setApplicantsSortOption(e.target.value);
              }}
              className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
            >
              <option value="">-</option>
              <option value="asc">น้อยไปมาก</option>
              <option value="desc">มากไปน้อย</option>
            </select>
          </div>
          <div className="mt-2">
            <button
              onClick={() => {
                setStartDateSortOption("");
                setEndDateSortOption("");
                setPriceSortOption("");
                setApplicantsSortOption("");
              }}
              className="w-full min-h-[40px] text-slate-700 text-[16px] rounded-md hover:bg-slate-200 focus:ring-2 focus:outline-none focus:ring-slate-300"
            >
              ล้าง
            </button>
          </div>
        </aside>

        {/* Overlay for sidebar for sorting for mobile */}
        {isOpeningSideBar ? (
          <>
            <div className="z-10 bg-neutral-800 opacity-60 fixed top-0 right-0 left-0 bottom-0 lg:hidden"></div>
            <aside className="fixed font-ibm z-20 bg-slate-50 text-slate-900 top-0 left-0 w-2/3 h-screen flex flex-col items-center pt-7 px-7 pb-40 md:pb-7 justify-between lg:hidden overflow-y-auto">
              <div className="flex flex-col gap-8 justify-start w-full">
                <div className="flex flex-row justify-between">
                  <div className="text-3xl font-bold text-slate-800 mb-6">
                    จัดเรียง
                  </div>
                  <CloseOutlined
                    onClick={() => {
                      setIsOpeningSideBar(false);
                    }}
                  />
                </div>

                <div className="text-xl font-bold text-slate-800 mt-2">
                  ช่วงเวลา
                </div>
                <div className="flex flex-row justify-between gap-2">
                  <div className="flex flex-col w-full">
                    <p className="font-medium text-[16px] text-slate-800 mb-1">
                      วันที่เริ่มต้น
                    </p>
                    <select
                      value={startDateSortOption}
                      onChange={(e) => {
                        setStartDateSortOption(e.target.value);
                      }}
                      className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
                    >
                      <option value="">-</option>
                      <option value="asc">น้อยไปมาก</option>
                      <option value="desc">มากไปน้อย</option>
                    </select>
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="font-medium text-[16px] text-slate-800 mb-1">
                      วันที่สิ้นสุด
                    </p>
                    <select
                      value={endDateSortOption}
                      onChange={(e) => {
                        setEndDateSortOption(e.target.value);
                      }}
                      className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
                    >
                      <option value="">-</option>
                      <option value="asc">น้อยไปมาก</option>
                      <option value="desc">มากไปน้อย</option>
                    </select>
                  </div>
                </div>

                <div className="text-xl font-bold text-slate-800 mt-2">
                  ราคา
                </div>
                <div className="flex flex-col gap-2 mb-2">
                  <select
                    value={priceSortOption}
                    onChange={(e) => {
                      setPriceSortOption(e.target.value);
                    }}
                    className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
                  >
                    <option value="">-</option>
                    <option value="asc">น้อยไปมาก</option>
                    <option value="desc">มากไปน้อย</option>
                  </select>
                </div>
                <div className="text-xl font-bold text-slate-800 mt-2">
                  จำนวนผู้สมัคร
                </div>
                <div className="flex flex-col gap-1 mb-2">
                  <select
                    value={applicantsSortOption}
                    onChange={(e) => {
                      setApplicantsSortOption(e.target.value);
                    }}
                    className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
                  >
                    <option value="">-</option>
                    <option value="asc">น้อยไปมาก</option>
                    <option value="desc">มากไปน้อย</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-2 w-full mt-8 md:mt-0">
                <button
                  onClick={() => {
                    setStartDateSortOption("");
                    setEndDateSortOption("");
                    setPriceSortOption("");
                    setApplicantsSortOption("");
                  }}
                  className="w-1/2 min-h-[40px] text-slate-700 text-[16px] rounded-md hover:bg-slate-200 focus:ring-2 focus:outline-none focus:ring-slate-300"
                >
                  ล้าง
                </button>
                <button
                  className="w-1/2 min-h-[40px] text-white text-[16px] rounded-md bg-slate-700 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300"
                  onClick={() => {
                    setIsOpeningSideBar(false);
                  }}
                >
                  จัดเรียง
                </button>
              </div>
            </aside>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default JobsMenu;
