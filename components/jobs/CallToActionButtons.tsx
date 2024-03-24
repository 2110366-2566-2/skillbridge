import { convertStateNameToThai } from '@/lib/Jobs/adapter';
import React from 'react'
import DisclaimButton from './studentJobs/studentCallToAction/DisclaimButton';
import AnswerOfferButton from './studentJobs/studentCallToAction/AnswerOfferButton';
import AckButton from './studentJobs/studentCallToAction/AckButton';
import SubmitTaskButton from './studentJobs/studentCallToAction/SubmitTaskButton';
import ChatButton from './studentJobs/studentCallToAction/ChatButton';
import WaitedForDepositStatus from './employerJobs/employerCallToAction/waitedForDepositStatus';
import AppliedStatus from './employerJobs/employerCallToAction/appliedStatus';
import WaitedForSubmissionStatus from './employerJobs/employerCallToAction/waitedForSubmissionStatus';
import SubmittedStatus from './employerJobs/employerCallToAction/submittedStatus';
import WaitedForWageStatus from './employerJobs/employerCallToAction/waitedForWageStatus';

type Props = {
    jobId: string;
    studentId? :string
    status: string;
    role: string;
}

function CallToActionButtons({jobId, studentId = "", status, role}: Props) {

    if(role === "student")
    {
        switch (convertStateNameToThai(role, status)) {
            case "กำลังรอ":
                return <DisclaimButton jobId={jobId} />;
            case "ผ่านการคัดเลือก":
                return <AnswerOfferButton jobId={jobId} />;
                
            case "ไม่ผ่านการคัดเลือก":
                return <AckButton jobId={jobId} />;
                
            case "รอส่งมอบงาน":
                return <SubmitTaskButton jobId={jobId} />;
                
            case "รอผู้จ้างจ่ายมัดจำ":
                return <ChatButton jobId={jobId} />;
                
            case "รอผู้จ้างจ่ายค่าจ้าง":
                return <ChatButton jobId={jobId} />;
                
            case "เสร็จสิ้น":
                return <AckButton jobId={jobId} />;
                
            case "ยกเลิก":
                return <AckButton jobId={jobId} />;
                
            case "ส่งมอบงานแล้ว":
                return <ChatButton jobId={jobId} />;     
            default:
                return <></>;
        }
    }
    else if (role === "employer")
    {
        switch (convertStateNameToThai(role, status)) {
            case "สมัคร":
                return <AppliedStatus studentId={studentId} jobId={jobId} />;
            case "สละสิทธิ์":
                return <></>;
            case "รอจ่ายมัดจำ":
                return <WaitedForDepositStatus studentId={studentId} jobId={jobId} />
            case "รอส่งมอบงาน":
                return <WaitedForSubmissionStatus studentId={studentId} jobId={jobId} />
            case "ส่งมอบงานแล้ว":
                return <SubmittedStatus studentId={studentId} jobId={jobId} />;
            case "รอจ่ายค่าจ้าง":
                return <WaitedForWageStatus studentId={studentId} jobId={jobId} />
            case "เสร็จสิ้น":
                return <></>;
            default:
                return <></>;
        }
    }
}

export default CallToActionButtons;

