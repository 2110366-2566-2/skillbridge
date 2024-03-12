import React from 'react'
import JobStatus from '../jobStatus/jobStatus'
import JobDescription from '../jobStatus/jobDescription'
import StudentOffer from '../studentOffer/studentOffer'

type Props = {}

function StudentJobsPanel({}: Props) {
  return (
    <main className="flex flex-col">
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
        {true ? (
            <>
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
            <StudentOffer
                studentId="001"
                jobId="001"
                studentName="นายกออากอกา ชอบกินไก่ใส่ไข่ดาว"
                applicationDate="18/10/2545"
                applicationTime="21:59 น."
                status="สมัคร"
                price="฿1,000"
            />
            </>
        ) : (
          <div className="flex justify-center items-center">
            <div className="font-medium text-lg text-slate-500 mt-4 mx-auto md:text-2xl md:my-6 lg:font-normal">
              ขออภัย ไม่พบงานที่ค้นหา
            </div>
          </div>
        )}
      </main>
    </main>
  )
}

export default StudentJobsPanel