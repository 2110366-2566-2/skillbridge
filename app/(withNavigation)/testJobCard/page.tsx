import JobStatus from "@/components/jobStatus/jobStatus";
import JobDescription from "@/components/jobStatus/jobDescription";

export default function testJobCard() {

    return (
        <main className="h-screen p-[30px]">

            <JobDescription
                userId="001"
                jobId="001"
                jobDescription="รักการสอนเด็ก ๆ, มีความรู้ python numpy"
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
