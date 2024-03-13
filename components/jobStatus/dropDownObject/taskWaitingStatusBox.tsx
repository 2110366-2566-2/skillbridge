"use client";

import { pendingToDisclaimed } from "@/actions/jobCards/studentChangeApplicationState";
import { useRouter } from "next/router";

export default function TaskWaitingStatusBox({
    userId,
    jobId,
}: {
    userId: string;
    jobId: string;
}) {
    const router = useRouter();
    return (
        <div className="absolute bottom-[15px] w-[295px] flex justify-between">
            <button
                className="h-[35px] bg-[#ef4444] text-sm text-white rounded-md w-[100%] hover:opacity-80 active:opacity-60"
                onClick={async () => {
                    await pendingToDisclaimed(jobId);
                    router.reload();
                }}
            >
                สละสิทธิ์
            </button>
        </div>
    );
}
