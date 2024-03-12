"use server"

import getJobById from "@/actions/getJobByID"
import EmployerDetail from "./EmployerDetail";

type Props = {
    jobId: string,
    isStudentView: boolean
};

export default async function JobDetail({ jobId, isStudentView }: Props) {
    const job = await getJobById(jobId);
    if (!job) return;

    const jobData = {
        title: job.title,
        description: job.description ? job.description : "",
        budget: job.budget.toString(),
        acceptNum: job.acceptNum.toString(),
        maxAcceptNum: job.maxAcceptNum.toString(),
        estimateStartDate: job.estimateStartDate,
        estimateEndDate: job.estimateEndDate,
        jobTagTitle: job.jobTags,
    };

    const employerData = {
        firstName: job.userName.firstname,
        middleName: job.userName.middleName ? job.userName.middleName : "",
        lastName: job.userName.lastName,
        position: job.position,
        organization: job.organization
    }

    const FormattedDate = (inputDateString: string) => {
        const [day, month, year] = inputDateString.split("/");

        const formattedYear = year.slice(-2);
        const formattedDay = day.padStart(2, "0");
        const formattedMonth = month.padStart(2, "0");

        return `${formattedDay}/${formattedMonth}/${formattedYear}`;
    };

    return (
        <>
            <div className="w-full rounded-t-[9.54px] border-slate-300 border-[0.5px] border-b-0 flex flex-col px-6 py-4 md:w-[390px] lg:w-[543px]">
                <div className="font-bold text-[24px] text-[#313866] h-[3em] line-clamp-2 lg:text-[30px]">{jobData.title}</div>
                <div className="text-[14px] text-slate-800 mt-3 lg:text-[16px]">
                    <span className="font-semibold">หมวดหมู่</span>
                    <span className="inline-block bg-slate-200 rounded py-1 px-2 ml-2">
                        {jobData.jobTagTitle}
                    </span>
                </div>
                <div className="flex flex-col mt-4">
                    <div className="font-semibold text-[14px] text-slate-800 mb-1">
                        คำอธิบายเกี่ยวกับงาน
                    </div>
                    <hr className="border-slate-300" />
                    <div className="text-[14px] text-[#838383] my-[9px]">
                        {jobData.description}
                    </div>
                    <hr className="border-slate-300" />
                </div>
                <div className="flex flex-row justify-between mt-4">
                    <div className="flex flex-col text-[15px] text-slate-600">
                        <div><span className="font-semibold">วันเริ่มต้นงาน : </span><span className="font-medium">{jobData.estimateStartDate ? FormattedDate(jobData.estimateStartDate) : "ไม่มีกำหนด"}</span></div>
                        <div><span className="font-semibold">วันสิ้นสุดงาน : </span><span className="font-medium">{jobData.estimateEndDate ? FormattedDate(jobData.estimateEndDate) : "ไม่มีกำหนด"}</span></div>
                    </div>
                    <div>
                        <div className="flex flex-col text-[15px] items-end">
                            {/* To show in student's view */}
                            {isStudentView && <div className="font-semibold text-green-600">ยังเปิดรับอยู่</div>}
                            {/* To show in employer's view */}
                            {!isStudentView && <div className="text-[#313866]"><span className="font-medium">ค่าจ้างที่ตั้งไว้ : </span><span className="font-semibold">฿{jobData.budget.toLocaleString()}</span></div>}
                            <div className="text-[#838383]"><span className="font-medium">รับแล้ว : </span><span className="font-semibold">{jobData.acceptNum} / {jobData.maxAcceptNum}</span><span className="font-medium"> คน</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <EmployerDetail employerData={employerData} />
        </>
    )
}