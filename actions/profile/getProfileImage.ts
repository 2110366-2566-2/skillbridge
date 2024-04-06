"use server"

import { prisma } from "../../lib/prisma"
import getS3URL from "../public/S3/getS3URL"

const getProfileImage = async (userId: string) => {
  try {
    const profileImageObject = await prisma.user.findFirst({
        where: {
            id: userId
        },
        select: {
            profileImageUrl: true
        }
    });

    if(profileImageObject?.profileImageUrl) {
        const res = await getS3URL(profileImageObject.profileImageUrl);
        if(res.success) {
            return res.data
        } else {
            return ""
        }
    } else {
        return ""
    }
  } catch (error) {
    console.error("Error in get profile image:", error)
    return ""
  }
}

export default getProfileImage

