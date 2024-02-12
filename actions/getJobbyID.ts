import prisma from "../db/prisma";

const getJobById = async (formData: FormData) => {
  const jobId = formData.get("jobID") as string;

  const result = await prisma.job.findFirst({
    select: {
      id: false,
    },
    where: {
      id: jobId,
      isDeleted: false,
    },
  });

  return result;
};

export default getJobById;
