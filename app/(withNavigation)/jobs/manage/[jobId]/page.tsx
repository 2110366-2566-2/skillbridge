import React from "react";
import dynamic from "next/dynamic";

type Props = {
    params: {
        jobId: string;
    };
};

function ManagePage({ params }: Props) {

    const jobId = params.jobId;

    const DynamicStudentOffer = dynamic(() => import("@/components/studentOffer/studentOffer"), {
        ssr: false,
        // loading: () => <p>Loading...</p> if i have more time to do this na
    })

    return (
        <main className="flex flex-col">
            <section className="flex flex-row">
                <div className="flex flex-row">
                    <cite>

                    </cite>
                </div>
            </section>


            <section className="flex flex-row">
                <article>
                    {/* Job Detail of {jobId} */}
                </article>

                <aside className="flex flex-col">
                    <div className="flex flex-row">
                        {/* <p>สถานะนิสิต</p> */}
                    </div>

                    <aside className="flex flex-col">
                        <DynamicStudentOffer
                        studentId="001"
                        jobId="001"
                        studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว ฟหกฟหกฟหกฟหกฟหกฟหกฟหกฟหกฟหกฟหกฟหกฟหกฟหกหฟกฟหกฟหกฟหกฟหกฟหกฟหกฟหกหฟกฟหกฟหกฟหก"
                        applicationDate="18/10/2545"
                        applicationTime="21:59 น."
                        status="สมัคร"
                        price="฿1,000"
                        />
                        <DynamicStudentOffer
                            studentId="001"
                            jobId="001"
                            studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                            applicationDate="18/10/2545"
                            applicationTime="21:59 น."
                            status="สละสิทธิ์"
                            price="฿1,000"
                        />
                        <DynamicStudentOffer
                            studentId="001"
                            jobId="001"
                            studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                            applicationDate="18/10/2545"
                            applicationTime="21:59 น."
                            status="ปฏิเสธ"
                            price="฿1,000"
                        />
                        <DynamicStudentOffer
                            studentId="001"
                            jobId="001"
                            studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                            applicationDate="18/10/2545"
                            applicationTime="21:59 น."
                            status="รอจ่ายมัดจำ"
                            price="฿1,000"
                        />
                        <DynamicStudentOffer
                            studentId="001"
                            jobId="001"
                            studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                            applicationDate="18/10/2545"
                            applicationTime="21:59 น."
                            status="รอส่งมอบงาน"
                            price="฿1,000"
                        />
                        <DynamicStudentOffer
                            studentId="001"
                            jobId="001"
                            studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                            applicationDate="18/10/2545"
                            applicationTime="21:59 น."
                            status="ส่งมอบงานแล้ว"
                            price="฿1,000"
                        />
                        <DynamicStudentOffer
                            studentId="001"
                            jobId="001"
                            studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                            applicationDate="18/10/2545"
                            applicationTime="21:59 น."
                            status="รอจ่ายค่าจ้าง"
                            price="฿1,000"
                        />
                    </aside>
                </aside>
            </section>
        </main>
    );
}

export default ManagePage;