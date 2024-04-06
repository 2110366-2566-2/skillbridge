import RatingStars from "./RatingStars";
import { Dispatch, SetStateAction, useState } from "react";
import TextAreaInput from "@/components/public/input/textAreaInput/TextAreaInput";
import SecondaryButton from "@/components/public/buttons/secondaryButton/SecondaryButton";
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton";
import toast from "react-hot-toast";
import { reqBody } from "@/app/api/review/postBody";

/*
width: Fixed (380px)px;
height: Fixed (334px)px;
top: 56px;
left: -117px;
padding: 20px 0px 0px 0px;
gap: 20px;
border-radius: 15px 0px 0px 0px;
opacity: 0px;
*/
export default function ReviewModal({
    studentId,
    jobId,
    setShowReviewModal,
    setReviewAble
}: {
    studentId: string,
    jobId: string,
    setShowReviewModal: Dispatch<SetStateAction<boolean>>,
    setReviewAble: Dispatch<SetStateAction<boolean>>
}) {
    const [stars, setStars] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [isLoding, setIsLoading] = useState<boolean>(false);

    async function createReview() {
        console.log("creating a review");
        setIsLoading(true);

        const review: reqBody = {
            jobId: jobId,
            studentId: studentId,
            stars: stars,
            description: description
        }

        try {
            const response = await fetch("http://localhost:3000/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(review)
            });

            if (response.status !== 201) {
                toast.error("รีวิวไม่สำเร็จ");
                setIsLoading(false);
                return;
            }

            toast.success("รีวิวสำเร็จ");
            setIsLoading(false);
            setReviewAble(false);
            setShowReviewModal(false);
        } catch (err) {
            toast.error("รีวิวไม่สำเร็จ");
            setIsLoading(false);
        }
    }
    
    return (
        <div 
            className="w-full h-full duration-300 overflow-x-hidden fixed inset-0 z-50 bg-[#262626] bg-opacity-[60%] px-[20px] flex flex-col justify-center items-center"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    setShowReviewModal(false);
                }
            }}
        >
            <div className="bg-[#f8fafc] rounded-[15px] w-[380px] h-[334px] p-[20px]">
                <p className="font-bold text-[24px] leading-[16px] h-[17px] mb-[20px] text-[#475569]">รีวิวนิสิต</p>
                <p className="font-medium text-[14px] leading-[14px] h-[14px] mb-[15px] text-[#475569]">ให้คะแนนความพึงพอใจ</p>
                <RatingStars stars={stars} setStars={setStars} className="mb-[20px]" isLoading={isLoding}/>
                <p className="font-medium text-[14px] leading-[14px] h-[14px] text-[#475569] mb-[8px]">เขียนรีวิว</p>
                <div className="h-[104px] m-0 p-0">
                    <TextAreaInput 
                        label={""} 
                        value={description} 
                        name={""} 
                        placeholder={"เขียนรีวิวนิสิตที่นี่"} 
                        onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => {
                            setDescription(e.target.value);
                        }} 
                        isDisabled={isLoding} 
                    />
                </div>
                <div className="flex flex-row gap-[20px]">
                    <SecondaryButton 
                        className="w-[160px]" 
                        isDisabled={isLoding}
                        isLoading={false}
                        loadingMessage="ยกเลิก"
                        onClick={() => {setShowReviewModal(false);}}
                    >
                        ยกเลิก
                    </SecondaryButton>
                    <PrimaryButton 
                        className="w-[160px]"
                        isDisabled={isLoding}
                        isLoading={isLoding}
                        loadingMessage="กำลังดำเนินการ"
                        onClick={() => {createReview()}}
                    >
                        ยืนยัน
                    </PrimaryButton>
                </div>
            </div>
        </div>
    )
}