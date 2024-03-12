"use server"
import { ApplicationStatus, Application } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

async function getStudentUserId(): Promise<string> {
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

    const student = await prisma.student.findFirst({
        where: { userId: session.user.id },
        select: { userId: true }
    })

    if (!student) {
        throw {
            message: "Authorization fail",
            status: 402
        }
    }

    return student.userId;
}

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
    })
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

export { getStudentUserId, getEmployerUserId, getApplication, validateJobOwner }