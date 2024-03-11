import JobStatus from "@/components/jobStatus/jobStatus";
import JobDescription from "@/components/jobStatus/jobDescription";

export default function testJobCard() {

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
                status="รอผู้จ่างจ่ายมัดจำ"
            />
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                status="รอผู้จ่างจ่ายค่าจ้าง"
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
                title="รับสมัคร TA วิชา Comp Progsdfasdfasdfsdsdafasdfsdfasdfasdfasdfasdfasdfasdfasfasfasdfsdfsdfsadfasdfasdfasdf"
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
                title="รับสมัคร TA วิชา Comp Prog"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                price="฿1,000"

            />
        </main>
    )
}
