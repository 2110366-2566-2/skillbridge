"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "../../lib/prisma";
import { JobStatus } from "@prisma/client";


export default async function f(jobId: string) {
    try {
        /* Check for authorization as this server only available for employer (owner) */
        const session: any = await getServerSession(authOptions);
        const userId = session?.user.id;
        const employer = await prisma.employer.findFirst({
            where: { userId: userId }
        })

        if (!session || !employer) {
            return {
                success: false,
                message: "Not Authenticated",
                status: 401
            }
        }

        /* Find a job with given jobId */
        const job = await prisma.job.findFirst({
            where: { id: jobId },
            select: {
                status: true,
                isDeleted: true
            }
        })

        /* Job is not found or already deleted */
        if (!job || job.isDeleted) {
            return {
                success: false,
                message: "Job not found",
                status: 404
            }
        }

        const isClosed = job.status == JobStatus.IN_PROGRESS || job.status == JobStatus.COMPLETED;

        return {
            success: true,
            isClosed: isClosed,
            status: 200
        }


    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message,
                status: 500
            }
        } else {
            return {
                success: false,
                message: "Internal Server Error",
                status: 500
            };
        }
    }
}