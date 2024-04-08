"use server";

import { string } from "zod";
import { prisma } from "../../lib/prisma";
import getS3URL from "../public/S3/getS3URL";
import noavatar from "@/public/icons/noavatar.svg";

const getProfileImage = async (userId: string) => {
  const noavatarImage = noavatar as string;
  try {
    const profileImageObject = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        profileImageUrl: true,
      },
    });

    if (profileImageObject?.profileImageUrl) {
      const res = await getS3URL(profileImageObject.profileImageUrl);
      if (res.success) {
        const data = res.data as string;
        return data;
      } else {
        return noavatarImage;
      }
    } else {
      return noavatarImage;
    }
  } catch (error) {
    console.error("Error in get profile image:", error);
    return noavatarImage;
  }
};

export default getProfileImage;
