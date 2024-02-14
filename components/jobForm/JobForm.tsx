"use client";

import { revalidatePath } from 'next/cache'
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { customTrim } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Input from "../input/input/Input";
import TextAreaInput from "../input/textAreaInput/TextAreaInput";
import SelectInput from "../input/selectInput/SelectInput";
import FilesInput from "../input/fileInput/FileInput";
import createJob from "@/actions/create_job";
import deleteJob from "@/actions/delete_job";
import updateJob from "@/actions/update_job";
import DeleteModal from "./deleteModal/DeleteModal";
import LoadingButton from "./loadingButton/LoadingButton";
import humanImage from "@/public/images/human.png";
import toast from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateUpdateClick, setCreateUpdateClick] = useState(false);
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
    const errors: FormErrors = {};
    // Validate the form data
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
    if (!isUpdate && new Date(formData.estimateStartDate) < new Date()) {
      errors.estimateStartDate = "วันที่เริ่มงานไม่เป็นปัจจุบัน";
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
      setCreateUpdateClick(true);
      setIsLoading(true);
      const formDataObject = new FormData();
      formDataObject.append(
        "employerId",
        "92e60ed5-51d8-4875-bb4e-5760a09a0449",
      ); // TEMPORARY
      Object.entries(formData).forEach(([key, value]) => {
        formDataObject.append(key, customTrim(value));
      });
      if (files) {
        for (let i = 0; i < files.length; i++) {
          formDataObject.append("files[]", files[i]);
        }
      }
      try {
        if (!isUpdate) {
          // Create Job
          const res = await createJob(formDataObject);
          console.log(res);
          if (res.status === 201) {
            toast.success("สร้างงานสำเร็จ");
          } else {
            toast.error(res.message);
          }
        } else {
          // Update Job
          formDataObject.append("jobId", jobId);
          const res = await updateJob(formDataObject);
          console.log(res);
          if (res.status === 201) {
            toast.success("แก้ไขงานสำเร็จ");
          } else if (res.status === 404) {
            toast.error("ไม่พบงานในระบบ");
          } else if (res.status === 423) {
            toast.error("ไม่สามารถลบงานที่ดำเนินการแล้วได้");
          } else {
            toast.error(res.message);
          }
        }
      } catch (error) {
        console.error("Error Create job:", error);
      } finally {
        router.push("/jobs")
      }
    }
  };

  async function handleDeleteJob() {
    setIsLoading(true);
    try {
      const res = await deleteJob(jobId);
      console.log(res);
      if (res.status === 200) {
        toast.success("ลบงานสำเร็จ");
      } else if (res.status === 404) {
        toast.error("ไม่พบงานในระบบ");
      } else if (res.status === 423) {
        toast.error("ไม่สามารถลบงานที่ดำเนินการแล้วได้");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error Delete job:", error);
    } finally {
      router.push("/jobs");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center lg:p-14 lg:gap-12 xl:gap-24">
      <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:justify-center lg:items-center lg:flex-grow lg:max-w-lg">
        <h1 className="text-[32px] font-semibold self-start leading-7">
          มาหาคนมาทำงานให้คุณกันเถอะ...
          <br />
          <Link
            href="/landing"
            className="underline self-start text-[14px] font-normal"
          >
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 flex-grow lg:max-w-screen-md"
      >
        <Input
          type="text"
          label="ชื่องาน"
          value={formData.title}
          name="title"
          placeholder="งานของฉัน"
          errorMessage={formErrors.title}
          onChange={handleChange}
          isDisabled={isLoading}
        />

        <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-5">
          <TextAreaInput
            label="คำอธิบายเกี่ยวกับงาน (ไม่บังคับ)"
            value={formData.description}
            name="description"
            placeholder="ฉันอยากจ้างใครสักคนเพื่อมาทำงานให้ฉัน"
            errorMessage={""}
            onChange={handleChange}
            isDisabled={isLoading}
          />

          <FilesInput
            label="รายละเอียดเกี่ยวกับงาน (ไม่บังคับ)"
            files={files}
            setFiles={setFiles}
            isDisabled={isLoading}
          />

          <Input
            type="number"
            label="งบประมาณ"
            value={
              formData.budget ? parseInt(formData.budget) : formData.budget
            }
            name="budget"
            placeholder="1000"
            errorMessage={formErrors.budget}
            onChange={handleChange}
            isDisabled={isLoading}
            min="0"
          />

          <Input
            type="number"
            label="จำนวนคนที่จ้าง"
            value={
              formData.numWorker
                ? parseInt(formData.numWorker)
                : formData.numWorker
            }
            name="numWorker"
            placeholder="1"
            errorMessage={formErrors.numWorker}
            onChange={handleChange}
            isDisabled={isLoading}
            min="1"
          />

          <Input
            type="date"
            label="วันที่เริ่มงาน"
            value={formData.estimateStartDate}
            name="estimateStartDate"
            placeholder="วว/ดด/ปปปป"
            errorMessage={formErrors.estimateStartDate}
            onChange={handleChange}
            isDisabled={isLoading}
          />

          <Input
            type="date"
            label="วันที่สิ้นสุดงาน"
            value={formData.estimateEndDate}
            name="estimateEndDate"
            placeholder="วว/ดด/ปปปป"
            errorMessage={formErrors.estimateEndDate}
            onChange={handleChange}
            isDisabled={isLoading}
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
            isDisabled={isLoading}
          />

          <div className="flex justify-between md:justify-center md:items-center md:flex-grow">
            <div className="flex-grow md:hidden"></div>
            <div className="flex flex-row gap-2 md:flex-grow">
              <button
                type="button"
                onClick={() => router.back()}
                className="border border-slate-300 px-[16px] py-[8px] md:py-[12px] text-slate-800 text-[14px] rounded-[6px] hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-300 md:flex-grow disabled:opacity-75"
                disabled={isLoading}
              >
                ยกเลิก
              </button>

              {isUpdate && (
                <DeleteModal
                  deleteAction={handleDeleteJob}
                  isDisabled={isLoading}
                />
              )}

              {isCreateUpdateClick ? (
                <LoadingButton
                  bgColor="bg-slate-700"
                  textColor="text-slate-50"
                  text="กำลังสร้าง..."
                />
              ) : (
                <button
                  type="submit"
                  className="border border-slate-300 px-[16px] py-[8px] md:py-[12px] text-white text-[14px] rounded-[6px] bg-slate-800 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300 md:flex-grow disabled:opacity-75"
                  disabled={isLoading}
                >
                  {isUpdate ? "บันทึก" : "สร้างงาน"}
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
