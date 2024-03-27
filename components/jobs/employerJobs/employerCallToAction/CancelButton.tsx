import { inProgressToCanceled } from "@/actions/jobs/jobCards/employerChangeApplicationState";
import Image from "next/image";
import ProgressButton from "../ProgressButton";
import ChatLink from "../../ChatLink";

export default function CancelButton({
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
                        await inProgressToCanceled(studentId, jobId);
                        location.reload();
                    }}
                >
                    ยกเลิกงาน
                </button>
                <ChatLink
                    jobId={jobId}
                    studentId={studentId}
                    className="h-[35px] bg-[#f8fafc] text-sm  rounded-md w-[32%] hover:opacity-80 active:opacity-60 text-black border border-[#334155] flex justify-center items-center"
                />
            </div>
        </div>
    );
}
