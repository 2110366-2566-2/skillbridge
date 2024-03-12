"use client"

import { useState, FormEvent } from "react";
import FilesInput from "../input/fileInput/FileInput";

type Props = {
    jobId: string
};

interface FormData {
    bid: number
}

interface FormErrors {
    bid?: number
}

export default function OfferingForm({ jobId }: Props) {
    const [disabled, setDisabled] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: FormErrors = {};
        console.log("SUBMIT JA EDOK")
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-[30px] md:mt-0 flex flex-col">
            <div className="font-medium text-slate-800 mb-[10px]">สัญญาจ้างงาน</div>
            <div className="w-full">
                <FilesInput
                    label=""
                    files={files}
                    setFiles={setFiles}
                    isDisabled={disabled}
                    maxSizeInMegaByte={5}
                />
            </div>
            <div className="font-medium text-slate-800 mt-[30px] mb-[10px]">ค่าจ้างที่ตั้งไว้</div>
        </form>

    )
}