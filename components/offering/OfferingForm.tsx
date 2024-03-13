"use client";

import Image from "next/image";
import { useState, FormEvent, ChangeEvent } from "react";
import FilesInput from "../input/fileInput/FileInput";
import NumberInput from "../input/numberInput/NumberInput";
import PrimaryButton from "../buttons/primaryButton/PrimaryButton";
import SecondaryButton from "../buttons/secondaryButton/SecondaryButton";
import DangerModal from "@/components/modal/dangerModal/DangerModal";
import toast from "react-hot-toast";
import createApplication from "@/actions/application/createApplication";

type Props = {
  jobId: string;
  application: {
    bid: number | null;
    applicationStatus: string | null;
    url: string | null;
    budget: number;
    jobStatus: string | null;
  };
};

interface FormData {
  file: File | null;
  bid: number;
  jobId: string;
}

interface FormErrors {
  bid?: number;
}

const questionMarkCircle =
  require("@/public/icons/questionMarkCircle.svg") as string;

export default function OfferingForm({ jobId, application }: Props) {
  const [primaryLoading, setPrimaryLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isShowModal, setShowModal] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUrlInfoVisible, setIsUrlInfoVisible] = useState(false);
  const [isBudgetInfoVisible, setIsBudgetInfoVisible] = useState(false);
  const [isBidInfoVisible, setIsBidInfoVisible] = useState(false);
  const { bid, applicationStatus, url, budget, jobStatus } = application;
  const [formData, setFormData] = useState<FormData>({
    bid: 0,
    file: null,
    jobId: jobId,
  });

  const handleChange = (evt: ChangeEvent) => {
    const changedInput = evt.target as HTMLInputElement; // Type assertion to HTMLInputElement
    const changedField = changedInput.name;
    const newValue = changedInput.value;

    setFormData((currData) => ({
      ...currData,
      [changedField]: newValue,
    }));
    // console.log(changedField, newValue, typeof (newValue))
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: FormErrors = {};
    setPrimaryLoading((prev) => !prev);
    setDisabled(true);
    try {
      formData.file = files && files.length > 0 ? files[0] : null;
      const formDataObject = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObject.append(key, value);
        // console.log("test: ", key, value);
      });
      // console.log("ping: ", formDataObject)
      const res = await createApplication(formDataObject);
      // console.log(res);
      setPrimaryLoading((prev) => !prev);
      // setDisabled(false);
      toast.success("ข้อเสนอของคุณถูกส่งไปยังผู้ว่าจ้างแล้ว");
    } catch (error) {
      console.error("Error submitting student offer:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mt-[30px] md:mt-0 flex flex-col w-full md:w-[30vw] xl:w-[20vw]"
      >
        <div className="relative mb-[2px]">
          <div className="inline-block font-medium text-slate-800">
            สัญญาจ้างงาน
          </div>
          <div className="inline-block">
            <button
              type="button"
              className="inline-block ml-1 cursor-pointer translate-y-[3px]"
              onFocus={() => setIsUrlInfoVisible(true)}
              // onBlur={() => setIsUrlInfoVisible(false)}
              onBlur={() =>
                setTimeout(() => {
                  setIsUrlInfoVisible(false);
                }, 350)
              }
            >
              <Image
                src={questionMarkCircle}
                alt="questionMarkCircle"
                width={16}
                height={16}
              />
            </button>
            {isUrlInfoVisible && (
              <div
                onFocus={() => setIsUrlInfoVisible(true)}
                onBlur={() => setIsUrlInfoVisible(false)}
                className="max-w-[262.39px] z-10 absolute ml-[28px] mt-[-20px] p-2 text-slate-800 bg-white border-slate-300 border-[0.5px] rounded-md shadow-md"
              >
                เอกสารที่ระบุเนื้อหาเกี่ยวกับ<br></br>
                การจ้างงานระหว่างผู้ว่าจ้างและนิสิต<br></br>
                รายละเอียดเพิ่มเติม :{" "}
                <a
                  href="https://blog.fastwork.co/%E0%B8%9F%E0%B8%A3%E0%B8%B5%E0%B9%81%E0%B8%A5%E0%B8%99%E0%B8%8B%E0%B9%8C-%E0%B8%AA%E0%B8%B1%E0%B8%8D%E0%B8%8D%E0%B8%B2%E0%B8%88%E0%B9%89%E0%B8%B2%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99/"
                  className="hover:underline active:opacity-60"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  สัญญาจ้างงาน
                </a>
              </div>
            )}
          </div>
        </div>
        <div className="w-full">
          <FilesInput
            label=""
            files={files}
            setFiles={setFiles}
            isDisabled={disabled}
            maxSizeInMegaByte={5}
          />
        </div>
        <div className="relative mt-[30px] mb-[10px]">
          <div className="inline-block font-medium text-slate-800">
            ค่าจ้างที่ตั้งไว้
          </div>
          <div className="inline-block">
            <button
              type="button"
              className="inline-block ml-1 cursor-pointer translate-y-[3px]"
              onFocus={() => setIsBudgetInfoVisible(true)}
              onBlur={() => setIsBudgetInfoVisible(false)}
            >
              <Image
                src={questionMarkCircle}
                alt="questionMarkCircle"
                width={16}
                height={16}
              />
            </button>
            {isBudgetInfoVisible && (
              <div className="max-w-[194.98px] z-10 absolute ml-[28px] mt-[-20px] p-2 text-slate-800 bg-white border-slate-300 border-[0.5px] rounded-md shadow-md">
                ค่าตอบแทนที่ผู้ว่าจ้างระบุไว้<br></br>
                สำหรับการจ้างนิสิต 1 คน
              </div>
            )}
          </div>
        </div>
        <div className="font-medium text-[20px] text-[#313866]">
          {budget ? budget.toLocaleString() : "-"} บาท
        </div>
        <div className="relative mt-[15px] mb-[16px]">
          <div className="inline-block font-medium text-slate-800">
            ค่าจ้างที่เสนอ
          </div>
          <div className="inline-block">
            <button
              type="button"
              className="inline-block ml-1 cursor-pointer translate-y-[3px]"
              onFocus={() => setIsBidInfoVisible(true)}
              onBlur={() => setIsBidInfoVisible(false)}
            >
              <Image
                src={questionMarkCircle}
                alt="questionMarkCircle"
                width={16}
                height={16}
              />
            </button>
            {isBidInfoVisible && (
              <div className="max-w-[272.06px] z-10 absolute ml-[28px] mt-[-20px] p-2 text-slate-800 bg-white border-slate-300 border-[0.5px] rounded-md shadow-md">
                ค่าตอบแทนที่นิสิตต้องการในการทำงาน
                โดยอาจจะมากกว่าหรือน้อยกว่าค่าจ้างที่ตั้งไว้ <br></br>
                (ค่าจ้างที่เสนอมีผลต่อการพิจารณาจ้างงานของผู้ว่าจ้าง)
              </div>
            )}
          </div>
        </div>
        <NumberInput
          value={formData.bid}
          name="bid"
          placeholder="0"
          onChange={handleChange}
        />
        <div className="flex flex-row justify-between gap-[20px] mt-[30px]">
          <SecondaryButton
            className="w-full"
            isDisabled={disabled}
            onClick={() => setShowModal(true)}
          >
            ยกเลิก
          </SecondaryButton>
          <PrimaryButton
            className="w-full"
            type="submit"
            isDisabled={disabled}
            isLoading={primaryLoading}
            loadingMessage="กำลังดำเนินการ"
          >
            ยืนยัน
          </PrimaryButton>
        </div>
      </form>
      <DangerModal
        message="กดตกลงเพื่อปิดแท็บนี้"
        dangerButtonMessage="ตกลง"
        secondaryButtonMessage="ยกเลิก"
        isShowModal={isShowModal}
        setShowModal={setShowModal}
        onDangerClick={() => {
          setDisabled(true);
          setFormData((currData) => ({
            ...currData,
            bid: 0,
          }));
          window.close();
        }}
      />
    </>
  );
}
