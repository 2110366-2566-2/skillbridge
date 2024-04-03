import { inProgressToCanceled } from "@/actions/jobs/jobCards/employerChangeApplicationState";
import ProgressButton from "../ProgressButton";
import ChatLink from "../../ChatLink";
import { useState } from "react";
import toast from "react-hot-toast";
import DangerButton from "@/components/public/buttons/dangerButton/DangerButton";

export default function CancelButton({
    studentId,
    jobId,
}: {
    studentId: string;
    jobId: string;
}) {
    const [isDisabled, setDisabled] = useState(false);
    const [isLoading, setLoading] = useState(false);
    return (
        <div className="flex flex-row justify-between">
            <ProgressButton jobId={jobId} studentId={studentId} />
            <div className="w-1/2 flex justify-between">
                <DangerButton
                    className="h-[35px] bg-red-500 text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60 flex justify-center items-center"
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    onClick={async () => {
                        setLoading(true);
                        setDisabled(true);
                        await inProgressToCanceled(studentId, jobId);
                        setLoading(false);
                        setDisabled(false);
                        toast.error("ยกเลิกงานแล้ว");
                        location.reload();
                    }}
                >
                    ยกเลิกงาน
                </DangerButton>
                <ChatLink
                    jobId={jobId}
                    studentId={studentId}
                    className="h-[35px] bg-[#f8fafc] text-sm rounded-md w-[48%] hover:opacity-80 active:opacity-60 text-black border border-[#334155] flex justify-center items-center"
                />
            </div>
        </div>
    );
}
