import React from "react";
import dynamic from "next/dynamic";
import DangerButton from "@/components/buttons/dangerButton/DangerButton";
import getStudentByJob from "@/actions/getStudentByJob";
import getJobById from "@/actions/getJobByID";
import { redirect } from "next/navigation";

type Props = {
    params: {
        jobId: string;
    };
};

async function ManagePage({ params }: Props) {

    const jobId = params.jobId;

    const fetchedData = await getStudentByJob(jobId);
    console.log("This is fetchedData from 'getStudentByJob' action : ", fetchedData);
    const jobData = await getJobById(jobId);
    if(jobData === null)
    {
        redirect("/jobs");
    }
    console.log("This is jobById from 'getJobById' action : ", jobData);


    const DynamicStudentOffer = dynamic(() => import("@/components/studentOffer/studentOffer"), {
        ssr: false,
        // loading: () => <p>Loading...</p> if i have more time to do this na
    })

    return (
        <main className="flex flex-col px-10 gap-10">
            <section className="flex flex-row justify-between">
                <div className="flex flex-row gap-4">
                    <p className="font-bold text-2xl line-clamp-2 flex items-center">
                        {jobData?.title}
                    </p>
                    <div className="bg-slate-200 rounded-sm p-2 w-fit">{jobData?.jobTag.title}</div>
                </div>
                <DangerButton>ปิดรับสมัคร</DangerButton>
            </section>


            <section className="flex flex-row gap-8">
                <article className="w-[400px] h-[1000px] bg-slate-500">
                    Job Detail of {jobId}
                </article>

                <aside className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4">
                        <p className="font-semibold text-2xl line-clamp-2 flex items-center">สถานะนิสิต</p>
                        <select className="rounded-md text-sm py-1 px-2 border-2 border-slate-300 bg-slate-50" name="" id="">
                            <option value="">ทั้งหมด</option>
                            <option value="">สมัคร</option>
                            <option value="">สละสิทธิ์</option>
                            <option value="">ปฏิเสธ</option>
                            <option value="">รอจ่ายมัดจำ</option>
                            <option value="">รอส่งมอบงาน</option>
                            <option value="">ส่งมอบงานแล้ว</option>
                            <option value="">รอจ่ายค่าจ้าง</option>
                        </select>
                    </div>

                    <aside className="flex flex-col gap-3">
                        {fetchedData?.map((student, index) => {
                            const name = `${student.user.salutation}${student.user.firstname}${student.user.middlename ? ` ${student.user.middlename} ` : " "}${student.user.lastname}`;
                            return (
                                <div key={index}>
                                    <DynamicStudentOffer
                                        studentId={student.userId}
                                        jobId={student.jobId}
                                        studentName={name}
                                        applicationDate={`${student.createdAt.getDate()}/${student.createdAt.getMonth()}/${student.createdAt.getFullYear()}`}
                                        applicationTime={`${student.createdAt.getHours()}:${student.createdAt.getMinutes()} น.`}
                                        status={student.status}
                                        price={`฿${student.bid.toLocaleString()}`}
                                    />
                                </div>
                            )
                        })}
                    </aside>
                </aside>
            </section>
        </main>
    );
}

export default ManagePage;