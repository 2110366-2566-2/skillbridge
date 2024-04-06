"use server"

import uploadFileToS3 from "../public/S3/uploadFileToS3"
import { prisma } from "../../lib/prisma"
import { revalidatePath } from "next/cache"

const updateStudentProfile = async (formData: FormData) => {
  try {
    const resume = formData.get("resume") as File | undefined
    const profile = formData.get("profile") as File | undefined
    const description = formData.get("description") as string
    const studentId = formData.get("studentId") as string

    const [resumeBuf, profileBuf] = await Promise.all([
      resume ? resume.arrayBuffer() : undefined,
      profile ? profile.arrayBuffer() : undefined,
    ])

    const resumeByteArr = resumeBuf ? new Uint8Array(resumeBuf) : undefined
    const profileByteArr = profileBuf ? new Uint8Array(profileBuf) : undefined

    const [resumeImgName, profileImgName] = await Promise.all([
      resumeByteArr && resume
        ? uploadFileToS3(resumeByteArr, resume.type, resume.size, "resumes")
        : undefined,
      profileByteArr && profile
        ? uploadFileToS3(profileByteArr, profile.type, profile.size, "usersProfile")
        : undefined,
    ])

    if (resumeImgName && !resumeImgName.success) throw new Error("Error in uploading resume")
    if (profileImgName && !profileImgName.success) throw new Error("Error in uploading profile")

    const student = await prisma.user.update({
      where: {
        id: studentId,
      },
      data: {
        profileImageUrl: profileImgName?.data,
        student: {
          update: {
            resumeName: resumeImgName?.data,
            description,
          },
        },
      },
    })
    revalidatePath("/profile/[userId]", "page");
    return student
  } catch (error) {
    console.error("Error in updateProfile:", error)
    return null
  }
}

const updateEmployerProfile = async (formData: FormData) => {
  try {
    const profile = formData.get("profile") as File | undefined
    const description = formData.get("description") as string
    const organization = formData.get("organization") as string
    const position = formData.get("position") as string
    const employerId = formData.get("employerId") as string

    const [profileBuf] = await Promise.all([
      profile ? profile.arrayBuffer() : undefined,
    ])

    const profileByteArr = profileBuf ? new Uint8Array(profileBuf) : undefined

    const [profileImgName] = await Promise.all([
      profileByteArr && profile
        ? uploadFileToS3(profileByteArr, profile.type, profile.size, "usersProfile")
        : undefined,
    ])

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
    // revalidatePath("/profile/[userId]", "page");
    revalidatePath('/')
    return employer
  } catch (error) {
    console.error("Error in updateProfile:", error)
    return null
  }
}

export { updateStudentProfile, updateEmployerProfile }
