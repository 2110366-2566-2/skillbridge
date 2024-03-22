/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React from "react";
import FilesInput from "@/components/public/input/fileInput/FileInput";
import { useState } from "react";

export default function page() {
  const [files, setFiles] = useState<FileList | null>(null);
  console.log("Files :", files);
  return (
    <div>
      <form>
        <FilesInput
          label="ชื่อฟิลด์นี้"
          files={files}
          setFiles={setFiles}
          isDisabled={false}
          isPdfAllow={true}
          isImageAllow={true}
          isMultipleFilesAllow={false}
          maxSizeInMegaByte={10}
        />
        <button
          type="submit"
          className="border border-slate-800 p-2 active:opacity-55"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

/*
FileInput มี props 8 ตัว
----------------------

label : string 
files : state เก็บ file
setFiles : set state
isDisabled (optional) : default เป็น false, true -> จะกดอัพโหลดไฟล์ไม่ได้
isPdfAllow (optional) : true -> รับ pdf
isImageAllow (optional) : true -> รับ image
isMultipleFilesAllow : default เป็น true, false -> รับไฟล์เดียว
maxSizeInMegaByte: รับ integer
*/
