import {
    deliveredToInProgress,
    deliveredToWagePaymentPending,
} from "@/actions/jobs/jobCards/employerChangeApplicationState";
import ProgressButton from "../ProgressButton";
import UniversalChatButton from "../../UniversalChatButton";

export default function ApproveButton({
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
                    className="h-[35px] bg-red-500 text-sm text-white rounded-md w-[32%] hover:opacity-80 active:opacity-60"
                    onClick={async () => {
                        await deliveredToInProgress(studentId, jobId);
                        location.reload();
                    }}
                >
                    ไม่รับมอบงาน
                </button>
                <button
                    className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[32%] hover:opacity-80 active:opacity-60"
                    onClick={async () => {
                        await deliveredToWagePaymentPending(studentId, jobId);
                        location.reload();
                    }}
                >
                    รับมอบงาน
                </button>
                <UniversalChatButton studentId={studentId} employerId={""} jobId={jobId} />
            </div>
        </div>
    );
}
