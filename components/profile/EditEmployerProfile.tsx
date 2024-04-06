"use client"
import FilesInput from "@/components/public/input/fileInput/FileInput"
import PrimaryButton from "@/components/public/buttons/primaryButton/PrimaryButton"
import toast from "react-hot-toast"
import { ChangeEvent, useState } from "react"
import { Session } from "next-auth"
import { updateEmployerProfile } from "@/actions/profile/updateStudentProfile"
import Input from "../public/input/input/Input"
import SecondaryButton from "../public/buttons/secondaryButton/SecondaryButton"

interface FormData {
  organization: string;
  position: string;
  description: string;
}

export default function EditEmployerProfile({
  showEditProfile,
  toggleEditProfile,
  prevDescription,
  prevOrganization,
  prevPosition,
  employerId,
}: {
  showEditProfile: boolean
  toggleEditProfile: () => void
  prevDescription: string
  prevOrganization: string
  prevPosition: string
  session: Session | null
  employerId: string
}) {
  const [formData, setFormData] = useState<FormData>({
    organization: prevOrganization,
    position: prevPosition,
    description: prevDescription
  });
  const [profileFiles, setProfileFiles] = useState<FileList | null>(null)
  const [primaryLoading, setPrimaryLoading] = useState(false)

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
    // construct formDataObject
    const formDataObject = new FormData()
    profileFiles ? formDataObject.append("profile", profileFiles[0]) : null
    formDataObject.append("organization", formData.organization);
    formDataObject.append("position", formData.position);
    formDataObject.append("employerId", employerId)
    // update profile on backend
    const result = await updateEmployerProfile(formDataObject)
    if(result) {
      toast.success("แก้ไขโปรไฟล์สำเร็จ")
    } else {
      toast.error("แก้ไขโปรไฟล์ไม่สำเร็จ")
    }
    setPrimaryLoading((prev) => !prev)
    toggleEditProfile()
  }

  return (
    showEditProfile && (
      <div
        className="w-full h-full duration-300 overflow-x-hidden fixed inset-0 z-50 bg-[#262626] bg-opacity-[60%] px-[20px]"
        onClick={() => {
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
              isDisabled={primaryLoading}
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
              value={formData.position}
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
                className="h-[100px] rounded-[6px] border border-[#CBD5E1] px-[10px] py-[5px] bg-slate-50 disabled:opacity-60"
                onChange={handleChange}
                value={formData.description}
                disabled={primaryLoading}
                placeholder="ฉันมีความสามารถในด้าน..."
              />
            </div>

            <div className="mt-[20px] flex gap-5">
              <SecondaryButton
                isDisabled={primaryLoading}
                onClick={() => toggleEditProfile()}
                className="w-full"
              >
                ยกเลิก
              </SecondaryButton>
              <PrimaryButton
                type="submit"
                className="w-full"
                isDisabled={primaryLoading}
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
