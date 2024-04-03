"use client";

import {
    acceptedToDepositPending,
    acceptedToDisclaimed,
} from "@/actions/jobs/jobCards/studentChangeApplicationState";
import DangerButton from "@/components/public/buttons/dangerButton/DangerButton";
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AnswerOfferButton({ jobId }: { jobId: string }) {
    const [isDisabled, setDisabled] = useState(false);
    const [isDisclaimButtonLoading, setDisclaimButtonLoading] = useState(false);
    const [isAcceptButtonLoading, setAcceptButtonLoading] = useState(false);
    return (
        <div className="flex flex-row justify-between w-full gap-1">
            <DangerButton
                isDisabled={isDisabled}
                isLoading={isDisclaimButtonLoading}
                className="flex justify-center items-center py-2 px-3 w-full bg-red-500 text-sm text-white rounded-md hover:shadow-md hover:bg-red-600 active:bg-red-700 transition duration-200 ease-in-out"
                onClick={async () => {
                    setDisclaimButtonLoading(true);
                    setDisabled(true);
                    await acceptedToDisclaimed(jobId);
                    setDisclaimButtonLoading(false);
                    setDisabled(false);
                    toast.error("สละสิทธิ์แล้ว");
                    location.reload();
                }}
            >
                ปฏิเสธ
            </DangerButton>

            <PrimaryButton
                isDisabled={isDisabled}
                isLoading={isAcceptButtonLoading}
                className="flex justify-center items-center py-2 px-3 w-full bg-slate-600 text-sm text-white rounded-md hover:shadow-md hover:bg-slate-700 active:bg-slate-800 transition duration-200 ease-in-out"
                onClick={async () => {
                    setAcceptButtonLoading(true);
                    setDisabled(true);
                    await acceptedToDepositPending(jobId);
                    setAcceptButtonLoading(false);
                    setDisabled(false);
                    toast.success("ยอมรับข้อเสนอแล้ว");
                    location.reload();
                }}
            >
                ยืนยัน
            </PrimaryButton>
        </div>
    );
}
