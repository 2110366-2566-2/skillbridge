import { EditFilled } from "@ant-design/icons";
import React from "react";

type Props = {
  name: String;
  budget: Number;
  description: String;
  category: String;
  applicants: Number;
  maxApplicants: Number;
  startDate: String;
  endDate: String;
  isPending: Boolean;
};

const TaskCard = ({
  name,
  budget,
  description,
  category,
  applicants,
  maxApplicants,
  startDate,
  endDate,
  isPending
}: Props) => {
  return (
    <div className="bg-gradient-to-r from-slate-100 px-5 pt-7 pb-2 rounded-3xl shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-slate-200">
      <div className="flex flex-row justify-between">
        <div>
          <div className="font-semibold text-2xl">{name}</div>
          <div className="font-medium my-2">
            {startDate} - {endDate}
          </div>
        </div>

        <div className={`${isPending ? "hidden": ""} h-[34.91px] w-[34.91px] p-2 mx-2`}></div>
        <button
          className={`${isPending ? "" : "hidden"} bg-slate-50 border-2 border-solid rounded-full hover:shadow-md flex align-center w-fit h-fit p-2 mx-2`}
        >
          <EditFilled />
        </button>
      </div>

      <div className="bg-slate-200 rounded-sm p-2 w-fit">{category}</div>

      <div className="font-medium text-sm mt-3">คำอธิบายเกี่ยวกับงาน</div>
      <hr className="mb-2" />

      <div className="text-sm">{description}</div>
      <hr className="my-2" />

      <div className="flex flex-row align-text-bottom justify-between">
        <div className="text-sm">
          รับแล้ว {applicants.toString()}/{maxApplicants.toString()} คน
        </div>
        <div className="text-xl text-end font-medium">฿{budget.toString()}</div>
      </div>
    </div>
  );
};

export default TaskCard;
