import Image from "next/image";

import noavatar from "@/public/icons/noavatar.svg";
import doubleQuote from "@/public/icons/double-quote.svg";
import { getComment, getEmployerFromJobId } from "@/actions/employmentHistoryDetail/employmentHistoryDetail";
import { getEmployerInfoById, getStudentName } from "@/actions/public/getUserInfo";

type Props = {
    studentId: string;
    jobId: string;
};

export default async function CommentCard({jobId, studentId}: Props) {
    const commentObject = await getComment(jobId, studentId);
    const comment = commentObject.success ? commentObject.data : "ไม่มีรีวิว";
    const employerId = await getEmployerFromJobId(jobId) ?? "";
    const employerInfo = await getEmployerInfoById(employerId);
    const employerName = await getStudentName(employerId);

    return (
        <div className="border border-slate-200 rounded-[20px] bg-white drop-shadow-md w-[300px] h-fit p-5 gap-2 shrink-0 md:w-[450px] md:p-8">
            <div className="flex flex-col justify-between h-full">
                <div className="flex gap-5 items-start">
                    <Image
                        src={doubleQuote}
                        alt="quote"
                        height={35}
                        width={35}
                    />
                    <div className="flex flex-col">
                        <p className="mt-3 text-[11px] text-slate-500 leading-[18px] md:text-base md:leading-[25px]">
                            {comment}
                        </p>
                    </div>
                </div>
                <div className="flex gap-3 items-center pt-2 md:pt-5">
                    <Image
                        className="md:h-[60px] md:w-[60px]"
                        src={noavatar}
                        alt="avatar"
                        height={40}
                        width={40}
                    />
                    <div className="flex flex-col">
                        <h3 className="text-[15px] font-medium pb-1 md:text-lg">
                            {`${employerName?.salutation}${employerName?.firstname} ${employerName?.lastname}`}
                        </h3>
                        <p className="text-[10px] text-slate-400 md:text-sm">
                            {employerInfo?.position || ""} {employerInfo?.organization || ""}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
