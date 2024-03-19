"use server";
import { ApplicationStatus, Application } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

interface emailDetail {
  job: {
    title: string;
    employerId: string;
  };
  user: {
    salutation: string;
    firstname: string;
    lastname: string;
  };
}

const studentCanTransitFrom = new Map<ApplicationStatus, ApplicationStatus[]>([
  [ApplicationStatus.DISCLAIMED, [ApplicationStatus.PENDING, ApplicationStatus.ACCEPTED]],
  [ApplicationStatus.DEPOSIT_PENDING, [ApplicationStatus.ACCEPTED]],
  [ApplicationStatus.DELIVERED, [ApplicationStatus.IN_PROGRESS]]
]);

async function getStudentUserId(): Promise<string> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw {
      message: "Authentication fail",
      status: 401,
    };
  }

  if (!session?.user?.id) {
    throw {
      message: "Authentication fail",
      status: 401,
    };
  }

  const student = await prisma.student.findFirst({
    where: { userId: session.user.id },
    select: { userId: true },
  });

  if (!student) {
    throw {
      message: "Authorization fail",
      status: 402,
    };
  }

  return student.userId;
}

async function getEmployerUserId(): Promise<string> {
  const session = await getServerSession(authOptions);

  if (!session) {
    throw {
      message: "Authentication fail",
      status: 401,
    };
  }

  if (!session?.user?.id) {
    throw {
      message: "Authentication fail",
      status: 401,
    };
  }

  const employer = await prisma.employer.findFirst({
    where: { userId: session.user.id },
    select: { userId: true },
  });

  if (!employer) {
    throw {
      message: "Authorization fail",
      status: 402,
    };
  }

  return employer.userId;
}

async function getApplication(
  studentUserId: string,
  jobId: string,
): Promise<Application> {
  return await prisma.application.findUniqueOrThrow({
    where: {
      userId_jobId: {
        userId: studentUserId,
        jobId: jobId,
      },
    },
  });
}

async function getApplicationStatus(
  studentUserId: string,
  jobId: string,
): Promise<ApplicationStatus> {
  const { status } = await prisma.application.findUniqueOrThrow({
    where: {
      userId_jobId: {
        userId: studentUserId,
        jobId: jobId,
      },
    },
    select: {
      status: true
    }
  });

  return status;
}

async function validateJobOwner(jobId: string) {
  const employerUserId = await getEmployerUserId();

  const job = await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
  });

  if (job.employerId !== employerUserId) {
    console.log("EmployerId is not the owner of such jobId");
    throw {
      message: "Authorization failed",
      status: 400,
    };
  }
}

async function getEmail(userId: string): Promise<string> {
  const res = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
    select: {
      email: true,
    },
  });

  return res.email;
}

async function isValidInitialStatus(jobId: string, toState: ApplicationStatus, canTransitFrom:Map<ApplicationStatus, ApplicationStatus[]>): Promise<boolean> {
  const initialStatus = await getApplicationStatus(await getStudentUserId(), jobId);
  const validInitialStatuses = canTransitFrom.get(toState)!;

  return validInitialStatuses.includes(initialStatus);
}

async function studentChangeApplicationStatus(jobId: string, toStatus: ApplicationStatus) {
  // check if initial application status can be transit to such state
  if (!await isValidInitialStatus(jobId, toStatus, studentCanTransitFrom)) {
    throw {
      message: "Application initial status is not valid",
      status: 400,
    };
  }

  // update status in db
  await prisma.application.update({
    where: {
      userId_jobId: {
        userId: await getStudentUserId(),
        jobId: jobId
      },
    },
    data: {
      status: toStatus
    }
  });
}

async function getEmailDetail(jobId: string): Promise<emailDetail> {
  return await prisma.application.findUniqueOrThrow({
    where: {
      userId_jobId: {
        userId: await getStudentUserId(),
        jobId: jobId,
      },
    },
    select: {
      job: {
        select: {
          title: true,
          employerId: true,
        },
      },
      user: {
        select: {
          salutation: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  });
}

export {
  getStudentUserId,
  getEmployerUserId,
  getApplication,
  getApplicationStatus,
  validateJobOwner,
  getEmail,
  studentChangeApplicationStatus,
  getEmailDetail
};
