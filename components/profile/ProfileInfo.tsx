'use client'
import Image from "next/image";
import RatingScore from "./subProfile/RatingScore";
import { useRouter } from "next/navigation";

export default function ProfileInfo({
    studentId,
    profileImageURL,
    studentName,
    averageScore,
    portfolioURL,
    studentDetail,
    workingNumber,
    workingComplete
}: {
    studentId: string,
    profileImageURL: string,
    studentName: string,
    averageScore: number,
    portfolioURL: string
    studentDetail: string,
    workingNumber: string,
    workingComplete: string
}) {

    const router = useRouter();
    const isEditAble = false;
    // const isEditAble = ถ้าเป็นหน้าของตนเองก็ true ไม่ก้ false               check session ดู id ของคนที่เข้ามาดู profile ตรงกับ studentId บ่

    return (
        <div className="p-[20px] w-full border border-1 border-[#cbd5e1] rounded-md">
            <div className="flex items-center mb-[10px] ">
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

            {
                portfolioURL &&
                <div className="w-full px-[16px] flex items-center py-[8px] bg-[#cbd5e1] rounded-lg hover:underline hover:underline-offset-2 cursor-pointer pt-[10px]"
                    onClick={() => router.push(portfolioURL)}
                >
                    <Image src={'/icons/file.svg'} width={15} height={15} alt="file" className="mr-[15px]" />
                    <p className="text-[16px] font-medium text-slate-600 text-center">
                        แฟ้มสะสมผลงาน
                    </p>
                </div>
            }

            {
                studentDetail &&
                <div className="pt-[10px] mt-[10px] border-t border-[#cbd5e1]">
                    <p className="line-clamp-5 text-[13px] text-[#64748B]">
                        {studentDetail}
                    </p>
                </div>
            }

            <div className="flex items-center justify-center border-t border-[#cbd5e1] pt-[10px] mt-[10px]">
                <div className="flex items-center mr-[35px]">
                    <Image src={'/icons/bag.svg'} width={45} height={42} alt="bag" className="mr-[10px]" />
                    <div className="flex flex-col pt-[5px]">
                        <p className="text-[12px] text-[#475569]">
                            รับงานแล้ว
                        </p>
                        <p className="text-[16px] text-[#475569] font-bold">
                            {workingNumber} คน
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <Image src={'/icons/checkHand.svg'} width={69} height={42} alt="check hand" className="mr-[10px]" />
                    <div className="flex flex-col pt-[5px] text-center">
                        <p className="text-[12px] text-[#475569]">
                            อัตราสำเร็จ
                        </p>
                        <p className="text-[16px] text-[#475569] font-bold">
                            {workingComplete} %
                        </p>
                    </div>
                </div>
            </div>

            {
                isEditAble &&
                <div className="w-full h-[40px] flex items-center justify-center rounded-[6px] border border-1 border-slate-300 cursor-pointer hover:underline hover:underline-offset-2 mt-[10px]">
                    <p className="text-[14px] font-medium text-slate-600">
                        แก้ไขโปรไฟล์
                    </p>
                </div>
            }

        </div>
    );
}
