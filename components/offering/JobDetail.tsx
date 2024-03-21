"use server";

import getJobById from "@/actions/jobs/getJobByID";
import EmployerDetail from "./EmployerDetail";
import FileBox from "./FileBox";

type Props = {
  jobId: string;
  isStudentView: boolean;
  isHistory?: boolean;
};

const fileText = require("@/public/icons/fileText.svg") as string;

export default async function JobDetail({ jobId, isStudentView, isHistory }: Props) {
  // Hard code
  const url = "https://skillbridge-s3.s3.us-east-1.amazonaws.com/962a92f777f202f9879d18cd445d630c41fd4f80dd80dd561757463fa1d29733?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVRUVUMB3ZFAZRNTX%2F20240321%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240321T191517Z&X-Amz-Expires=3600&X-Amz-Signature=6397ebb58729020be8f27461ee16477b303c5b1bf56c792fb0b6491c0cb9e1c5&X-Amz-SignedHeaders=host&x-id=GetObject"
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
    middleName: job.userName.middlename ? job.userName.middlename : "",
    lastName: job.userName.lastname,
    position: job.position,
    organization: job.organization,
  };

  const FormattedDate = (inputDateString: string) => {
    const [day, month, year] = inputDateString.split("/");

    const formattedYear = year.slice(-2);
    const formattedDay = day.padStart(2, "0");
    const formattedMonth = month.padStart(2, "0");

    return `${formattedDay}/${formattedMonth}/${formattedYear}`;
  };

  return (
    <>
      <div className="w-full rounded-t-[9.54px] border-slate-300 border-[0.5px] border-b-0 flex flex-col px-6 py-4 max-w-[600px] md:w-[50vw] lg:w-[45vw]">
        <div className="font-bold text-[24px] text-[#313866] lg:text-[30px]">
          {jobData.title}
        </div>
        <div className="text-[14px] text-slate-800 mt-3 lg:text-[16px]">
          <span className="font-semibold">หมวดหมู่</span>
          <span className="inline-block bg-slate-200 rounded py-1 px-2 ml-2">
            {jobData.jobTagTitle}
          </span>
        </div>
        <div className="flex flex-col mt-4">
          <div className="font-semibold text-[14px] text-slate-800 mb-1 lg:text-[16px]">
            คำอธิบายเกี่ยวกับงาน
          </div>
          <hr className="border-slate-300" />
          <div className="text-[14px] text-slate-800 my-[9px] lg:text-[16px]">
            {jobData.description}
          </div>
          {/* {!isHistory && <hr className="border-slate-300 mb-3" />} */}
          <div className="flex flex-row items-center">
            <div className="text-[14px] text-slate-800 lg:text-[16px] mr-2">
              รายละเอียดเพิ่มเติม:
            </div>
            <div className="w-fit">
              <FileBox url={url} src={fileText} text="รายละเอียดงาน" />
            </div>
          </div>

          {!isHistory && <hr className="border-slate-300 mt-3" />}
        </div>
        {!isHistory && (
          <div>
            <div className="flex flex-row justify-between mt-4 lg:mt-5">
              <div className="flex flex-col text-[15px] text-slate-600 lg:text-[17px] lg:gap-2">
                <div>
                  <span className="font-semibold">วันเริ่มต้นงาน : </span>
                  <span className="font-medium">
                    {jobData.estimateStartDate
                      ? FormattedDate(jobData.estimateStartDate)
                      : "ไม่มีกำหนด"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">วันสิ้นสุดงาน : </span>
                  <span className="font-medium">
                    {jobData.estimateEndDate
                      ? FormattedDate(jobData.estimateEndDate)
                      : "ไม่มีกำหนด"}
                  </span>
                </div>
              </div>
              <div>
                <div className="flex flex-col text-[15px] items-end lg:text-[17px] lg:gap-2">
                  {/* To show in student's view */}
                  {isStudentView && (
                    <div className="font-semibold text-green-600">
                      ยังเปิดรับอยู่
                    </div>
                  )}
                  {/* To show in employer's view */}
                  {!isStudentView && (
                    <div className="text-[#313866]">
                      <span className="font-medium">ค่าจ้างที่ตั้งไว้ : </span>
                      <span className="font-semibold">
                        ฿{jobData.budget.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="text-[#838383]">
                    <span className="font-medium">รับแล้ว : </span>
                    <span className="font-semibold">
                      {jobData.acceptNum} / {jobData.maxAcceptNum}
                    </span>
                    <span className="font-medium"> คน</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <EmployerDetail employerData={employerData} />
    </>
  );
}
