"use server"
import { ApplicationStatus, Application } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

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

async function getEmployerUserId(): Promise<string> {
    const session = await getServerSession(authOptions);

    if (!session) {
        throw {
            message: "Authentication fail",
            status: 401
        }
    }

    if (!(session?.user?.id)) {
        throw {
            message: "Authentication fail",
            status: 401
        }
    }

    const employer = await prisma.employer.findFirst({
        where: { userId: session.user.id },
        select: { userId: true }
    })

    if (!employer) {
        throw {
            message: "Authorization fail",
            status: 402
        }
    }

    return employer.userId;
}

async function getApplication(studentUserId:string, jobId: string): Promise<Application> {
    return await prisma.application.findUniqueOrThrow({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            }
        }
    });
}

async function validateJobOwner(employerUserId: string, jobId: string) {
    const job = await prisma.job.findUniqueOrThrow({
        where: {
            id: jobId
        }
    })

    if (job.employerId !== employerUserId) {
        console.log("EmployerId is not the owner of such jobId")
        throw {
            message: "Authorization failed",
            status: 400
        }
    }
}

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