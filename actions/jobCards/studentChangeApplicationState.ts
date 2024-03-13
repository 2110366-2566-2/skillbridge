"use server"
import { ApplicationStatus, Application } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getApplication, getStudentUserId } from "./utils";
import { title } from "process";
import { sendEmail } from "./sendEmail";

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

    const emailApp = await prisma.application.findUniqueOrThrow({
        where : {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            }
        },
        select: {
            job: {
                select: {
                    title : true,
                    employerId: true
                }
            },
            user: {
                select: {
                    salutation: true,
                    firstname: true,
                    lastname: true
                }
            }
        }
    })

    const subject = `มีนิสิตยกเลิกการสมัครงาน ${emailApp.job.title}`;
    const text = `นิสิต ${emailApp.user.salutation} ${emailApp.user.firstname} ${emailApp.user.lastname} ได้ยกเลิกการสมัครงาน ${emailApp.job.title}`

    sendEmail(emailApp.job.employerId, subject, text);
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

    const emailApp = await prisma.application.findUniqueOrThrow({
        where : {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            }
        },
        select: {
            job: {
                select: {
                    title : true,
                    employerId: true
                }
            },
            user: {
                select: {
                    salutation: true,
                    firstname: true,
                    lastname: true
                }
            }
        }
    })

    const subject = `มีนิสิตยอมรับที่จะทำงาน ${emailApp.job.title} แล้ว`;
    const text = `นิสิต ${emailApp.user.salutation} ${emailApp.user.firstname} ${emailApp.user.lastname} ได้ยอมรับที่จะทำงาน ${emailApp.job.title} กรุณาชำระค่ามัจจำเพื่อให้นิสิตเริ่มทำงาน`;

    sendEmail(emailApp.job.employerId, subject, text);
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

    const emailApp = await prisma.application.findUniqueOrThrow({
        where : {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            }
        },
        select: {
            job: {
                select: {
                    title : true,
                    employerId: true
                }
            },
            user: {
                select: {
                    salutation: true,
                    firstname: true,
                    lastname: true
                }
            }
        }
    })

    const subject = `มีนิสิตปฏิเสธที่จะทำงาน ${emailApp.job.title}`;
    const text = `นิสิต ${emailApp.user.salutation} ${emailApp.user.firstname} ${emailApp.user.lastname} ปฏิเสธที่จะทำงาน ${emailApp.job.title}`;

    sendEmail(emailApp.job.employerId, subject, text);
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

    const emailApp = await prisma.application.findUniqueOrThrow({
        where : {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            }
        },
        select: {
            job: {
                select: {
                    title : true,
                    employerId: true
                }
            },
            user: {
                select: {
                    salutation: true,
                    firstname: true,
                    lastname: true
                }
            }
        }
    })

    const subject = `นิสิตส่งมอบงาน ${emailApp.job.title}`;
    const text = `นิสิต ${emailApp.user.salutation} ${emailApp.user.firstname} ${emailApp.user.lastname} ส่งมอบงาน ${emailApp.job.title} แล้ว`;

    sendEmail(emailApp.job.employerId, subject, text);
}


export { pendingToDisclaimed, acceptedToDepositPending, acceptedToDisclaimed, inProgressToDelivered };
