import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  label: string;
  files: FileList | null;
  setFiles: Dispatch<SetStateAction<FileList | null>>;
};

const closeDarkIcon = require("@/public/icons/closeDark.svg") as string;

export default function FilesInput(props: Props) {
  const { label, files, setFiles } = props;

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

  const truncateFileName = (fileName: string, maxLength: number) => {
    if (fileName.length > maxLength) {
      const fileNameWithoutExtension = fileName
        .split(".")
        .slice(0, -1)
        .join(".");
      const truncatedFileName =
        fileNameWithoutExtension.slice(0, maxLength) + "... ";
      const fileExtension = fileName.split(".").pop();
      return truncatedFileName + "." + fileExtension;
    }
    return fileName;
  };

  let currentFiles = null;
  if (files) {
    const filesArray = Array.from(files);
    currentFiles = filesArray.map((file) => (
      <div
        className="w-full flex justify-between p-2 bg-slate-100 rounded-md"
        key={file.name}
      >
        <div className="flex gap-3 items-center">
          <p className="text-[12px] text-slate-500 font-semibold">
            {truncateFileName(file.name, 20)}
          </p>
          <p className="text-[12px] text-slate-400">
            {(file.size / 1024).toFixed(0)} KB
          </p>
        </div>
        <button title="remove-file" onClick={() => handleRemoveFile(file.name)}>
          <Image src={closeDarkIcon} alt="closeIcon" width={20} height={20} />
        </button>
      </div>
    ));
  }

  return (
    <div className="flex flex-col gap-1 flex-grow">
      <label
        htmlFor="dropzone-file"
        className="text-[14px] font-medium text-slate-900"
      >
        {label}
      </label>
      <div className="flex flex-col gap-1">{currentFiles}</div>
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full border-[1px] border-slate-400 border-dashed rounded-lg cursor-pointer bg-transparent"
        >
          <div className="flex flex-col items-center justify-center p-3">
            <svg
              className="w-8 h-8 mb-2 text-slate-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-[14px] text-slate-500 flex flex-wrap gap-1 justify-center items-center">
              <span className="font-semibold">กดเพื่ออัพโหลดไฟล์</span>
              <span>หรือวางไฟล์ที่นี่</span>
            </p>
            <p className="text-[12px] text-slate-400">(ขนาดรวมไม่เกิน 1 MB)</p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            multiple
            onChange={(e) => {
              setFiles(e.target.files);
            }}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
