import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { reqBody } from "./postBody";

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

    if (stars < 0 || stars > 5) {
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required: 
 *       - jobId
 *       - studentId
 *       - stars
 *       - description
 *       properties:
 *         jobId:
 *           type: string
 *         studentId:
 *           type: string
 *         stars:
 *           type: integer
 *         description:
 *           type: string
 *       example:
 *         jobId: 2f1e0cc5-925a-4866-bdb4-612f1cb53145
 *         studentId: 78bcc173-719d-4391-afb7-a5dca6d993a2
 *         stars: 5
 *         description: Really Good!
 */

/**
 * @swagger
 * /api/review:
 *   post:
 *     summary: create a new review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201: 
 *         description: Successfully create a review
 *       400: 
 *         description: Invalid request body.
 *       401: 
 *         description: Unauthorized
 *       500: 
 *         description: Failed to create a review
 */

export async function POST(req: Request) {
    let reqBody: reqBody;
    try {
        reqBody = await req.json();
    } catch (err) {
        return Response.json({
            success: false,
            message: "Please provide valid jobId, studentId, stars and description"
        }, {
            status: 400
        });
    }

    const { jobId, studentId, stars, description } = reqBody;

    if (!validateRequestBody(jobId, studentId, stars, description)) {
        return Response.json({
            success: false,
            message: "Please provide valid jobId, studentId, stars and description"
        }, {
            status: 400
        });
    }

    const session = await getServerSession(authOptions);
    if (!session) {
        return Response.json({
            success: false,
            message: "Session not found"
        }, {
            status: 401
        });
    }

    const employerId = session.user.id;

    const validJobOwner = await validateJobOwner(employerId, jobId);
    if (!validJobOwner) {
        return Response.json({
            success: false,
            message: "Invalid job owner"
        }, {
            status: 401
        });
    }

    const applicationExists = studentApplicationExists(jobId, studentId);
    if (!applicationExists) {
        return Response.json({
            success: false,
            message: "Application does not exists"
        }, {
            status: 400
        });
    }

    const reviewExists = await studentReviewExists(jobId, studentId);
    if (reviewExists) {
        return Response.json({
            success: false,
            message: "Review already exists"
        }, {
            status: 400
        })
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
        return Response.json({
            success: false,
            message: "Failed to create a new review"
        }, {
            status: 500
        });
    }

    return Response.json({
        success: true,
        message: "Successfully create a review",
    }, {
        status: 201
    });
}