"use client";
import FilesInput from "@/components/public/input/fileInput/FileInput";
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfile({
    showEditProfile,
    toggleEditProfile,
    oldDescription,
}: {
    showEditProfile: boolean,
    toggleEditProfile: () => void
    oldDescription: string
}) {

    const [profileFiles, setProfileFiles] = useState<FileList | null>(null);
    const [resumeFiles, setResumeFiles] = useState<FileList | null>(null);
    const [description, setDescription] = useState(oldDescription);
    const [isDisabled, setDisabled] = useState(false);
    const [primaryLoading, setPrimaryLoading] = useState(false);

    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    }

    const handleEditProfile = async () => {
        setPrimaryLoading((prev) => !prev);
        setDisabled(true);

        // if (!session) {
        //     console.log("No session");

        //     router.push("/login");
        //     return;
        //   }

        // 3 อันคือ profileFiles, resumeFiles, description
        // profile กับ resume ถ้าอันใดอันหนึ่งไม่เป็น null ก็แก้ไขใน database
        // description แก้ไขทุกรอบที่ submit
        setTimeout(() => {
            toast.success("แก้ไขโปรไฟล์สำเร็จ");
            setPrimaryLoading((prev) => !prev);
            setDisabled(false);
        }, 2000);

        // redirect กลับมาหน้าโปรไฟล์แบบ rerender page ใหม่

    }


    return showEditProfile &&
        <div className="w-full h-full duration-300 overflow-x-hidden fixed inset-0 z-50 bg-[#262626] bg-opacity-[60%] px-[20px]"
            onClick={() => { setDescription(''); toggleEditProfile() }}>
            <div className="flex justify-center">
                <div className=" bg-[#f8fafc] p-[20px] lg:px-[30px] lg:pb-[30px] rounded-[15px] w-full mt-[163px] lg:mt-[185px] max-w-[500px]" onClick={(e) => { e.stopPropagation(); }}>
                    <p className="font-bold text-[24px] text-slate-600 mb-[7px]">
                        แก้ไขโปรไฟล์
                    </p>
                    <form action={handleEditProfile}>
                        <FilesInput
                            label="อัพโหลดรูปโปรไฟล์"
                            files={profileFiles}
                            setFiles={setProfileFiles}
                            isDisabled={isDisabled}
                            isPdfAllow={false}
                            isImageAllow={true}
                            isMultipleFilesAllow={false}
                            maxSizeInMegaByte={5}
                        />
                        <FilesInput
                            label="อัพโหลดแฟ้มสะสมผลงาน"
                            files={resumeFiles}
                            setFiles={setResumeFiles}
                            isDisabled={isDisabled}
                            isPdfAllow={true}
                            isImageAllow={false}
                            isMultipleFilesAllow={false}
                            maxSizeInMegaByte={10}
                        />
                        <div className="flex flex-col gap-1 flex-grow mt-[10px]">
                            <label
                                htmlFor="text-area"
                                className="text-[14px] font-medium text-slate-900"
                            >
                                คำอธิบายตัวเอง
                            </label>
                            <textarea id="text-area" name="description" className="h-[100px] rounded-[6px] border border-[#CBD5E1] px-[10px] py-[5px] "
                                onChange={handleChange} value={description}>

                            </textarea>
                        </div>
                    </form>
                    <div className="mt-[20px] flex justify-between">
                        <button className="w-[47%] rounded-[6px] border border-[#E2E8F0] text-[#0F172A] py-[10px] hover:opacity-[80%] active:opacity-[60%]" onClick={() => { setDescription(''); toggleEditProfile() }}>
                            ยกเลิก
                        </button>
                        <PrimaryButton
                            type="submit"
                            isDisabled={isDisabled}
                            className="w-[47%] rounded-[6px] text-[#FFFFFF] bg-[#334155] py-[10px] hover:opacity-[80%] active:opacity-[60%]"
                            isLoading={primaryLoading}
                            loadingMessage="กำลังดำเนินการ"
                        >
                            ยืนยันการแก้ไข
                        </PrimaryButton>

                    </div>
                </div>

            </div>
        </div>

}
