"use client";

import {
    deliveredToInProgress,
    deliveredToWagePaymentPending,
} from "@/actions/jobs/jobCards/employerChangeApplicationState";
import ProgressButton from "../ProgressButton";
import ChatLink from "../../ChatLink";
import { useState } from "react";
import toast from "react-hot-toast";
import DangerButton from "@/components/public/buttons/dangerButton/DangerButton";
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton";

export default function ApproveButton({
    studentId,
    jobId,
}: {
    studentId: string;
    jobId: string;
}) {
    const [isDisabled, setDisabled] = useState(false);
    const [isRejectButtonLoading, setRejectButtonLoading] = useState(false);
    const [isAcceptButtonLoading, setAcceptButtonLoading] = useState(false);
    return (
        <div className="flex flex-row justify-between">
            <ProgressButton jobId={jobId} studentId={studentId} />
            <div className="w-1/2 flex justify-between">
                <DangerButton
                    className="h-[35px] bg-red-500 text-sm text-white rounded-md w-[32%] hover:opacity-80 active:opacity-60 flex justify-center items-center"
                    isLoading={isRejectButtonLoading}
                    isDisabled={isDisabled}
                    onClick={async () => {
                        setRejectButtonLoading(true);
                        setDisabled(true);
                        await deliveredToInProgress(studentId, jobId);
                        setRejectButtonLoading(false);
                        setDisabled(false);
                        toast.error("ไม่รับมอบงานแล้ว");
                        location.reload();
                    }}
                >
                    ไม่รับมอบงาน
                </DangerButton>
                <PrimaryButton
                    className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[32%] hover:opacity-80 active:opacity-60 flex justify-center items-center"
                    isLoading={isAcceptButtonLoading}
                    isDisabled={isDisabled}
                    onClick={async () => {
                        setAcceptButtonLoading(true);
                        setDisabled(true);
                        await deliveredToWagePaymentPending(studentId, jobId);
                        setAcceptButtonLoading(false);
                        setDisabled(false);
                        toast.success("รับมอบงานแล้ว");
                        location.reload();
                    }}
                >
                    รับมอบงาน
                </PrimaryButton>
                <ChatLink
                    jobId={jobId}
                    studentId={studentId}
                    className="h-[35px] bg-[#f8fafc] text-sm  rounded-md w-[32%] hover:opacity-80 active:opacity-60 text-black border border-[#334155] flex justify-center items-center"
                />
            </div>
        </div>
    );
}
