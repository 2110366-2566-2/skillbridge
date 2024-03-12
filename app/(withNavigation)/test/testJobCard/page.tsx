import JobStatus from "@/components/jobStatus/jobStatus";
import JobDescription from "@/components/jobStatus/jobDescription";
import StudentOffer from "@/components/studentOffer/studentOffer";
import dynamic from "next/dynamic";

export default function testJobCard() {

    const DynamicStudentOffer = dynamic(() => import("@/components/studentOffer/studentOffer"), {
        ssr: false,
        // loading: () => <p>Loading...</p> if i have more time to do this na
    })

    return (
        <main className="h-screen p-[30px] w-screen flex justify-around flex-wrap ">
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                status="กำลังรอ"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                status="ผ่านการคัดเลือก"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                status="ไม่ผ่านการคัดเลือก"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                status="รอส่งมอบงาน"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                status="รอผู้จ้างจ่ายมัดจำ"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                status="รอผู้จ้างจ่ายค่าจ้าง"
            />

            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                status="เสร็จสิ้น"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog sdfasdfasdfsdsdafasdfsdfasdfasdfasdfasdfasdfasdfasfasfasdfsdfsdfsadfasdfasdfasdf"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                status="ถูกยกเลิกงาน"
            />

            <JobDescription
                userId="001"
                jobId="001"
                jobDescription="veryhardjob"
                nubmerOfAcceptedApplication="2"
                numberOfMaximumAccepted="10"
                title="รับสมัคร TA วิชา Comp Prog asdfasdfsdfadsfasdfasdfasdfasdf"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                price="฿1,000"
            />
            <div className="flex flex-col mt-[300px]">

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
            </div>


        </main>
    )
}
