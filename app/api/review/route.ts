import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { reqBody } from "./postBody";
import { postReviewHandler } from "./postHandler";

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

    const results = await postReviewHandler(jobId, studentId, stars, description, employerId);

    return Response.json(results[0], results[1]);
}