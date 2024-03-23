import { convertStateNameToThai } from '@/lib/Jobs/adapter';
import React from 'react'
import DisclaimButton from './studentJobs/studentCallToAction/DisclaimButton';
import AnswerOfferButton from './studentJobs/studentCallToAction/AnswerOfferButton';
import AckButton from './studentJobs/studentCallToAction/AckButton';
import SubmitTaskButton from './studentJobs/studentCallToAction/SubmitTaskButton';
import ChatButton from './studentJobs/studentCallToAction/ChatButton';

type Props = {
    jobId: string;
    status: string;
    role: string;
}

function CallToActionButtons({jobId, status, role}: Props) {
    if(role === "student")
    {
        switch (convertStateNameToThai("student", status)) {
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
                return <div></div>;
        }
    }
}

export default CallToActionButtons;

