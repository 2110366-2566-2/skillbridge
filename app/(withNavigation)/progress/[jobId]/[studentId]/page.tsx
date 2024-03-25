"use server";

import {
    getComment,
    getEmployerFromJobId,
    getJobTag,
    getRating,
} from "@/actions/employmentHistoryDetail/employmentHistoryDetail";
import {
    getEmployerInfoById,
    getStudentName,
} from "@/actions/public/getUserInfo";
import CommentCard from "@/components/landing/commentCards/commentCard/CommentCard";
import JobDetail from "@/components/offering/JobDetail";
import RatingScore from "@/components/profile/subProfile/RatingScore";
import React from "react";

type Props = {};

async function ProgressPage({
    params,
}: {
    params: { jobId: string; studentId: string };
}) {
    const [jobId, studentId] = [params.jobId, params.studentId];
    const rating = await getRating(jobId, studentId);
    const commentObject = await getComment(jobId, studentId);
    const comment = commentObject.success ? commentObject.data : "ไม่มีรีวิว";
    const tag = await getJobTag(jobId);
    const employerId = await getEmployerFromJobId(jobId);
    const employerInfo = await getEmployerInfoById(employerId);
    const employerName = await getStudentName(employerId);

    console.log(
        `jobId: ${jobId}\nstudentId: ${studentId}\ncomment: ${comment}\ntag: ${tag}\nemployerId: ${employerId}\nemployerInfo: ${employerInfo}\nemployerName: ${employerName}`
    );

    return (
        <div className="flex flex-col xl:flex-row justify-center mx-auto gap-10">
            <article className="flex flex-col mx-10">
                <p className="text-2xl font-medium mb-2">รายละเอียดงาน</p>
                <JobDetail
                    jobId={jobId}
                    isStudentView={true}
                    isHistory={true}
                ></JobDetail>
            </article>

            <article className="flex flex-col mx-10">
                <p className="text-2xl font-medium mb-2">ประวัติการทำงาน</p>
                <div>History</div>
            </article>

            <article className="flex flex-col mx-10">
                <p className="text-2xl font-medium mb-2">คะแนนรีวิว</p>
                <RatingScore averageScore={rating.data || 0} />
                <p className="text-2xl font-medium mt-10 mb-2">
                    รีวิวจากผู้ว่าจ้าง
                </p>
                <CommentCard
                    name={`${employerName?.salutation}${employerName?.firstname} ${employerName?.lastname}`}
                    position={employerInfo?.position || ""}
                    organization={employerInfo?.organization || ""}
                    jobTag={tag}
                    description={comment as string}
                />
            </article>
        </div>
    );
}

export default ProgressPage;
