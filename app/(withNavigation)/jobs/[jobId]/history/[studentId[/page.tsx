import CommentCard from "@/components/landing/commentCards/commentCard/CommentCard";
import JobDetail from "@/components/offering/JobDetail";
import React from "react";

type Props = {};

function HistoryPage({ params, }: {
    params: { jobId: string; studentId: string };
}) {
    const [jobId, studentId] = [params.jobId, params.studentId];
    return (
        <div className="px-10 flex flex-col lg:flex-row">
            <section className="flex flex-col">
                <p className="text-xl font-medium">รายละเอียดงาน</p>
                <JobDetail jobId={jobId} isStudentView={true} isHistory={true}></JobDetail>
            </section>
            <section className="flex flex-col">
                <p className="text-xl font-medium">ประวัติการทำงาน</p>
                <div>History</div>
            </section>
            <section className="flex flex-col">
                <p className="text-xl font-medium">คะแนนรีวิว</p>
                <div>คะแนนรีวิว</div>
                <p className="text-xl font-medium">รีวิวจากผู้ว่าจ้าง</p>
                <CommentCard name={""} position={""} organization={""} jobTag={""} description={""} />
            </section>
        </div>
    );
}

export default HistoryPage;
