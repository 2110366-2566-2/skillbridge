"use client"

import { useState, FormEvent, ChangeEvent } from "react";
import FilesInput from "../input/fileInput/FileInput";
import NumberInput from "../input/numberInput/NumberInput";

type Props = {
    application: {
        bid: number | null,
        applicationStatus: string | null,
        url: string | null,
        budget: number,
        jobStatus: string | null
    }
};

interface FormData {
    bid: number
}

interface FormErrors {
    bid?: number
}

export default function OfferingForm({ application }: Props) {
    const [disabled, setDisabled] = useState(false);
    const [files, setFiles] = useState<FileList | null>(null);
    const { bid, applicationStatus, url, budget, jobStatus } = application
    const [formData, setFormData] = useState({
        bid: 0
    })

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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors: FormErrors = {};
        console.log("SUBMIT JA EDOK", formData.bid)
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
            <div className="flex flex-row justify-between font-medium text-[20px] text-[#313866]">
                <div>{budget}</div>
                <div>บาท</div>
            </div>
            <div className="font-medium text-slate-800 mt-[15px] mb-[10px]">ค่าจ้างที่เสนอ</div>
            <NumberInput value={formData.bid} name="bid" placeholder="0" onChange={handleChange} />
        </form>

    )
}