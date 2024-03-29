"use server";
import { ApplicationStatus } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { getStudentUserId } from "./utils";

const firstTabStatuses: ApplicationStatus[] = [
  ApplicationStatus.PENDING,
  ApplicationStatus.ACCEPTED,
  ApplicationStatus.REJECTED,
] 

export interface applicationInfo {
  jobId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  tag: string;
  status: string;
  employerId?: string;
}

function getApplicationTab(isAcknowledged: boolean, status: ApplicationStatus): number {
  if (isAcknowledged) {
    return 2;
  }

  if (firstTabStatuses.includes(status)) {
    return 0;
  }

  return 1;
}

async function studentFetchApplications(): Promise<[applicationInfo[], applicationInfo[], applicationInfo[]]> {
  // get student's userId
  const studentUserId = await getStudentUserId();

  // load all applications of the student from database
  const applications = await prisma.application.findMany({
    where: {
      userId: studentUserId,
    },
    include: {
      job: {
        include: {
          jobTag: true,
          applications: true
        },
      },
    },
  });

  // construct an ouput array where index is tab number minus one
  const output: [applicationInfo[], applicationInfo[], applicationInfo[],] = [[], [], []];

  applications.forEach((application) => {
    // format data for frontend ease of use
    const applicationInfo: applicationInfo = {
      jobId: application.jobId,
      title: application.job.title,
      startDate: application.job.estimateStartDate as Date,
      endDate: application.job.estimateStartDate as Date,
      tag: application.job.jobTag.title,
      status: application.status,
      employerId: application.job.employerId,
    };

    // calculate which tab should this application goes in
    const tabIndex = getApplicationTab(application.isAcknowledged, application.status);

    // put the application into the appropirate tab
    output[tabIndex].push(applicationInfo);
  })

  return output
}
/*
async function fetchFirstTab(studentUserId: string) {
  const applications = await prisma.application.findMany({
    where: {
      userId: studentUserId,
      status: {
        in: [
          ApplicationStatus.PENDING,
          ApplicationStatus.ACCEPTED,
          ApplicationStatus.REJECTED,
        ],
      },
      isAcknowledged: false,
    },
    include: {
      job: {
        include: {
          jobTag: true,
        },
      },
    },
  });

  const output: applicationInfo[] = [];

  for (let i = 0; i < applications.length; i++) {
    const app = applications[i];
    // 1. userId and jobId to identify application
    // 2. title of the job
    // 3. period ex. "18/10/2545 - 21/10/2545"
    // 4. tag
    // 5. application status

    const applicationInfo: applicationInfo = {
      jobId: app.jobId,
      title: app.job.title,
      startDate: app.job.estimateStartDate as Date,
      endDate: app.job.estimateStartDate as Date,
      tag: app.job.jobTag.title,
      status: app.status,
    };

    output.push(applicationInfo);
  }

  return output;
}

async function fetchSecondTab(studentUserId: string) {
  const applications = await prisma.application.findMany({
    where: {
      userId: studentUserId,
      status: {
        in: [
          ApplicationStatus.DEPOSIT_PENDING,
          ApplicationStatus.IN_PROGRESS,
          ApplicationStatus.DELIVERED,
          ApplicationStatus.WAGE_PAYMENT_PENDING,
          ApplicationStatus.DONE,
          ApplicationStatus.CANCELED,
        ],
      },
      isAcknowledged: false,
    },
    include: {
      job: {
        include: {
          jobTag: true,
      
        },
      },
    },
  });
  const output: applicationInfo[] = [];

  for (let i = 0; i < applications.length; i++) {
    const app = applications[i];
    // 1. userId and jobId to identify application
    // 2. title of the job
    // 3. period ex. "18/10/2545 - 21/10/2545"
    // 4. tag
    // 5. application status

    const applicationInfo: applicationInfo = {
      jobId: app.jobId,
      title: app.job.title,
      startDate: app.job.estimateStartDate as Date,
      endDate: app.job.estimateStartDate as Date,
      tag: app.job.jobTag.title,
      status: app.status,
      employerId: app.job.employerId,
    };

    output.push(applicationInfo);
  }

  return output;
}

async function fetchThirdTab(studentUserId: string) {
  const applications = await prisma.application.findMany({
    where: {
      userId: studentUserId,
      isAcknowledged: true,
    },
    include: {
      job: {
        include: {
          jobTag: true,
          applications: true,
        },
      },
    },
  });

  // jobId: string,
  // title: string,
  // description: string,
  // startDate: Date,
  // endDate: Date,
  // tag: string,
  // numberOfApplication: integer,
  // maxNumberOfApplication: integer
  // price: integer

  const output: applicationInfo[] = [];

  for (let i = 0; i < applications.length; i++) {
    const app = applications[i];

    const finalApp: applicationInfo = {
      jobId: app.jobId,
      title: app.job.title,
      startDate: app.job.estimateStartDate as Date,
      endDate: app.job.estimateEndDate as Date,
      tag: app.job.jobTag.title,
      status: "DONE",
    };

    output.push(finalApp);
  }

  return output;
}
*/

export { studentFetchApplications };
