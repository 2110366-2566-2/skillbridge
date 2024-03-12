"use server"
import { ApplicationStatus, Application } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getApplication, getStudentUserId } from "./utils";

/*
Application states : 
PENDING
ACCEPTED
REJECTED // final state
DEPOSIT_PENDING
IN_PROGRESS
DELIVERED
WAGE_PAYMENT_PENDING
DONE // final state
CANCELED // final state
*/

async function pendingToDisclaimed(jobId: string) {
    //TODO : change application's status with such ids from pending to disclaim
    const studentUserId = await getStudentUserId();

    const application = await getApplication(studentUserId, jobId);

    if (application.status != ApplicationStatus.PENDING) {
        throw {
            message: "Application status is not valid",
            status: 400
        }
    }

    prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.DISCLAIMED
        }
    });
}

async function acceptedToDepositPending(jobId: string) {
    const studentUserId = await getStudentUserId();

    const application = await getApplication(studentUserId, jobId);

    if (application.status != ApplicationStatus.ACCEPTED) {
        throw {
            message: "Application status is not valid",
            status: 400
        }
    }

    prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.DEPOSIT_PENDING
        }
    });
}

async function acceptedToDisclaimed(jobId: string) {
    const studentUserId = await getStudentUserId();

    const application = await getApplication(studentUserId, jobId);

    if (application.status != ApplicationStatus.ACCEPTED) {
        throw {
            message: "Application status is not valid",
            status: 400
        }
    }

    prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.DISCLAIMED
        }
    });
}

async function inProgressToDelivered(jobId: string) {
    const studentUserId = await getStudentUserId();

    const application = await getApplication(studentUserId, jobId);

    if (application.status != ApplicationStatus.IN_PROGRESS) {
        throw {
            message: "Application status is not valid",
            status: 400
        }
    }

    prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.DELIVERED
        }
    });
}


export { pendingToDisclaimed, acceptedToDepositPending, acceptedToDisclaimed, inProgressToDelivered };

