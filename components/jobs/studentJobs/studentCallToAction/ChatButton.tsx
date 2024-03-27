import ChatLink from "../../ChatLink";
import { getEmployerFromJobId } from "@/actions/employmentHistoryDetail/employmentHistoryDetail";
import { useEffect, useState } from "react";
export default function ChatButton({ jobId }: { jobId: string }) {
    const [employerId, setEmployerId] = useState<string>("");
    useEffect(() => {
        const getEmployerId = async () => {
            const employerId = await getEmployerFromJobId(jobId);
            setEmployerId(employerId);
        };
        getEmployerId();
    }, []);
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
