"use client";

import React, { useState } from "react";
import JobToggler from "./JobToggler";
import Sorter from "./Sorter";
import StudentJobsPanel from "./StudentJobsPanel";
import filterStudentJobs from "@/lib/Jobs/filterJobToggler";
import StudentDoneJobsPanel from "./StudentDoneJobsPanel";


// 1st and 2nd tab
// ignore userId
const data = [
	{
		userId: "001",
		jobId: "001",
		title: "รับสมัคร TA วิชา Comp Prog",
		startDate: "18/10/2545",
		endDate: "21/10/2545",
		category: "การสอน",
		status: "กำลังรอ",
	},
	{
		userId: "001",
		jobId: "001",
		title: "รับสมัคร TA วิชา Comp Prog",
		startDate: "18/10/2545",
		endDate: "21/10/2545",
		category: "การสอน",
		status: "ผ่านการคัดเลือก",
	},
	{
		userId: "001",
		jobId: "001",
		title: "รับสมัคร TA วิชา Comp Prog",
		startDate: "18/10/2545",
		endDate: "21/10/2545",
		category: "การสอน",
		status: "ไม่ผ่านการคัดเลือก",
	},
	{
		userId: "001",
		jobId: "001",
		title: "รับสมัคร TA วิชา Comp Prog",
		startDate: "18/10/2545",
		endDate: "21/10/2545",
		category: "การสอน",
		status: "รอส่งมอบงาน",
	},
	{
		userId: "001",
		jobId: "001",
		title: "รับสมัคร TA วิชา Comp Prog",
		startDate: "18/10/2545",
		endDate: "21/10/2545",
		category: "การสอน",
		status: "รอผู้จ้างจ่ายมัดจำ",
	},
	{
		userId: "001",
		jobId: "001",
		title: "รับสมัคร TA วิชา Comp Prog",
		startDate: "18/10/2545",
		endDate: "21/10/2545",
		category: "การสอน",
		status: "รอผู้จ้างจ่ายค่าจ้าง",
	},

	{
		userId: "001",
		jobId: "001",
		title: "รับสมัคร TA วิชา Comp Prog",
		startDate: "18/10/2545",
		endDate: "21/10/2545",
		category: "การสอน",
		status: "เสร็จสิ้น",
	},
	{
		userId: "001",
		jobId: "001",
		title: "รับสมัคร TA วิชา Comp Prog sdfasdfasdfsdsdafasdfsdfasdfasdfasdfasdfasdfasdfasfasfasdfsdfsdfsadfasdfasdfasdf",
		startDate: "18/10/2545",
		endDate: "21/10/2545",
		category: "การสอน",
		status: "ถูกยกเลิกงาน",
	},
];

// 3rd tab
const doneData = [{
jobId: '234324',
isDeleted: false,
  name: 'Comp Progdcsfe',
  budget: 50000,
  description: 'tewtstes',
  category: 'Dick',
  applicants: 50,
  maxApplicants: 100,
  startDate: "2/2/3",
  endDate: "5/2/3",
  isPending: false,
}]

type Props = {};

const jobTypeList = ["งานที่กำลังสมัคร", "งานปัจจุบัน", "งานที่เสร็จสิ้น"];

const StudentJobsMenu = (props: Props) => {
	const [jobType, setJobType] = useState("งานที่กำลังสมัคร");
	const [isOpeningSideBar, setIsOpeningSideBar] = useState(false);
	const [startDateSortOption, setStartDateSortOption] = useState("-");
	const [endDateSortOption, setEndDateSortOption] = useState("-");
	const [statusSortOption, setStatusSortOption] = useState("-");

	const sortOptions = [
		{ name: "วันที่เริ่มต้น", value: startDateSortOption, set: setStartDateSortOption },
		{ name: "วันที่สิ้นสุด", value: endDateSortOption, set: setEndDateSortOption },
		{ name: "สถานะ", value: statusSortOption, set: setStatusSortOption },
	];

	return (
		<>
			{/* Toggle between PendingJobsPanel and DoneJobsPanel based on the value of isPending. */}
			<JobToggler
				status={jobType}
				setStatus={setJobType}
				statusList={jobTypeList}
			/>

			{/* Sort button */}
			<section className="my-3">
				<div className="flex flex-row gap-2 justify-end">
					{/* This is made to contain height consistency */}
					<div className="bg-transparent text-transparent py-2">
						|
					</div>

					{/* Sort button */}
					{jobType !== "งานที่เสร็จสิ้น" ? <Sorter
						sideBarState={{
							name: "sidebar",
							value: isOpeningSideBar,
							set: setIsOpeningSideBar,
						}}
						sortOptions={sortOptions}
					/> : ''}
				</div>
			</section>

			{/* show jobs */}
			<div>
				{/* applied, current, done jobs */}
				{jobType === "งานที่กำลังสมัคร" ? (
					<StudentJobsPanel
						startDateSortOption={startDateSortOption}
						endDateSortOption={endDateSortOption}
						statusSortOption={statusSortOption}
						data={data.filter((arg) => filterStudentJobs(arg, jobType))}
					/>
				) : jobType === "งานปัจจุบัน" ? (
					<StudentJobsPanel
						startDateSortOption={startDateSortOption}
						endDateSortOption={endDateSortOption}
						statusSortOption={statusSortOption}
						data={data.filter((arg) => filterStudentJobs(arg, jobType))}
					/>
				) : (
					<StudentDoneJobsPanel data={doneData} />
				)}
			</div>
		</>
	);
};

export default StudentJobsMenu;