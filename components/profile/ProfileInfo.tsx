'use client'
import Image from "next/image";
import RatingScore from "./subProfile/RatingScore";
import { useRouter } from "next/navigation";

export default function ProfileInfo({
    profileImageURL,
    studentName,
    averageScore,
    portfolioURL,
    studentDetail,
}: {
    profileImageURL: string,
    studentName: string,
    averageScore: number,
    portfolioURL: string
    studentDetail: string,
}) {

    const router = useRouter();

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

            <div className="w-full px-[16px] flex items-center py-[8px] bg-[#cbd5e1] rounded-lg hover:underline hover:underline-offset-2 cursor-pointer mb-[10px]"
                onClick={() => router.push(portfolioURL)}
            >
                <Image src={'/icons/file.svg'} width={15} height={15} alt="file" className="mr-[15px]" />
                <p className="text-[16px] font-medium text-slate-600 text-center">
                    แฟ้มสะสมผลงาน
                </p>
            </div>

            <div className="py-[15px] border-y border-[#cbd5e1] mb-[10px]">
                <p className="line-clamp-5 text-[13px] text-[#64748B]">
                    {studentDetail}
                </p>
            </div>
        </div>
    );
}
