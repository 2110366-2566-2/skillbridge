import { EditFilled } from "@ant-design/icons";
import React from "react";
import Link from "next/link";

type Props = {
  jobId: string;
  name: string;
  budget: Number;
  description: string;
  category: string;
  applicants: Number;
  maxApplicants: Number;
  startDate: Date;
  endDate: Date;
  isPending: Boolean;
};

const JobCard = ({
  jobId,
  name,
  budget,
  description,
  category,
  applicants,
  maxApplicants,
  startDate,
  endDate,
  isPending,
}: Props) => {
  return (
    <div className="bg-gradient-to-r from-slate-100 px-5 pt-7 pb-2 rounded-3xl shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-200 max-w-[500px]">
      <div className="flex flex-row justify-between">
        <div className="w-[85%]">
          <div className="h-[60px]">
            {/* note: if it is pending -> show the link to manage the job
                      note: if it is done -> show the link to view the job history */}
            <Link href={isPending ? `/jobs/${jobId}/manage` : `/jobs`}>
              <p className="font-semibold text-2xl line-clamp-2 hover:underline">
                {name}
              </p>
            </Link>
          </div>
          <div className="font-medium my-2">
            {startDate.toLocaleDateString('en-GB')} - {endDate.toLocaleDateString('en-GB')}
          </div>
        </div>

        <div
          className={`${isPending ? "hidden" : ""} h-[34.91px] w-[34.91px] p-2 mx-2`}
        ></div>
        <Link
          className={`${isPending ? "" : "hidden"} bg-slate-50 border-2 border-solid rounded-full hover:shadow-md flex align-center w-fit h-fit p-2 mx-2`}
          href={`/jobs/${jobId}/update`}
        >
          <EditFilled />
        </Link>
      </div>

      <div className="bg-slate-200 rounded-sm p-2 w-fit">{category}</div>

      <div className="font-medium text-sm mt-3">คำอธิบายเกี่ยวกับงาน</div>
      <hr className="mb-2" />

      <div className="text-sm line-clamp-2 h-10">{description}</div>
      <hr className="my-2" />

      <div className="flex flex-row align-text-bottom justify-between">
        <div className="text-sm">
          รับแล้ว {applicants.toString()}/{maxApplicants.toString()} คน
        </div>
        <div className="text-xl text-end font-medium">
          ฿{budget.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
