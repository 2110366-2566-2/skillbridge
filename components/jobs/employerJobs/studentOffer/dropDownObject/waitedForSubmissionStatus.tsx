import { inProgressToCanceled } from "@/actions/jobs/jobCards/employerChangeApplicationState";
import Image from "next/image";
import { useRouter } from "next/router";
export default function WaitedForSubmissionStatus({
    studentId,
    jobId,
}: {
    studentId: string;
    jobId: string;
}) {
    return (
        <div className="w-[330px] flex justify-between mt-[10px] xl:mt-0">
            <button
                className="h-[35px] bg-[#ef4444] text-sm rounded-md w-[48%] hover:opacity-80 active:opacity-60"
                onClick={async () => {
                    await inProgressToCanceled(studentId, jobId);
                    location.reload();
                }}
            >
                ยกเลิกงาน
            </button>
            <button className="h-[35px] bg-[#f8fafc] text-sm rounded-md w-[48%] hover:opacity-80 active:opacity-60 text-black border border-[#334155] flex justify-center items-center">
                <Image
                    src={"/icons/chat.svg"}
                    alt="chat"
                    width={13}
                    height={13}
                    className="mr-[3px]"
                />
                <p className="text-[#334155]">แชท</p>
            </button>
        </div>
    );
}
