"use server";

import { getRating } from "@/actions/employmentHistoryDetail/employmentHistoryDetail";
import getProfileImage from "@/actions/profile/getProfileImage";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import JobDetail from "@/components/offering/JobDetail";
import RatingScore from "@/components/profile/subProfile/RatingScore";
import ProgressCommentCard from "@/components/progress/ProgressCommentCard";
import ProgressTracker from "@/components/progress/ProgressTracker";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

async function ProgressPage({
    params,
}: {
    params: { jobId: string; studentId: string };
}) {
    const [jobId, studentId] = [params.jobId, params.studentId];
    const rating = await getRating(jobId, studentId);
    const employerId = (await getServerSession(authOptions))?.user.id as string;
    const profileImageURL = await getProfileImage(employerId);

    return (
        <div className="flex flex-row justify-center mx-auto">
            <div className="flex flex-col 2xl:flex-row justify-center gap-10">
                <article className="flex flex-col">
                    <p className="text-2xl font-medium mb-2">รายละเอียดงาน</p>
                    <div className="bg-white w-fit">
                        <JobDetail
                            jobId={jobId}
                            isStudentView={true}
                            isHistory={true}
                        />
                    </div>
                </article>

                <article className="flex flex-col">
                    <p className="text-2xl font-medium mb-2">ประวัติการทำงาน</p>
                    <ProgressTracker jobId={jobId} studentId={studentId} />
                </article>

                <article className="flex flex-col">
                    <p className="text-2xl font-medium mb-2">คะแนนรีวิว</p>
                    <RatingScore averageScore={rating.data || 0} />
                    <p className="text-2xl font-medium mt-10 mb-2">
                        รีวิวจากผู้ว่าจ้าง
                    </p>
                    <ProgressCommentCard
                        studentId={studentId}
                        jobId={jobId}
                        profileImageURL={profileImageURL}
                    />
                </article>
            </div>
        </div>
    );
}

export default ProgressPage;
