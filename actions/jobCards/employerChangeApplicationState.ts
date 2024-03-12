"use server"
import { ApplicationStatus, Application } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getApplication, getEmployerUserId, validateJobOwner } from "./utils";

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

async function pendingToAccepted(studentUserId: string, jobId: string) {
    const employerUserId = await getEmployerUserId(); // get employer id from session
    await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

    const application = await getApplication(studentUserId, jobId);

    if (application.status !== ApplicationStatus.PENDING) {
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
            status: ApplicationStatus.ACCEPTED
        }
    });
}

async function pendingToRejected(studentUserId: string, jobId: string) {
    const employerUserId = await getEmployerUserId(); // get employer id from session
    await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

    const application = await getApplication(studentUserId, jobId);

    if (application.status !== ApplicationStatus.PENDING) {
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
            status: ApplicationStatus.REJECTED
        }
    });
}
 
async function depositPendingToInProgress(studentUserId: string, jobId: string) {
    //called when employer pay deposit
    const employerUserId = await getEmployerUserId(); // get employer id from session
    await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

    const application = await getApplication(studentUserId, jobId);

    if (application.status !== ApplicationStatus.DEPOSIT_PENDING) {
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
            status: ApplicationStatus.IN_PROGRESS
        }
    });
}
 
async function deliveredToInProgress(studentUserId: string, jobId: string) {
    const employerUserId = await getEmployerUserId(); // get employer id from session
    await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

    const application = await getApplication(studentUserId, jobId);

    if (application.status !== ApplicationStatus.DELIVERED) {
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
            status: ApplicationStatus.IN_PROGRESS
        }
    });
}

async function deliveredToCanceled(studentUserId: string, jobId: string) {
    const employerUserId = await getEmployerUserId(); // get employer id from session
    await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

    const application = await getApplication(studentUserId, jobId);

    if (application.status !== ApplicationStatus.DELIVERED) {
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
            status: ApplicationStatus.CANCELED
        }
    });
}

async function deliveredToWagePaymentPending(studentUserId: string, jobId: string) {
    const employerUserId = await getEmployerUserId(); // get employer id from session
    await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

    const application = await getApplication(studentUserId, jobId);

    if (application.status !== ApplicationStatus.DELIVERED) {
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
            status: ApplicationStatus.WAGE_PAYMENT_PENDING
        }
    });
}

async function wagePaymentPendingToDone(studentUserId: string, jobId: string) {
    const employerUserId = await getEmployerUserId(); // get employer id from session
    await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

    const application = await getApplication(studentUserId, jobId);

    if (application.status !== ApplicationStatus.WAGE_PAYMENT_PENDING) {
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
            status: ApplicationStatus.DONE
        }
    });
}