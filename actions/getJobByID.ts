import prisma from "../db/prisma";

const getJobById = async (formData: FormData) => {
  const jobId = formData.get("jobId") as string;
  console.log(jobId);
  const result = await prisma.job.findFirst({
    where: {
      id: jobId,
    },
  });

  return result;
};

export default getJobById;

const main = async () => {
  const data = {
    jobId: "bdf21ad2-c998-4e38-85af-e888df8c6759",
  };
  let formData = new FormData();
  Object.keys(data).forEach((key) =>
    formData.append(key, data[key as keyof typeof data])
  );
  const result = await getJobById(formData);
  console.log(result);
};

main();
