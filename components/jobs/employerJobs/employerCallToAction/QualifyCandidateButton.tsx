"use client";

import {
    pendingToAccepted,
    pendingToRejected,
} from "@/actions/jobs/jobCards/employerChangeApplicationState";
import Link from "next/link";
import ProgressButton from "../ProgressButton";

export default function QualifyCandidateButton({
    studentId,
    jobId,
}: {
    studentId: string;
    jobId: string;
}) {
    return (
        <div className="flex flex-row justify-between">
            <ProgressButton jobId={jobId} studentId={studentId} />
            <div className="w-1/2 flex justify-between">
                <button
                    className="h-[35px] bg-red-500 text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60"
                    onClick={async () => {
                        await pendingToRejected(studentId, jobId);
                        location.reload();
                    }}
                >
                    ปฏิเสธ
                </button>
                <button
                    className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60"
                    onClick={async () => {
                        await pendingToAccepted(studentId, jobId);
                        location.reload();
                    }}
                >
                    ยืนยัน
                </button>
            </div>
        </div>
    );
}
