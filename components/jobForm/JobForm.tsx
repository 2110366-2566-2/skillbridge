"use client";

// import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import Link from "next/link";
import Input from "../input/input/Input";
import TextAreaInput from "../input/textAreaInput/TextAreaInput";
import SelectInput from "../input/selectInput/SelectInput";
import FilesInput from "../input/fileInput/FileInput";
import createJob from "@/actions/create_task";
import deleteJob from "@/actions/delete_task";

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
  budget: string;
  numWorker: string;
  estimateStartDate: string;
  estimateEndDate: string;
  jobTag: string;
  files: FileList | null;
}

interface FormErrors {
  title?: string;
  budget?: string;
  numWorker?: string;
  estimateStartDate?: string;
  estimateEndDate?: string;
  jobTag?: string;
}

interface Props {
  isUpdate: boolean;
}

export default function JobForm(props: Props) {
  // const router = useRouter();
  const { isUpdate } = props;
  const [files, setFiles] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    budget: "",
    numWorker: "",
    estimateStartDate: "",
    estimateEndDate: "",
    jobTag: "",
    files: null,
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validate the form data
    const errors: FormErrors = {};
    if (!formData.title) {
      errors.title = "กรุณากรอกชื่องาน";
    }
    if (!formData.budget) {
      errors.budget = "กรุณากรอกงบประมาณ";
    }
    if (!formData.numWorker) {
      errors.numWorker = "กรุณากรอกจำนวนคน";
    }
    if (!formData.estimateStartDate) {
      errors.estimateStartDate = "กรุณากรอกวันที่เริ่มงาน";
    }
    if (!formData.estimateEndDate) {
      errors.estimateEndDate = "กรุณากรอกวันที่สิ้นสุดงาน";
    }
    if (!formData.jobTag) {
      errors.jobTag = "กรุณาเลือกหมวดหมู่งาน";
    }

    // If there are errors, update the state to display warnings
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // TODO : send file to test in some test API.
      // if (files) formData.files = files;
      if (!isUpdate) {
        // Create job action
        console.log(formData);
        createJob(formData);
      } else {
        // Update job action
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3">
        <Input
          type="text"
          label="ชื่องาน"
          value={formData.title}
          name="title"
          placeholder="งานของฉัน"
          errorMessage={formErrors.title}
          onChange={handleChange}
        />

        <TextAreaInput
          label="คำอธิบายเกี่ยวกับงาน (ไม่บังคับ)"
          value={formData.description}
          name="description"
          placeholder="ฉันอยากจ้างใครสักคนเพื่อมาทำงานให้ฉัน"
          errorMessage={""}
          onChange={handleChange}
        />

        <FilesInput
          label="รายละเอียดเกี่ยวกับงาน (ไม่บังคับ)"
          files={files}
          setFiles={setFiles}
        />

        <Input
          type="number"
          label="งบประมาณ"
          value={formData.budget}
          name="budget"
          placeholder="1000 บาท"
          errorMessage={formErrors.budget}
          onChange={handleChange}
        />

        <Input
          type="number"
          label="จำนวนคนที่จ้าง"
          value={formData.numWorker}
          name="numWorker"
          placeholder="1"
          errorMessage={formErrors.numWorker}
          onChange={handleChange}
        />

        <div className="flex justify-between gap-3">
          <Input
            type="date"
            label="วันที่เริ่มงาน"
            value={formData.estimateStartDate}
            name="estimateStartDate"
            placeholder="วว/ดด/ปปปป"
            errorMessage={formErrors.estimateStartDate}
            onChange={handleChange}
          />

          <Input
            type="date"
            label="วันที่สิ้นสุดงาน"
            value={formData.estimateEndDate}
            name="estimateEndDate"
            placeholder="วว/ดด/ปปปป"
            errorMessage={formErrors.estimateEndDate}
            onChange={handleChange}
          />
        </div>

        <SelectInput
          label="หมวดหมู่งาน"
          value={formData.jobTag}
          options={jobList}
          name="jobTag"
          title="jobtag"
          placeholder="เลือกหมวดหมู่ที่ต้องการ"
          errorMessage={formErrors.jobTag}
          onChange={handleChange}
        />

        <div className="flex justify-between">
          <div className="flex-grow"></div>
          <div className="flex flex-row gap-2">
            <button
              // onClick={() => router.back()}
              className="border border-slate-300 px-[16px] py-[8px] text-slate-800 text-[14px] rounded-[6px] hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-300"
            >
              ยกเลิก
            </button>
            {isUpdate && (
              <button
                type="submit"
                className="border border-slate-300 px-[16px] py-[8px] text-white text-[14px] rounded-[6px] bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
              >
                ลบงาน
              </button>
            )}
            <button
              type="submit"
              className="border border-slate-300 px-[16px] py-[8px] text-white text-[14px] rounded-[6px] bg-slate-800 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300"
            >
              {isUpdate ? "ยืนยันการแก้ไข" : "สร้างงาน"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
