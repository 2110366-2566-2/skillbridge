import JobStatus from "@/components/jobStatus/jobStatus";
import JobDescription from "@/components/jobStatus/jobDescription";
import StudentOffer from "@/components/studentOffer/studentOffer";

export default function testJobCard() {
    return (
        <main className="h-screen p-[30px] w-screen flex justify-around flex-wrap ">
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                startDate={"18/10/2545"}
                endDate={"21/10/2545"}
                category="การสอน"
                status="กำลังรอ"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                startDate={"18/10/2545"}
                endDate={"21/10/2545"}
                category="การสอน"
                status="ผ่านการคัดเลือก"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                startDate={"18/10/2545"}
                endDate={"21/10/2545"}
                category="การสอน"
                status="ไม่ผ่านการคัดเลือก"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                startDate={"18/10/2545"}
                endDate={"21/10/2545"}
                category="การสอน"
                status="รอส่งมอบงาน"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                startDate={"18/10/2545"}
                endDate={"21/10/2545"}
                category="การสอน"
                status="รอผู้จ้างจ่ายมัดจำ"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                startDate={"18/10/2545"}
                endDate={"21/10/2545"}
                category="การสอน"
                status="รอผู้จ้างจ่ายค่าจ้าง"
            />

            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                startDate={"18/10/2545"}
                endDate={"21/10/2545"}
                category="การสอน"
                status="เสร็จสิ้น"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog sdfasdfasdfsdsdafasdfsdfasdfasdfasdfasdfasdfasdfasfasfasdfsdfsdfsadfasdfasdfasdf"
                startDate={"18/10/2545"}
                endDate={"21/10/2545"}
                category="การสอน"
                status="ถูกยกเลิกงาน"
            />

            <JobDescription
                jobId="001"
                jobDescription="veryhardjob"
                nubmerOfAcceptedApplication="2"
                numberOfMaximumAccepted="10"
                title="รับสมัคร TA วิชา Comp Prog asdfasdfsdfadsfasdfasdfasdfasdf"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                price="฿1,000"
            />

            <StudentOffer
                studentId="001"
                jobId="001"
                studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                applicationDate="18/10/2545"
                applicationTime="21:59 น."
                status="สมัคร"
                price="฿1,000"
            />
        </main>
    );
}
