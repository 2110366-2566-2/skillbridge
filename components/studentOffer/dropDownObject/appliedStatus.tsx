"use client";

import {
    pendingToAccepted,
    pendingToRejected,
} from "@/actions/jobCards/employerChangeApplicationState";
import { useRouter } from "next/router";

export default function AppliedStatus({
    studentId,
    jobId,
}: {
    studentId: string;
    jobId: string;
}) {
    const router = useRouter();
    return (
        <div className="w-[330px] flex justify-between mt-[10px] xl:mt-0">
            <button
                className="h-[35px] bg-[#ef4444] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60"
                onClick={async () => {
                    await pendingToRejected(studentId, jobId);
                    router.reload();
                }}
            >
                ปฏิเสธ
            </button>
            <button
                className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60"
                onClick={async () => {
                    await pendingToAccepted(studentId, jobId);
                    router.reload();
                }}
            >
                ยืนยัน
            </button>
        </div>
    );
}
