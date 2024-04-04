"use client"
import FilesInput from "@/components/public/input/fileInput/FileInput"
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton"
import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Session } from "next-auth"
import updateProfile from "@/actions/profile/updateProfile"
import Input from "../public/input/input/Input"

interface FormData {
  organization: string;
  postition: string;
  description: string;
}

export default function EditStudentProfile({
  showEditProfile,
  toggleEditProfile,
  oldDescription,
  session,
  employerId,
}: {
  showEditProfile: boolean
  toggleEditProfile: () => void
  oldDescription: string
  session: Session | null
  employerId: string
}) {
  const [formData, setFormData] = useState<FormData>({
    organization: "",
    postition: "",
    description: ""
  });
  const [profileFiles, setProfileFiles] = useState<FileList | null>(null)
  const [isDisabled, setDisabled] = useState(false)
  const [primaryLoading, setPrimaryLoading] = useState(false)

  const router = useRouter()

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditProfile = async () => {
    setPrimaryLoading((prev) => !prev)
    setDisabled(true)

    const formDataObject = new FormData()
    formDataObject.append("profile", profileFiles[0]);
    formDataObject.append("organization", formData.organization);
    formDataObject.append("position", formData.postition);
    formDataObject.append("employerId", employerId)

    const result = await updateProfile(formDataObject)
    // 3 อันคือ profileFiles, resumeFiles, description
    // profile กับ resume ถ้าอันใดอันหนึ่งไม่เป็น null ก็แก้ไขใน database
    // description แก้ไขทุกรอบที่ submit
    toast.success("แก้ไขโปรไฟล์สำเร็จ")
    setPrimaryLoading((prev) => !prev)
    setDisabled(false)
    toggleEditProfile()

    // redirect กลับมาหน้าโปรไฟล์แบบ rerender page ใหม่
  }

  return (
    showEditProfile && (
      <div
        className="w-full h-full duration-300 overflow-x-hidden fixed inset-0 z-50 bg-[#262626] bg-opacity-[60%] px-[20px]"
        onClick={() => {
          // setDescription("")
          toggleEditProfile()
        }}>
        <div className="flex justify-center">
          <div
            className=" bg-[#f8fafc] p-[20px] lg:px-[30px] lg:pb-[30px] rounded-[15px] w-full mt-[163px] lg:mt-[185px] max-w-[500px]"
            onClick={(e) => {
              e.stopPropagation()
            }}>
            <p className="font-bold text-[24px] text-slate-600 mb-[7px]">แก้ไขโปรไฟล์</p>
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
            <Input
              type="text"
              label="ชื่อบริษัท / กิจการ"
              value={formData.organization}
              name="organization"
              placeholder="สกิลบริดจ์ จำกัด (มหาชน)"
              onChange={handleChange}
              isDisabled={primaryLoading}
            />
            <Input
              type="text"
              label="ตำแหน่ง"
              value={formData.postition}
              name="position"
              placeholder="หัวหน้าแผนกการตลาด"
              onChange={handleChange}
              isDisabled={primaryLoading}
            />
            <div className="flex flex-col gap-1 flex-grow mt-[10px]">
              <label htmlFor="text-area" className="text-[14px] font-medium text-slate-900">
                คำอธิบายตัวเอง
              </label>
              <textarea
                id="text-area"
                name="description"
                className="h-[100px] rounded-[6px] border border-[#CBD5E1] px-[10px] py-[5px] "
                onChange={handleChange}
                value={formData.description}
                disabled={primaryLoading}
                placeholder="ฉันมีความสามารถในด้าน..."
              />
            </div>

            <div className="mt-[20px] flex justify-between">
              <button
                className="w-[47%] rounded-[6px] border border-[#E2E8F0] text-[#0F172A] py-[10px] hover:opacity-[80%] active:opacity-[60%]"
                onClick={() => {
                  // setDescription("")
                  toggleEditProfile()
                }}>
                ยกเลิก
              </button>
              <PrimaryButton
                type="submit"
                isDisabled={isDisabled}
                className="w-[47%] rounded-[6px] text-[#FFFFFF] bg-[#334155] py-[10px] hover:opacity-[80%] active:opacity-[60%]"
                isLoading={primaryLoading}
                onClick={handleEditProfile}
                loadingMessage="กำลังดำเนินการ">
                ยืนยันการแก้ไข
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
