"use client";

import { fetchGetStudentByJob } from "@/lib/Jobs/fetchInitialData";
import { Student } from "@/types/StudentType";
import React, { useEffect, useState } from "react";
import StudentOffer from "../studentOffer/studentOffer";
import SearchNotFound from "../searchJob/SearchNotFound";
import { convertStateNameToThai } from "@/lib/Jobs/adapter";

type Props = {
  jobId: string;
};

function JobManagePanel({ jobId }: Props) {
  const [filter, setFilter] = useState<string>("");
  const [fetchedData, setFetchedData] = useState<Array<Student>>([]);

  useEffect(() => {
    async function fetchData(filter: string) {
      const [fetchedData, jobData] = await fetchGetStudentByJob(jobId, filter);
      setFetchedData(fetchedData);
    }

    fetchData(filter);
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
            console.log(filter);
          }}
        >
          <option value="">ทั้งหมด</option>
          <option value="PENDING">สมัคร</option>
          <option value="WITHDRAWN">สละสิทธิ์</option>
          <option value="REJECTED">ปฏิเสธ</option>
          <option value="DEPOSIT_PENDING">รอจ่ายมัดจำ</option>
          <option value="IN_PROGRESS">รอส่งมอบงาน</option>
          <option value="DELIVERED">ส่งมอบงานแล้ว</option>
          <option value="WAGE_PAYMENT_PENDING">รอจ่ายค่าจ้าง</option>
        </select>
      </div>

            <aside className="flex flex-col gap-3">
                {fetchedData.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <SearchNotFound text="ไม่พบการสมัครงานของนิสิต"/>
                    </div>
                ) : (
                    fetchedData?.map((student, index) => {
                        const name = `${student.salutation}${student.firstname}${student.middlename ? ` ${student.middlename} ` : " "}${student.lastname}`;
                        return (
                            <div key={index}>
                                <StudentOffer
                                    studentId={student.userId}
                                    jobId={student.jobId}
                                    studentName={name}
                                    applicationDate={`${student.createdAt.getDate()}/${student.createdAt.getMonth()}/${student.createdAt.getFullYear()}`}
                                    applicationTime={`${student.createdAt.getHours()}:${student.createdAt.getMinutes()} น.`}
                                    status={convertStateNameToThai('employer', student.status)}
                                    price={`฿${student.bid.toLocaleString()}`}
                                />
                            </div>
                        );
                    })
                )}
            </aside>
        </aside>
    );
}

export default JobManagePanel;
