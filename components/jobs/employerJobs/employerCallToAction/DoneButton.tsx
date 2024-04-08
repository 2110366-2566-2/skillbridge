import { ConsoleSqlOutlined } from "@ant-design/icons";
import ProgressButton from "../ProgressButton";
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton";
import EditProfile from "@/components/profile/EditProfile";
import ReviewModal from "../review/ReviewModal";
import { useState } from "react";

export default function DoneButton({
    studentId,
    jobId,
    isReviewed,
}: {
    studentId: string;
    jobId: string;
    isReviewed: boolean;
}) {

    // isReviewed = false; // for testing purpose DONT FORGET TO REMOVE THIS LINE
    
    const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
    const [reviewAble, setReviewAble] = useState<boolean>(!isReviewed);
    
    async function reviewButtonOnClick() {
        setShowReviewModal(true);
        return null;
    }

    return (
        <div className="w1/2 flex flex-row justify-between">
            <ProgressButton jobId={jobId} studentId={studentId} />
            {reviewAble ? 
                <PrimaryButton 
                    className="w-[83px] h-[36px] !px-[0px] py-[8px]"
                    onClick={reviewButtonOnClick}
                >รีวิวนิสิต</PrimaryButton>
                : 
                <PrimaryButton 
                    className="w-[83px] h-[36px] !px-[0px] py-[8px]"
                    isDisabled={true}
                >
                    รีวิวแล้ว
                </PrimaryButton>
            }
            {
                showReviewModal ? 
                    <ReviewModal
                        studentId={studentId}
                        jobId={jobId} 
                        setShowReviewModal={setShowReviewModal}
                        setReviewAble={setReviewAble}
                    /> : 
                    null
            }
        </div>
    );
}
