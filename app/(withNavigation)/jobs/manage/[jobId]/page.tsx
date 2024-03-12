import StudentOffer from "@/components/studentOffer/studentOffer";
import React from "react";

type Props = {
    params: {
        jobId: string;
    };
};

function ManagePage({ params }: Props) {

    const jobId = params.jobId;

    return (
        <section className="flex flex-col">
            <StudentOffer
                studentId="001"
                jobId="001"
                studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                applicationDate="18/10/2545"
                applicationTime="21:59 น."
                status="สมัคร"
                price="฿1,000"
            />

            <StudentOffer
                studentId="001"
                jobId="001"
                studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                applicationDate="18/10/2545"
                applicationTime="21:59 น."
                status="สละสิทธิ์"
                price="฿1,000"
            />

            <StudentOffer
                studentId="001"
                jobId="001"
                studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                applicationDate="18/10/2545"
                applicationTime="21:59 น."
                status="ปฏิเสธ"
                price="฿1,000"
            />

            <StudentOffer
                studentId="001"
                jobId="001"
                studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                applicationDate="18/10/2545"
                applicationTime="21:59 น."
                status="รอจ่ายมัดจำ"
                price="฿1,000"
            />

            <StudentOffer
                studentId="001"
                jobId="001"
                studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                applicationDate="18/10/2545"
                applicationTime="21:59 น."
                status="รอส่งมอบงาน"
                price="฿1,000"
            />

            <StudentOffer
                studentId="001"
                jobId="001"
                studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                applicationDate="18/10/2545"
                applicationTime="21:59 น."
                status="ส่งมอบงานแล้ว"
                price="฿1,000"
            />

            <StudentOffer
                studentId="001"
                jobId="001"
                studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                applicationDate="18/10/2545"
                applicationTime="21:59 น."
                status="รอจ่ายค่าจ้าง"
                price="฿1,000"
            />
        </section>
    );
}

export default ManagePage;