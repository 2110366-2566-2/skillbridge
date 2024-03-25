"use server";

import {
    getComment,
    getJobTag,
    getRating,
} from "@/actions/employmentHistoryDetail/employmentHistoryDetail";
import CommentCard from "@/components/landing/commentCards/commentCard/CommentCard";
import JobDetail from "@/components/offering/JobDetail";
import React from "react";

type Props = {};

async function HistoryPage({
    params,
}: {
    params: { jobId: string; studentId: string };
}) {
    const [jobId, studentId] = [params.jobId, params.studentId];
    const rating = await getRating(jobId, studentId);
    const commentObject = await getComment(jobId, studentId);
    const comment = commentObject.success ? commentObject.data : "ไม่มีรีวิว";
    const tag = await getJobTag(jobId);
    return (
        <div className="flex justify-center">
            <div className="px-10 flex flex-col xl:flex-row gap-20">
                <section className="flex flex-col">
                    <p className="text-xl font-medium">รายละเอียดงาน</p>
                    <JobDetail
                        jobId={jobId}
                        isStudentView={true}
                        isHistory={true}
                    ></JobDetail>
                </section>
                <section className="flex flex-col">
                    <p className="text-xl font-medium">ประวัติการทำงาน</p>
                    <div>History</div>
                </section>
                <section className="flex flex-col">
                    <p className="text-xl font-medium">คะแนนรีวิว</p>
                    <div>คะแนนรีวิว {rating.data}</div>
                    <p className="text-xl font-medium">รีวิวจากผู้ว่าจ้าง</p>
                    <CommentCard
                        name={""}
                        position={""}
                        organization={""}
                        jobTag={tag}
                        description={comment as string}
                    />
                </section>
            </div>
        </div>
    );
}

export default HistoryPage;
