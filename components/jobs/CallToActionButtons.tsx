import { convertStateNameToThai } from '@/lib/Jobs/adapter';
import React from 'react'
import DisclaimButton from './studentJobs/studentCallToAction/DisclaimButton';
import AnswerOfferButton from './studentJobs/studentCallToAction/AnswerOfferButton';
import AckButton from './studentJobs/studentCallToAction/AckButton';
import SubmitTaskButton from './studentJobs/studentCallToAction/SubmitTaskButton';
import ChatButton from './studentJobs/studentCallToAction/ChatButton';
import PayButton from './employerJobs/employerCallToAction/PayButton';
import QualifyCandidateButton from './employerJobs/employerCallToAction/QualifyCandidateButton';
import CancelButton from './employerJobs/employerCallToAction/CancelButton';
import ApproveButton from './employerJobs/employerCallToAction/ApproveButton';
import DefaultButton from './employerJobs/employerCallToAction/DefaultButton';

type Props = {
    jobId: string;
    studentId? :string
    status: string;
    role: string;
    employerId?: string;
}

function CallToActionButtons({jobId, studentId = "", status, role, employerId= ""}: Props) {

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
                return <SubmitTaskButton jobId={jobId} employerId={employerId} />;
                
            case "รอผู้จ้างจ่ายมัดจำ":
                return <ChatButton jobId={jobId} employerId={employerId} />;
                
            case "รอผู้จ้างจ่ายค่าจ้าง":
                return <ChatButton jobId={jobId} employerId={employerId} />;
                
            case "เสร็จสิ้น":
                return <AckButton jobId={jobId} />;
                
            case "ยกเลิก":
                return <AckButton jobId={jobId} />;
                
            case "ส่งมอบงานแล้ว":
                return <ChatButton jobId={jobId} employerId={employerId} />;     
            default:
                return <></>;
        }
    }
    else if (role === "employer")
    {
        switch (convertStateNameToThai(role, status)) {
            case "สมัคร":
                return <QualifyCandidateButton studentId={studentId} jobId={jobId} />;
            case "รอจ่ายมัดจำ":
                return <PayButton studentId={studentId} jobId={jobId} />
            case "รอส่งมอบงาน":
                return <CancelButton studentId={studentId} jobId={jobId} />
            case "ส่งมอบงานแล้ว":
                return <ApproveButton studentId={studentId} jobId={jobId} />;
            case "รอจ่ายค่าจ้าง":
                return <PayButton studentId={studentId} jobId={jobId} />;
            default:
                return <DefaultButton studentId={studentId} jobId={jobId} />;
        }
    }
}

export default CallToActionButtons;

