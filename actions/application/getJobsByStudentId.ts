import { prisma } from "../../lib/prisma"

const getJobsByStudentId = async (studentId: string) => {
  try {
    const jobs = await prisma.application.findMany({
      where: {
        userId: studentId,
        status: {
          in: ["IN_PROGRESS", "DELIVERED", "WAGE_PAYMENT_PENDING", "DEPOSIT_PENDING", "DONE"],
        },
      },
      include: {
        job: {
          select: {
            title: true,
            estimateEndDate: true,
            estimateStartDate: true,
            jobTag: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    })
    return jobs
  } catch (err) {
    console.log("Error fetching jobs")
    return []
  }
}

export default getJobsByStudentId
