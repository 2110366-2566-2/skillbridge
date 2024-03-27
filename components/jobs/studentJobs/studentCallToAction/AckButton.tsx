"use client";

import { acknowledgeApplication } from "@/actions/jobs/jobCards/studentChangeApplicationState";
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton";
import { useState } from "react";

export default function AckButton({ jobId }: { jobId: string }) {
    const [isDisabled, setDisabled] = useState(false);
    const [isLoading, setLoading] = useState(false);
    return (
        <div className="flex flex-row justify-between w-full gap-1">
            <PrimaryButton
                isDisabled={isDisabled}
                isLoading={isLoading}
                className="py-2 px-3 w-full bg-slate-600 text-sm text-white rounded-md hover:shadow-md hover:bg-slate-700 active:bg-slate-800 transition duration-200 ease-in-out"
                onClick={async () => {
                    setLoading(true);
                    setDisabled(true);
                    await acknowledgeApplication(jobId);
                    setLoading(false);
                    setDisabled(false);
                    location.reload();
                }}
            >
                ปิด
            </PrimaryButton>
        </div>
    );
}
