import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";

const getRating = async (jobId: string, studentId: string) => {
  try {
    const review = await prisma.review.findFirstOrThrow({
      where: {
        jobId: jobId,
        studentId: studentId,
      },
      select: {
        stars: true,
      },
    });
    return {
      success: true,
      data: review.stars,
    } as const;
  } catch (error: any) {
    return {
      message: error,
      status: 500,
    } as const;
  }
};

export { getRating };
