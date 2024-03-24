import { prisma } from "../../lib/prisma"

const getJobsByStudentId = async (studentId: string) => {
  try {
    const jobs = await prisma.application.findMany({
      where: {
        userId: studentId,
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
