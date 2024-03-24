"use client";
import Image from "next/image";
import React, { useState } from "react";
import closeDarkIcon from "@/public/icons/closeDark.svg";
import SecondaryButton from "@/components/public/buttons/secondaryButton/SecondaryButton";
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import createTransaction from "@/actions/payment/transaction";
import { useSession } from "next-auth/react";

type Props = {
  label: string;
  jobId: string;
  studentId: string;
  isDeposit: boolean;
  totalPrice: number;
};

export default function FilesInput(props: Props) {
  const { label, jobId, studentId, isDeposit, totalPrice } = props;
  const [isDisabled, setDisabled] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [primaryLoading, setPrimaryLoading] = useState(false);
  const [isWarnUpLoadFile, setIsWarnUpLoadFile] = useState(false);
  let isPdfAllow = false;
  let isImageAllow = true;
  let isMultipleFilesAllow = false;
  let maxSizeInMegaByte = 5;
  const [isInvalid, setInvalid] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();
  // const cancelPath = `jobs/${jobId}/manage`

  const handleRemoveFile = (fileNameToRemove: string) => {
    if (!files) return;
    const filesArray = Array.from(files);
    const newFilesArray = filesArray.filter(
      (file) => file.name !== fileNameToRemove,
    );
    // Create a new FileList from the filtered array
    const newFiles = new DataTransfer();
    newFilesArray.forEach((file) => newFiles.items.add(file));
    // Set the new files
    setFiles(newFiles.files);
  };

  const truncateFileName = (
    fileName: string,
    frontLength: number,
    backLength: number,
  ) => {
    const maxLength = frontLength + backLength + 3; // 3 for the ellipsis and dot in the middle
    if (fileName.length > maxLength) {
      const fileNameWithoutExtension = fileName
        .split(".")
        .slice(0, -1)
        .join(".");
      const truncatedFront = fileNameWithoutExtension.slice(0, frontLength);
      const truncatedBack = fileNameWithoutExtension.slice(-backLength);
      const truncatedFileName = truncatedFront + "..." + truncatedBack;
      const fileExtension = fileName.split(".").pop();
      return truncatedFileName + "." + fileExtension;
    }
    return fileName;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvalid(false);
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;
    let totalSize = 0;
    for (let i = 0; i < selectedFiles.length; i++) {
      totalSize += selectedFiles[i].size;
    }
    const totalSizeInMB = totalSize / (1024 * 1024); // Convert to MB
    if (maxSizeInMegaByte && totalSizeInMB > maxSizeInMegaByte) {
      setInvalid(true);
      event.target.value = "";
      return;
    }
    // Set the selected files
    setFiles(selectedFiles);

    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    setPrimaryLoading((prev) => !prev);
    setDisabled(true);

    if (!session) {
      console.log("No session");

      router.push("/login");
      return;
    }
    //if (!isWarnUpLoadFile && upload หลังบ้านสำเร็จ){toast.success("ระบบกำลังตรวจสอบ");}
    //else { toast.error("อัพโหลดไม่สำเร็จ โปรดลองอีกครั้ง"); setDisabled(false);}

    if (!selectedFile) {
      console.log("No file selected");
      setTimeout(() => {
        setIsWarnUpLoadFile(true);
        setPrimaryLoading((prev) => !prev);
        setDisabled(false);
        toast.error("อัพโหลดไม่สำเร็จ โปรดลองอีกครั้ง");
        console.error("No file selected");
      }, 2000);
      return;
    }

    const formDataObject = new FormData();
    formDataObject.append("jobId", jobId);
    formDataObject.append("studentId", studentId);
    formDataObject.append("employerUserId", session.user.id);
    formDataObject.append("amount", totalPrice.toString());
    formDataObject.append("isDeposit", isDeposit.toString());
    formDataObject.append("receipt", selectedFile);

    const result = await createTransaction(formDataObject);
    console.log("result", result);
    setTimeout(() => {
      toast.success("ระบบกำลังตรวจสอบ");
      setPrimaryLoading((prev) => !prev);
      setDisabled(false);
    }, 2000);
  };

  let currentFiles = null;
  if (files) {
    const filesArray = Array.from(files);
    currentFiles = filesArray.map((file) => (
      <div
        className="w-full flex justify-between p-2 bg-slate-100 rounded-md"
        key={file.name}
      >
        <div className="flex gap-3 justify-center items-center">
          <p className="text-[12px] text-slate-500 font-semibold">
            {truncateFileName(file.name, 25, 3)}
          </p>
          <p className="text-[12px] text-slate-400">
            {(file.size / 1024 / 1024).toFixed(1)} MB
          </p>
        </div>
        <button
          title="remove-file"
          onClick={() => handleRemoveFile(file.name)}
          className="hover:opacity-80 active:opacity-60 disabled:opacity-60"
          disabled={isDisabled}
        >
          <Image src={closeDarkIcon} alt="closeIcon" width={15} height={15} />
        </button>
      </div>
    ));
  }

  return (
    <div className="flex flex-col gap-1 flex-grow mt-[13px] lg:order-3 lg:row-span-3">
      <div className="flex">
        <p className="text-[14px] font-medium text-slate-900 lg:text-xl">
          {label}
        </p>
      </div>
      <div className="flex flex-col gap-1">{currentFiles}</div>
      <form
        action={handleFileUpload}
        method="POST"
        encType="multipart/form-data"
        className="flex items-center justify-center w-full flex-col"
      >
        <label
          htmlFor="dropzone-file"
          style={{ borderColor: isWarnUpLoadFile ? "#dc2626" : "#94a3b8" }}
          className={`flex flex-col items-center justify-center w-full border-[1px] border-dashed rounded-lg bg-transparent lg:border-2 ${isDisabled ? "opacity-60 cursor-default" : "active:opacity-60 cursor-pointer hover:opacity-80"}`}
        >
          <div className="flex flex-col gap-2 items-center justify-center p-3 lg:p-12">
            <div className="flex items-center justify-center h-[24px] mt-2">
              <Image
                src={"/icons/upload.svg"}
                width={24}
                height={24}
                alt="upload icon"
              />

              <span className="text-sm ml-[6px] text-slate-800 lg:text-[16px]">
                วางไฟล์ที่นี่
              </span>
            </div>
            <p className="mb-3 px-[15px] h-[32px] rounded-lg text-sm text-slate-50 bg-slate-400 flex flex-wrap gap-1 justify-center items-center lg:h-[40px]">
              <span className="text-sm lg:text-[16px]">กดเพื่ออัพโหลดไฟล์</span>
            </p>
            <p className="text-[12px] text-slate-400">
              (ไฟล์
              {isPdfAllow && isImageAllow
                ? " .pdf, .jpg, .png "
                : isPdfAllow
                  ? " .pdf "
                  : isImageAllow
                    ? " .jpg, .png "
                    : ""}
              ขนาดรวมไม่เกิน {maxSizeInMegaByte} MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            name="dropzone-file"
            accept={
              isPdfAllow && isImageAllow
                ? ".pdf, .jpg, .png"
                : isPdfAllow
                  ? ".pdf"
                  : isImageAllow
                    ? ".jpg, .png"
                    : "*"
            }
            multiple={isMultipleFilesAllow}
            onChange={(e) => {
              handleFileChange(e);
              const inputFiles = e.target.files;
              setFiles(inputFiles);
            }}
            onClick={(e) => {
              const target = e.target as HTMLInputElement;
              target.value = "";
            }}
            className="hidden"
            disabled={isDisabled}
          />
        </label>
        <div className="flex w-full">
          {
            isInvalid &&
            <p className="text-red-600 text-sm font-medium mt-[13px] lg:text-[16px]">
              ไฟล์เกินขนาด
            </p>
          }
          {
            isWarnUpLoadFile &&
            <p className="text-red-600 text-sm font-medium mt-[13px] lg:text-[16px]" >
              กรุณาอัพโหลดสลิปโอนเงิน
            </p>
          }
        </div>

        <div className="mt-[13px] flex w-full justify-between lg:justify-end lg:mt-[18px] gap-x-5">
          <SecondaryButton
            isDisabled={isDisabled}
            className=" w-full"
            onClick={() => router.back()}
          >
            ยกเลิก
          </SecondaryButton>

          <PrimaryButton
            type="submit"
            isDisabled={isDisabled}
            className="w-full"
            isLoading={primaryLoading}
            loadingMessage="กำลังอัพโหลด"
          >
            ยืนยันการชำระเงิน
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
}
