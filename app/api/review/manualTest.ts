require("dotenv").config();
import { describe, expect, test, afterAll } from "@jest/globals";
import { postReviewHandler } from "./postHandler";
import { prisma } from "../../../lib/prisma";

async function sevenStarsIsLessthanOne() {
    const result = await postReviewHandler(
        "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
        "7639942c-c753-4943-94de-d28f25bb8520",
        0,
        "Very good",
        "3676f24f-51f9-4d40-b2e0-892e017eb17b"
    );

    //Clean up the database after testing
    if (result[1].status === 201) {
        await prisma.review.deleteMany({
            where: {
                studentId: "7639942c-c753-4943-94de-d28f25bb8520",
                jobId: "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
            }
        });
    }

    console.log(result);
}
async function fiveStarsIsNotAnInteger() {
    const result = await postReviewHandler(
        "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
        "c3712e5b-e24c-4e8e-ac1a-9000aec609e5",
        "Very good" as any,
        "Very good",
        "3676f24f-51f9-4d40-b2e0-892e017eb17b"
    );

    //Clean up the database after testing
    if (result[1].status === 201) {
        await prisma.review.deleteMany({
            where: {
                studentId: "c3712e5b-e24c-4e8e-ac1a-9000aec609e5",
                jobId: "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
            }
        });
    }

    console.log(result);
}
async function sixStarsIsValid() {
    const result = await postReviewHandler(
        "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
        "c3712e5b-e24c-4e8e-ac1a-9000aec609e5",
        3,
        "Very good",
        "3676f24f-51f9-4d40-b2e0-892e017eb17b"
    );

    //Clean up the database after testing
    if (result[1].status === 201) {
        await prisma.review.deleteMany({
            where: {
                studentId: "c3712e5b-e24c-4e8e-ac1a-9000aec609e5",
                jobId: "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
            }
        });
    }

    console.log(result);
}

fiveStarsIsNotAnInteger();
sevenStarsIsLessthanOne();
sixStarsIsValid();