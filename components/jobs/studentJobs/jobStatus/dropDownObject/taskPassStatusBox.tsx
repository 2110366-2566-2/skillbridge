"use client";

import { acceptedToDepositPending, acceptedToDisclaimed } from "@/actions/jobs/jobCards/studentChangeApplicationState";
import { useRouter } from "next/router";

export default function TaskPassStatusBox({
    jobId,
}: {
    jobId: string;
}) {
    return (
        <div className="absolute bottom-[15px] w-[295px] flex justify-between">
            <button
                className="h-[35px] bg-[#ef4444] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60"
                onClick={async () => {
                    await acceptedToDisclaimed(jobId);
                    location.reload();
                }}
            >
                ปฏิเสธ
            </button>
            <button
                className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60"
                onClick={async () => {
                    await acceptedToDepositPending(jobId);
                    location.reload();
                }}
            >
                ยืนยัน
            </button>
        </div>
    );
}
