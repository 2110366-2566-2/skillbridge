"use server";

import { prisma } from "../../lib/prisma";

const getIsStudent = async (userId: string) => {
  try {
    const result = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        student: true,
        employer: true,
      },
    });

    if (result?.student) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error in get isStudent:", error);
    return false;
  }
};

export default getIsStudent;
