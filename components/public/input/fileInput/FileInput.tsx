"use client"

import Image from "next/image"
import { Dispatch, SetStateAction, useState } from "react"
import closeDarkIcon from "@/public/icons/closeDark.svg"

type Props = {
  label: string
  files: FileList | null
  setFiles: Dispatch<SetStateAction<FileList | null>>
  isDisabled?: boolean
  isPdfAllow?: boolean
  isImageAllow?: boolean
  isMultipleFilesAllow?: boolean
  maxSizeInMegaByte?: number
  id?: number
}

export default function FilesInput(props: Props) {
  const {
    label,
    files,
    setFiles,
    isDisabled,
    isPdfAllow,
    isImageAllow,
    isMultipleFilesAllow,
    maxSizeInMegaByte,
    id = 0,
  } = props
  const [isInvalid, setInvalid] = useState(false)

  const handleRemoveFile = (fileNameToRemove: string) => {
    if (!files) return
    const filesArray = Array.from(files)
    const newFilesArray = filesArray.filter((file) => file.name !== fileNameToRemove)
    // Create a new FileList from the filtered array
    const newFiles = new DataTransfer()
    newFilesArray.forEach((file) => newFiles.items.add(file))
    // Set the new files
    setFiles(newFiles.files)
  }

  const truncateFileName = (fileName: string, frontLength: number, backLength: number) => {
    const maxLength = frontLength + backLength + 3 // 3 for the ellipsis and dot in the middle
    if (fileName.length > maxLength) {
      const fileNameWithoutExtension = fileName.split(".").slice(0, -1).join(".")
      const truncatedFront = fileNameWithoutExtension.slice(0, frontLength)
      const truncatedBack = fileNameWithoutExtension.slice(-backLength)
      const truncatedFileName = truncatedFront + "..." + truncatedBack
      const fileExtension = fileName.split(".").pop()
      return truncatedFileName + "." + fileExtension
    }
    return fileName
  }

  let currentFiles = null
  if (files) {
    const filesArray = Array.from(files)
    currentFiles = filesArray.map((file) => (
      <div className="w-full flex justify-between p-2 bg-slate-100 rounded-md" key={file.name}>
        <div className="flex gap-3 justify-center items-center">
          <p className="text-[12px] text-slate-500 font-semibold">
            {truncateFileName(file.name, 25, 3)}
          </p>
          <p className="text-[12px] text-slate-400">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
        </div>
        <button
          title="remove-file"
          onClick={() => handleRemoveFile(file.name)}
          className="hover:opacity-80 active:opacity-60 disabled:opacity-60"
          disabled={isDisabled}>
          <Image src={closeDarkIcon} alt="closeIcon" width={15} height={15} />
        </button>
      </div>
    ))
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInvalid(false)
    const selectedFiles = event.target.files
    if (!selectedFiles) return
    let totalSize = 0
    for (let i = 0; i < selectedFiles.length; i++) {
      if (
        (!isPdfAllow && selectedFiles[i].type.includes("pdf")) ||
        (!isImageAllow && selectedFiles[i].type.includes("image")) ||
        (!selectedFiles[i].type.includes("pdf") && !selectedFiles[i].type.includes("image"))
      ) {
        setInvalid(true)
        event.target.value = ""
        return
      }
      totalSize += selectedFiles[i].size
    }
    const totalSizeInMB = totalSize / (1024 * 1024) // Convert to MB
    if (maxSizeInMegaByte && totalSizeInMB > maxSizeInMegaByte) {
      setInvalid(true)
      event.target.value = ""
      return
    }
    // Set the selected files
    setFiles(selectedFiles)
  }

  return (
    <div className="flex flex-col gap-1 flex-grow">
      <label htmlFor={`dropzone-file-${id}`} className="text-[14px] font-medium text-slate-900">
        {label}
      </label>
      <div className="flex flex-col gap-1">{currentFiles}</div>
      <div className="flex flex-col gap-2 items-start justify-center w-full">
        <label
          htmlFor={`dropzone-file-${id}`}
          className={`flex flex-col items-center justify-center w-full border-[1px] ${
            isInvalid ? "border-red-600" : "border-slate-400"
          } border-dashed rounded-lg bg-transparent ${
            isDisabled
              ? "opacity-60 cursor-default"
              : "active:opacity-60 cursor-pointer hover:opacity-80"
          }`}>
          <div className="flex flex-col gap-1 items-center justify-center p-3">
            <div className="flex gap-3 items-center justify-center">
              <svg
                className="w-8 h-8 mb-2 text-slate-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <span className="text-slate-500">วางไฟล์ที่นี่</span>
            </div>
            <p className="mb-2 px-[20px] py-[12px] rounded-[6px] text-sm text-slate-50 bg-slate-400 flex flex-wrap gap-1 justify-center items-center">
              <span className="font-normal">กดเพื่ออัพโหลดไฟล์</span>
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
            id={`dropzone-file-${id}`}
            type="file"
            name={`dropzone-file-${id}`}
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
            onChange={handleFileChange}
            onClick={(e) => {
              const target = e.target as HTMLInputElement
              target.value = ""
            }}
            className="hidden"
            disabled={isDisabled}
          />
        </label>
        <p
          id={`error-invalid-file-${id}`}
          className={`text-[14px] text-red-600 ${!isInvalid ? "opacity-0" : ""}`}>
          ไฟล์เกินขนาดหรือผิดประเภท
        </p>
      </div>
    </div>
  )
}
