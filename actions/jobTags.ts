"use server"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

interface job {
    title: string,
    startDate: string | undefined,
    endDate: string | undefined,
    jobTags: string[],
    description: string,
    acceptNum: number,
    maxAcceptNum: number,
    price: number
}

interface jobTag {
    id: String,
    title: String,
    createdA: string | undefined,
    updatedAt: string | undefined,
}

async function getJobTags(): Promise<jobTag[]> {
    const output: jobTag[] = [];

    const jobTags = await prisma.jobTag.findMany({});

    console.log(output);
    return output;
}

export { getJobTags };