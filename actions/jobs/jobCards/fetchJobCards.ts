"use server";
import { ApplicationStatus } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { getEmployerUserId, getStudentUserId, validateJobOwner } from "./utils";

export interface applicationInfo {
  jobId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  tag: string;
  status: string;
  employerId?: string;
}

async function studentFetchApplications() {
  /*
    need:
        1. userId and jobId to identify application
        2. title of the job
        3. period ex. "18/10/2545 - 21/10/2545"
        4. tag
        5. application status
    psuedo:
        session = getSession()
        studentUserId = session.userId
        applications = application.findMany(
            where: {userId = studentUserId},
            include: {job}
        )
        extract data from applications into array of applicationInfo
        return array of applicationInfo
    */

  const studentUserId = await getStudentUserId();

  return [
    await fetchFirstTab(studentUserId),
    await fetchSecondTab(studentUserId),
    await fetchThirdTab(studentUserId),
  ];
}

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

async function test() {
  const app = await prisma.application.findFirst();

  console.log(app);
}

// test();

export { studentFetchApplications };
