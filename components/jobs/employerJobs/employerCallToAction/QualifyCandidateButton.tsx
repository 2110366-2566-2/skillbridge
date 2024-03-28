"use client";

import {
    pendingToAccepted,
    pendingToRejected,
} from "@/actions/jobs/jobCards/employerChangeApplicationState";
import ProgressButton from "../ProgressButton";
import DangerButton from "@/components/public/buttons/dangerButton/DangerButton";
import { useState } from "react";
import toast from "react-hot-toast";
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton";

export default function QualifyCandidateButton({
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
                    className="h-[35px] bg-red-500 text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60"
                    isLoading={isRejectButtonLoading}
                    isDisabled={isDisabled}
                    onClick={async () => {
                        setRejectButtonLoading(true);
                        setDisabled(true);
                        await pendingToRejected(studentId, jobId);
                        setRejectButtonLoading(false);
                        setDisabled(false);
                        toast.error("ปฏิเสธแล้ว");
                        location.reload();
                    }}
                >
                    ปฏิเสธ
                </DangerButton>
                <PrimaryButton
                    className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60"
                    isLoading={isAcceptButtonLoading}
                    isDisabled={isDisabled}
                    onClick={async () => {
                        setAcceptButtonLoading(true);
                        setDisabled(true);
                        await pendingToAccepted(studentId, jobId);
                        setAcceptButtonLoading(false);
                        setDisabled(false);
                        toast.success("ยืนยันแล้ว");
                        location.reload();
                    }}
                >
                    ยืนยัน
                </PrimaryButton>
            </div>
        </div>
    );
}
