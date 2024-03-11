import JobStatus from "@/components/jobStatus/jobStatus"

export default function testJobCard() {

    return (
        <main className="h-screen p-[30px]">
            <JobStatus
                userId="001"
                jobId="001"
                title="รับสมัคร TA วิชา Comp Prog"
                period="18/10/2545 - 21/10/2545"
                tag="การสอน"
                status="ถูกยกเลิกงาน"
            />
        </main>
    )
}
