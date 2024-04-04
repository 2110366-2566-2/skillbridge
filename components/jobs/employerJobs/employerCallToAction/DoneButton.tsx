import { ConsoleSqlOutlined } from "@ant-design/icons";
import ProgressButton from "../ProgressButton";
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton";

export default function DoneButton({
    studentId,
    jobId,
    isReviewed,
}: {
    studentId: string;
    jobId: string;
    isReviewed: boolean;
}) {
    
    async function reviewButtonOnClick() {
        return null;
    }

    return (
        <div className="w1/2 flex flex-row justify-between">
            <ProgressButton jobId={jobId} studentId={studentId} />
            {!isReviewed ? 
                <PrimaryButton 
                    className="w-[83px] h-[36px] px-0 py-[8px]"
                    onClick={reviewButtonOnClick}
                >รีวิวนิสิต</PrimaryButton>
                : 
                <PrimaryButton 
                    className="w-[83px] h-[36px] px-0 py-[8px]"
                    isDisabled={true}
                >
                    รีวิวแล้ว
                </PrimaryButton>
            }
        </div>
    );
}
