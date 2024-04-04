"use server"

import uploadFileToS3 from "../public/S3/uploadFileToS3"
import { prisma } from "../../lib/prisma"
import { revalidatePath } from "next/cache"

const updateEmployerProfile = async (formData: FormData) => {
  try {
    const organization = formData.get("organization") as string
    const position = formData.get("position") as string
    const profile = formData.get("profile") as File | undefined
    const description = formData.get("description") as string
    const employerId = formData.get("employerId") as string

    const profileBuf = profile ? await profile.arrayBuffer() : undefined
    const profileByteArr = profileBuf ? new Uint8Array(profileBuf) : undefined

    const profileImgName = profileByteArr && profile
      ? await uploadFileToS3(profileByteArr, profile.type, profile.size, "usersProfile")
      : undefined

    if (profileImgName && !profileImgName.success) throw new Error("Error in uploading profile")

    const employer = await prisma.user.update({
      where: {
        id: employerId,
      },
      data: {
        profileImageUrl: profileImgName?.data,
        employer: {
          update: {
            organization: organization,
            position: position,
          },
        },
      },
    })
    revalidatePath("/profile/[userId]", "page");
    return employer
  } catch (error) {
    console.error("Error in updateEmployerProfile:", error)
    return null
  }
}

export default updateEmployerProfile
