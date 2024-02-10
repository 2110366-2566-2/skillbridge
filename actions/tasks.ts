"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface job {
  title: string;
  startDate: string | undefined;
  endDate: string | undefined;
  jobTags: string[];
  description: string;
  acceptNum: number;
  maxAcceptNum: number;
  price: number;
}

async function getDefaultSearchJobs(): Promise<job[]> {
  const output: job[] = [];

  const jobs = await prisma.job.findMany({
    include: {
      jobTags: true,
      Applied: true,
    },
  });

  // TODO : Filter for only jobs that are open
  // Waiting for enum to finalize so it can check
  jobs.forEach(
    (job: {
      jobTags: any[];
      title: any;
      startDate: { toLocaleDateString: (arg0: string) => any };
      endDate: { toLocaleDateString: (arg0: string) => any };
      description: any;
      Applied: string | any[];
    }) => {
      const tags = job.jobTags.map((tag: { title: any }) => String(tag.title));

      const showJob: job = {
        title: job.title,
        startDate: job.startDate?.toLocaleDateString("en-GB"),
        endDate: job.endDate?.toLocaleDateString("en-GB"),
        jobTags: tags,
        description: job.description,
        acceptNum: job.Applied.length, //TODO : Filter for accepted application
        maxAcceptNum: 1000, //TODO : Wait for db schema to change
        price: 8888, //TODO : Wait for db schema to change
      };

      output.push(showJob);
    },
  );

  output.sort((a, b) => {
    const aAcceptRate = a.acceptNum / a.maxAcceptNum;
    const bAcceptRate = b.acceptNum / b.maxAcceptNum;

    return aAcceptRate - bAcceptRate;
  });

  return output;
}

/*
async function main() {
    const jobs = await getDefaultSearchJobs();

    console.log(jobs);
}

main();
*/

export { getDefaultSearchJobs };
