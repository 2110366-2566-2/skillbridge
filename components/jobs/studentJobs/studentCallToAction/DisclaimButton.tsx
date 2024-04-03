"use client";

import { pendingToDisclaimed } from "@/actions/jobs/jobCards/studentChangeApplicationState";
import DangerButton from "@/components/public/buttons/dangerButton/DangerButton";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DisclaimButton({ jobId }: { jobId: string }) {
    const [isLoading, setLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(false);
    return (
        <div className="flex flex-row justify-between w-full gap-1">
            <DangerButton
                className="flex justify-center items-center py-2 px-3 w-full bg-red-500 text-sm text-white rounded-md hover:shadow-md hover:bg-red-600 active:bg-red-700 transition duration-200 ease-in-out"
                isLoading={isLoading}
                isDisabled={isDisabled}
                onClick={async () => {
                    setLoading(true);
                    setDisabled(true);
                    await pendingToDisclaimed(jobId);
                    setLoading(false);
                    setDisabled(false);
                    toast.error("สละสิทธิ์แล้ว");
                    location.reload();
                }}
            >
                สละสิทธิ์
            </DangerButton>
        </div>
    );
}
