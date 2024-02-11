"use client";

import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

const jobList = [
  "กราฟิกดีไซน์",
  "สถาปัตย์",
  "ตกแต่งภายใน",
  "ศิลปะและภาพวาด",
  "ออกแบบ UX UI",
  "พัฒนาแอพฯมือถือ",
  "พัฒนาเว็ปไซต์",
  "ไอทีโซลูชั่น",
  "งาน IOT",
  "อินฟลูเอนเซอร์",
  "สื่อออนไลน์",
  "แอดมินออนไลน์",
  "ไลฟ์สไตล์",
  "พัฒนาตัวเอง",
  "ธุรกิจและการเงิน",
  "รูปภาพและวีดีโอ",
  "แต่งหน้า",
  "สไตลิสต์",
  "นักแสดง",
  "นักพากย์เสียง",
  "นักร้อง / นักดนตรี",
  "ซาวด์เอ็นจิเนียร์",
  "งานเขียน",
  "ภาษา",
  "อื่น ๆ",
];

interface FormData {
  title: string;
  description: string;
  file: string;
  budget: string;
  numWorker: string;
  estimateStartDate: string;
  estimateEndDate: string;
  jobTag: string;
}

interface FormErrors {
  title: string;
  budget: string;
  numWorker: string;
  estimateStartDate: string;
  estimateEndDate: string;
  jobTag: string;
}

export default function JobForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    file: "",
    budget: "",
    numWorker: "",
    estimateStartDate: "",
    estimateEndDate: "",
    jobTag: "",
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: "",
    budget: "",
    numWorker: "",
    estimateStartDate: "",
    estimateEndDate: "",
    jobTag: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error message when the user starts typing
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the form data
    const errors: FormErrors = {
      title: "",
      budget: "",
      numWorker: "",
      estimateStartDate: "",
      estimateEndDate: "",
      jobTag: "",
    };
    if (!formData.title) {
      errors.title = "First Name is required";
    }
    if (!formData.budget) {
      errors.budget = "Last Name is required";
    }
    if (!formData.numWorker) {
      errors.numWorker = "Email is required";
    }
    if (!formData.estimateStartDate) {
      errors.estimateStartDate = "Message is required";
    }
    if (!formData.estimateEndDate) {
      errors.estimateEndDate = "Message is required";
    }
    if (!formData.jobTag) {
      errors.jobTag = "Message is required";
    }

    // If there are errors, update the state to display warnings
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // Perform actions with valid form data (e.g., send data to server)
      console.log(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-slate-900">
            ชื่องาน
          </label>
          <input
            className={
              `bg-transparent text-[16px] font-regular leading-[24px] h-[40px] pl-[12px] py-[8px] pr-[56px] rounded-[6px] border border-slate-300 placeholder:text-slate-400 ` +
              (formErrors.title && "border-red-600")
            }
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="งานของฉัน"
          />
          <span className="h-[14px] text-[14px] text-red-600">
            {formErrors.title && formErrors.title}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-slate-900">
            คำอธิบายเกี่ยวกับงาน (ไม่บังคับ)
          </label>
          <textarea
            className="bg-transparent text-[14px] font-regular leading-[20px] py-[8px] px-[12px] min-h-[86px] rounded-[6px] border border-slate-300 placeholder:text-slate-400"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="ฉันอยากจ้างใครสักคนเพื่อมาทำงานให้ฉัน"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-slate-900">
            งบประมาณ
          </label>
          <input
            className="bg-transparent text-[16px] font-regular leading-[24px] h-[40px] pl-[12px] py-[8px] pr-[56px] rounded-[6px] border border-slate-300 placeholder:text-slate-400"
            type="text"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="1000 บาท"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-slate-900">
            จำนวนคนที่จ้าง
          </label>
          <input
            className="bg-transparent text-[16px] font-regular leading-[24px] h-[40px] pl-[12px] py-[8px] pr-[56px] rounded-[6px] border border-slate-300 placeholder:text-slate-400"
            type="number"
            name="numWorker"
            value={formData.numWorker}
            onChange={handleChange}
            placeholder="1"
          />
        </div>
        <div className="flex justify-between gap-3">
          <div className="flex flex-col gap-1 flex-grow">
            <label className="text-[14px] font-medium text-slate-900">
              วันที่เริ่มงาน
            </label>
            <input
              className="bg-transparent border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:border-slate-500 block w-full p-2"
              type="date"
              name="estimateStartDate"
              value={formData.estimateStartDate}
              onChange={handleChange}
              placeholder="วว/ดด/ปปปป"
            />
          </div>
          <div className="flex flex-col gap-1 flex-grow">
            <label className="text-[14px] font-medium text-slate-900">
              วันที่สิ้นสุดงาน
            </label>
            <input
              className="bg-transparent border border-slate-300 text-slate-800 text-[16px] rounded-lg focus focus:outline-none focus:border-slate-500 block w-full p-2"
              type="date"
              name="estimateEndDate"
              value={formData.estimateEndDate}
              onChange={handleChange}
              placeholder="วว/ดด/ปปปป"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[14px] font-medium text-slate-900">
            จำนวนคนที่จ้าง
          </label>
          <select
            className="bg-transparent border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:border-slate-500 block w-full p-[5.75px]"
            name="jobTag"
            title="jobtag"
            value={formData.jobTag}
            onChange={handleChange}
          >
            <option className="text-slate-400" value="" disabled selected>
              เลือกหมวดหมู่ที่ต้องการ
            </option>
            {jobList.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex-grow"></div>
          <div className="flex flex-row gap-2">
            <button
              type="button"
              className="border border-slate-300 px-[16px] py-[8px] text-slate-800 text-[14px] rounded-[6px] hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-300"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="border border-slate-300 px-[16px] py-[8px] text-white text-[14px] rounded-[6px] bg-slate-800 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300"
            >
              สร้างงาน
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
