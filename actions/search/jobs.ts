"use server";
import { JobStatus, ApplicationStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { Client } from "@elastic/elasticsearch";

const elasticClient = new Client({
  node: process.env.ELASTIC_NODE_URL, // Elasticsearch endpoint
  auth: {
    apiKey: {
      // API key ID and secret
      id: process.env.ELASTIC_API_ID ? process.env.ELASTIC_API_ID : "",
      api_key: process.env.ELASTIC_API_KEY ? process.env.ELASTIC_API_KEY : "",
    },
  },
});

export interface job {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  jobTags: string;
  description: string;
  acceptNum: number;
  maxAcceptNum: number;
  budget: number;
}

export interface jobFilter {
  startDate?: Date;
  endDate?: Date;
  lowestBudget?: number;
  highestBudget?: number;
  jobTag?: string;
}

interface elasticJob {
  id: string;
  title: string;
}

async function getDefaultSearchJobs(): Promise<job[]> {
  const output: job[] = [];

  const jobs = await prisma.job.findMany({
    include: {
      jobTag: true,
      applications: true,
    },
    where: {
      status: {
        equals: JobStatus.NOT_STARTED,
      },
      isDeleted: false,
    },
    take: 12,
  });

  jobs.forEach((job) => {
    const showJob: job = {
      id: job.id,
      title: job.title,
      startDate: job.estimateStartDate.toLocaleDateString("en-GB"),
      endDate: job.estimateEndDate.toLocaleDateString("en-GB"),
      jobTags: job.jobTag.title,
      description: job.description ? job.description : "",
      acceptNum: job.applications.filter(
        (app: any) => {
          return (
            app.status == ApplicationStatus.DEPOSIT_PENDING ||
            app.status == ApplicationStatus.IN_PROGRESS ||
            app.status == ApplicationStatus.DELIVERED ||
            app.status == ApplicationStatus.WAGE_PAYMENT_PENDING ||
            app.status == ApplicationStatus.DONE
          );
        }
      ).length, //TODO : Filter for accepted application
      maxAcceptNum: job.numWorker,
      budget: job.budget,
    };

    output.push(showJob);
  });

  output.sort((a, b) => {
    const aAcceptRate = a.acceptNum / a.maxAcceptNum;
    const bAcceptRate = b.acceptNum / b.maxAcceptNum;

    return aAcceptRate - bAcceptRate;
  });

  return output;
}
/*
TODO
1. write getSearchJobs without filter functionality
2. add filter functionality
*/
async function getSearchJobs(
  query?: string,
  filter?: jobFilter,
): Promise<job[]> {
  /*
          Filter is yet to be implemented
      */

  /*
      get jobs that match query with title
      steps:
      1. query in elastic search for all the jobs matches
      2. query in psql to get necessarily details
      3. format the data for ease of use in frontend page
      */

  if (query == null) {
    const output: job[] = [];

    let prismaWhereFromFilter = filter
      ? getPrismaWhereFromJobFilter(filter)
      : {};

    const jobs = await prisma.job.findMany({
      include: {
        jobTag: true,
        applications: true,
      },
      where: {
        status: {
          equals: JobStatus.NOT_STARTED,
        },
        isDeleted: false,
        ...prismaWhereFromFilter,
      },
      take: 12,
    });

    jobs.forEach((job) => {
      const showJob: job = {
        id: job.id,
        title: job.title,
        startDate: job.estimateStartDate.toLocaleDateString("en-GB"),
        endDate: job.estimateEndDate.toLocaleDateString("en-GB"),
        jobTags: job.jobTag.title,
        description: job.description ? job.description : "",
        acceptNum: job.applications.filter(
          (app: any) => {
            return (
              app.status == ApplicationStatus.DEPOSIT_PENDING ||
              app.status == ApplicationStatus.IN_PROGRESS ||
              app.status == ApplicationStatus.DELIVERED ||
              app.status == ApplicationStatus.WAGE_PAYMENT_PENDING ||
              app.status == ApplicationStatus.DONE
            );
          }
        ).length, //TODO : Filter for accepted application
        maxAcceptNum: job.numWorker,
        budget: job.budget,
      };

      output.push(showJob);
    });

    output.sort((a, b) => {
      const aAcceptRate = a.acceptNum / a.maxAcceptNum;
      const bAcceptRate = b.acceptNum / b.maxAcceptNum;

      return aAcceptRate - bAcceptRate;
    });

    return output;
  }

  /* STEP 1 */
  const res = await elasticClient.search<elasticJob>({
    index: "job_1",
    body: {
      query: {
        match: {
          title: {
            query: query,
            fuzziness: "AUTO",
          },
        },
      },
    },
  });

  // extract jobId from request
  const resJobId = res.hits.hits.map((e) => {
    if (!e._source) return "";
    return e._source.id;
  });

  const output: job[] = [];

  let prismaWhereFromFilter = filter ? getPrismaWhereFromJobFilter(filter) : {};

  const jobs = await prisma.job.findMany({
    include: {
      jobTag: true,
      applications: true,
    },
    where: {
      status: {
        equals: JobStatus.NOT_STARTED,
      },
      isDeleted: false,
      id: {
        in: resJobId,
      },
      ...prismaWhereFromFilter,
    },
    take: 12,
  });

  jobs.forEach((job) => {
    const showJob: job = {
      id: job.id,
      title: job.title,
      startDate: job.estimateStartDate.toLocaleDateString("en-GB"),
      endDate: job.estimateEndDate.toLocaleDateString("en-GB"),
      jobTags: job.jobTag.title,
      description: job.description ? job.description : "",
      acceptNum: job.applications.filter(
        (app: any) => {
          return (
            app.status == ApplicationStatus.DEPOSIT_PENDING ||
            app.status == ApplicationStatus.IN_PROGRESS ||
            app.status == ApplicationStatus.DELIVERED ||
            app.status == ApplicationStatus.WAGE_PAYMENT_PENDING ||
            app.status == ApplicationStatus.DONE
          );
        }
      ).length, //TODO : Filter for accepted application
      maxAcceptNum: job.numWorker,
      budget: job.budget,
    };

    output.push(showJob);
  });

  output.sort((a, b) => {
    const aAcceptRate = a.acceptNum / a.maxAcceptNum;
    const bAcceptRate = b.acceptNum / b.maxAcceptNum;

    return aAcceptRate - bAcceptRate;
  });

  return output;
}

function getPrismaWhereFromJobFilter(filter: jobFilter) {
  let prismaWhereFilter: any = {};

  if (filter == undefined) return {};

  if (filter.startDate != undefined)
    prismaWhereFilter.estimateStartDate = { gte: filter.startDate };

  if (filter.endDate != undefined)
    prismaWhereFilter.estimateEndDate = { lte: filter.endDate };

  if (filter.lowestBudget != undefined)
    prismaWhereFilter.budget = { gte: filter.lowestBudget };

  if (filter.highestBudget != undefined) {
    if (prismaWhereFilter.budget == undefined) {
      prismaWhereFilter.budget = {};
      console.log("WTF");
    }
    prismaWhereFilter.budget.lte = filter.highestBudget;
  }

  if (filter.jobTag != undefined) {
    prismaWhereFilter.jobTag = { title: { equals: filter.jobTag } };
  }

  return prismaWhereFilter;
}

/*
async function main() {
    const filter: jobFilter = {
        highestBudget: 9999
    };

    const a = await getSearchJobs(undefined, filter);
    console.log(a);

    // const a = await prisma.job.findMany();

    // console.log(a);

}

main();
*/

export { getDefaultSearchJobs, getSearchJobs };
