"use client";

import { fetchGetStudentByJob } from "@/lib/Jobs/fetchInitialData";
import { Student } from "@/types/StudentType";
import React, { useEffect, useState } from "react";
import SearchNotFound from "../searchJob/SearchNotFound";
import StudentOfferCard from "../jobs/employerJobs/studentOfferCard";

type Props = {
  jobId: string;
};

function JobManagePanel({ jobId }: Props) {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<Array<Student>>([]);

  useEffect(() => {
    async function fetchData(filter: string) {
      const fetchedData = await fetchGetStudentByJob(jobId, filter);
      setFetchedData(fetchedData);
    //   console.log(fetchedData)
    }
    setLoading(true);
    fetchData(filter);
    setLoading(false);
  }, [filter, jobId]);
  return (
      <aside className="flex flex-col gap-4 w-full">
          <div className="flex flex-row gap-4">
              <p className="font-semibold text-2xl line-clamp-2 flex items-center">
                  สถานะนิสิต
              </p>
              <select
                  className="rounded-md text-sm py-1 px-2 border-2 border-slate-300 bg-slate-50"
                  name="filter"
                  title="filter"
                  value={filter}
                  onChange={(e) => {
                      setFilter(e.target.value);
                  }}
              >
                  <option value="">ทั้งหมด</option>
                  <option value="PENDING">สมัคร</option>
                  <option value="DISCLAIMED">สละสิทธิ์</option>
                  <option value="ACCEPTED">กำลังรอ</option>
                  <option value="DEPOSIT_PENDING">รอจ่ายมัดจำ</option>
                  <option value="IN_PROGRESS">รอส่งมอบงาน</option>
                  <option value="DELIVERED">ส่งมอบงานแล้ว</option>
                  <option value="WAGE_PAYMENT_PENDING">รอจ่ายค่าจ้าง</option>
                  <option value="DONE">เสร็จสิ้น</option>
                  <option value="CANCELED">ยกเลิก</option>
              </select>
          </div>

          <aside className={`${isLoading ? "hidden" : ""} flex flex-col gap-3`}>
              {fetchedData.length === 0 ? (
                  <div className="flex justify-center items-center">
                      <SearchNotFound text="ไม่พบการสมัครงานของนิสิต" />
                  </div>
              ) : (
                  fetchedData?.map((student, index) => {
                      const name = `${student.salutation}${student.firstname}${student.middlename ? ` ${student.middlename} ` : " "}${student.lastname}`;
                      return (
                          <div key={index}>
                              <StudentOfferCard
                                  studentId={student.userId}
                                  jobId={jobId}
                                  studentName={name}
                                  applicationDate={student.createdAt}
                                  status={student.status}
                                  price={student.bid}
                              />
                          </div>
                      );
                  })
              )}
          </aside>

          <div className={`${isLoading ? "" : "hidden"} flex justify-center items-center`}>
              <p className="text-xl">กำลังโหลดข้อมูล ...</p>
          </div>
      </aside>
  );
}

export default JobManagePanel;
