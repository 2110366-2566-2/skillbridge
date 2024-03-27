"use client";

import ChatLink from "../../ChatLink";

export default function ChatButton({
    jobId,
    employerId,
}: {
    jobId: string;
    employerId: string;
}) {
    return (
        <div className="flex flex-row justify-between w-full gap-1">
            <ChatLink
                jobId={jobId}
                employerId={employerId}
                className="flex flex-row justify-center items-center py-2 px-3 w-full bg-slate-50 text-sm text-slate-900 border border-slate-700 rounded-md hover:shadow-md hover:border-slate-800 active:border-slate-900 transition duration-200 ease-in-out"
            />
        </div>
    );
}
