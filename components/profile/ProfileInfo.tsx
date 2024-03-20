import Image from "next/image";
import RatingScore from "./subProfile/RatingScore";

export default function ProfileInfo({
    profileImageURL,
    studentName,
    averageScore,
}: {
    profileImageURL: string,
    studentName: string,
    averageScore: number
}) {

    return (
        <div className="p-[20px] w-full border border-1 border-[#cbd5e1] rounded-md">
            <div className="flex items-center mb-[10px]">
                <div className="mr-[15px]">
                    <Image
                        src={profileImageURL ? profileImageURL : "/images/defaultProfile.svg"}
                        width={94}
                        height={94}
                        alt="profile"
                    />
                </div>
                <div className="flex flex-col mr-[10px]">

                    <p className="font-bold text-xl text-[#334155] line-clamp-1 ">
                        {studentName}
                    </p>

                    <p className="text-[13px] text-slate-600 mb-[7px]">
                        นิสิตจุฬาลงกรณ์มหาวิทยาลัย
                    </p>

                    <RatingScore averageScore={averageScore} />

                </div>
            </div>
            <div>

            </div>
        </div>
    );
}
