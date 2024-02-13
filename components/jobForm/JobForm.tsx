"use client";

// import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Input from "../input/input/Input";
import TextAreaInput from "../input/textAreaInput/TextAreaInput";
import SelectInput from "../input/selectInput/SelectInput";
import FilesInput from "../input/fileInput/FileInput";
import createJob from "@/actions/create_task";
import deleteJob from "@/actions/delete_task";
import humanImage from "@/public/images/human.png";
import updateJob from "@/actions/update_job";

interface FormData {
  title: string;
  description: string;
  budget: string;
  numWorker: string;
  estimateStartDate: string;
  estimateEndDate: string;
  jobTagId: string;
}

interface FormErrors {
  title?: string;
  budget?: string;
  numWorker?: string;
  estimateStartDate?: string;
  estimateEndDate?: string;
  jobTagId?: string;
}

interface Props {
  jobTags: {
    id: string;
    title: string | null;
    createdAt: Date;
    updatedAt: Date;
  }[];
  isUpdate: boolean;
  initialData: FormData;
  jobId: string;
}

export default function JobForm(props: Props) {
  const router = useRouter();
  const { isUpdate, jobTags, initialData, jobId } = props;
  const [files, setFiles] = useState<FileList | null>(null);
  const [formData, setFormData] = useState<FormData>(initialData);

  const [formErrors, setFormErrors] = useState<FormErrors>({
    title: "",
    budget: "",
    numWorker: "",
    estimateStartDate: "",
    estimateEndDate: "",
    jobTagId: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    if (
      new Date(formData.estimateStartDate) > new Date(formData.estimateEndDate)
    ) {
      errors.estimateStartDate = "วันที่เริ่มงานต้องมาก่อน";
    }
    if (!formData.jobTagId) {
      errors.jobTagId = "กรุณาเลือกหมวดหมู่งาน";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      let formDataObject = new FormData();
      formDataObject.append(
        "employerId",
        "a9337827-e7cf-4ec4-8601-76fb5518eea1",
      ); // TEMPORARY
      formDataObject.append("title", formData.title);
      formDataObject.append("description", formData.description);
      formDataObject.append("budget", formData.budget);
      formDataObject.append("numWorker", formData.numWorker);
      formDataObject.append("estimateStartDate", formData.estimateStartDate);
      formDataObject.append("estimateEndDate", formData.estimateEndDate);
      formDataObject.append("jobTagId", formData.jobTagId);
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formDataObject.append("files[]", files[i]);
        }
      }
      if (!isUpdate) {
        const res = await createJob(formDataObject);
        console.log(res);
      } else {
        formDataObject.append("jobId", jobId);
        const res = updateJob(formDataObject);
      }
    }
  };

  return (
    <div className="flex justify-center lg:p-14 lg:gap-12 xl:gap-24">
      <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:justify-center lg:items-center lg:flex-grow lg:max-w-lg">
        <h1 className="text-[32px] font-semibold self-start leading-7">
          มาหาคนมาทำงานให้คุณกันเถอะ...
          <br/>
          <Link href="/landing" className="underline self-start text-[14px] font-normal">
            คลิกที่นี่หากคุณสงสัยว่าจะสร้างงานอย่างไร
          </Link>
        </h1>
        
        <Image
          className="lg:pt-5"
          src={humanImage}
          alt="human"
          width={300}
          height={300}
        />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-grow lg:max-w-screen-md">
        <Input
          type="text"
          label="ชื่องาน"
          value={formData.title}
          name="title"
          placeholder="งานของฉัน"
          errorMessage={formErrors.title}
          onChange={handleChange}
        />

        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5">
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
            value={parseInt(formData.budget)}
            name="budget"
            placeholder="1000"
            errorMessage={formErrors.budget}
            onChange={handleChange}
          />

          <Input
            type="number"
            label="จำนวนคนที่จ้าง"
            value={parseInt(formData.numWorker)}
            name="numWorker"
            placeholder="1"
            errorMessage={formErrors.numWorker}
            onChange={handleChange}
          />

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

          <SelectInput
            label="หมวดหมู่งาน"
            value={formData.jobTagId}
            jobTags={jobTags}
            name="jobTagId"
            title="jobTagId"
            placeholder="เลือกหมวดหมู่ที่ต้องการ"
            errorMessage={formErrors.jobTagId}
            onChange={handleChange}
          />

          <div className="flex justify-between md:justify-center md:items-center md:flex-grow">
            <div className="flex-grow md:hidden"></div>
            <div className="flex flex-row gap-2 flex-grow">
              <button
                type="button"
                onClick={() => router.back()}
                className="border border-slate-300 px-[16px] py-[12px] text-slate-800 text-[14px] rounded-[6px] hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-300 flex-grow"
              >
                ยกเลิก
              </button>
              {isUpdate && (
                <button
                  type="submit"
                  className="border border-slate-300 px-[16px] py-[12px] text-white text-[14px] rounded-[6px] bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 flex-grow"
                >
                  ลบงาน
                </button>
              )}
              <button
                type="submit"
                className="border border-slate-300 px-[16px] py-[12px] text-white text-[14px] rounded-[6px] bg-slate-800 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 flex-grow"
              >
                {isUpdate ? "ยืนยันการแก้ไข" : "สร้างงาน"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
