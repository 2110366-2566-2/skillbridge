import { prisma } from "@/lib/prisma";

type postHandlerReturnVal = [{ success: boolean, message: string }, { status: number }];

async function validateJobOwner(employerId: string, jobId: string) {
    try {
        const job = await prisma.job.findUniqueOrThrow({
            where: {
                id: jobId
            },
            select: {
                employerId: true
            }
        });

        return job.employerId === employerId;
    } catch (err) {
        // console.log(err);
        return false;
    }
}

async function studentApplicationExists(jobId: string, studentId: string) {
    try {
        const application = await prisma.application.findUniqueOrThrow({
            where: {
                userId_jobId: {
                    userId: studentId,
                    jobId: jobId,
                }
            }
        });

        return true;
    } catch (err) {
        // console.log("application", err);
        return false;
    }
}

function validateRequestBody(jobId: string, studentId: string, stars: number, description: string) {
    const requestBodyArray = [jobId, studentId, stars, description];

    for (let i=0; i<requestBodyArray.length; i++) {
        const element = requestBodyArray[i];
        if (element === undefined || element === null) {
            return false;
        }
    }

    if (stars < 1 || stars > 5) {
        return false;
    }

    return true;
}

async function studentReviewExists(jobId: string, studentId: string) {
    const count = await prisma.review.count({
        where: {
            studentId: studentId,
            jobId: jobId,
            isDeleted: false
        }
    });

    return count > 0;
}

export async function postReviewHandler(jobId: string, studentId: string, stars: number, description: string, employerId: string): Promise<postHandlerReturnVal> {
    if (!validateRequestBody(jobId, studentId, stars, description)) {
        return [{
            success: false,
            message: "Please provide valid jobId, studentId, stars and description"
        }, {
            status: 400
        }]
    }

    const validJobOwner = await validateJobOwner(employerId, jobId);
    if (!validJobOwner) {
        return [{
            success: false,
            message: "Invalid job owner"
        }, {
            status: 401
        }]
    }

    const applicationExists = studentApplicationExists(jobId, studentId);
    if (!applicationExists) {
        return [{
            success: false,
            message: "Application does not exists"
        }, {
            status: 400
        }]
    }

    const reviewExists = await studentReviewExists(jobId, studentId);
    if (reviewExists) {
        return [{
            success: false,
            message: "Review already exists"
        }, {
            status: 400
        }]
    }
    
    try {
        await prisma.review.create({
            data: {
                jobId: jobId,
                description: description,
                studentId: studentId,
                stars: stars
            }
        });
    } catch(err) {
        console.log(err);
        return [{
            success: false,
            message: "Failed to create a new review"
        }, {
            status: 500
        }]
    }

    return [{
        success: true,
        message: "Successfully create a review",
    }, {
        status: 201
    }]
}