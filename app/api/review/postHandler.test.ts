require("dotenv").config();
import { describe, expect, test, afterAll } from "@jest/globals";
import { postReviewHandler } from "./postHandler";
import { prisma } from "../../../lib/prisma";

test("1: Application does not exist in the system", async () => {
  const result = await postReviewHandler(
    "02f2c362-0548-41f8-b3b9-c9b24c0e43c6",
    "33333-7f36-4694-ac36-090d69c3dd9a",
    5,
    "Very good",
    "19b21e8c-aac9-4b07-bfda-668119f4098d"
  );

  //Clean up the database after testing
  await prisma.review.deleteMany({
    where: {
      studentId: "33333-7f36-4694-ac36-090d69c3dd9a",
      jobId: "02f2c362-0548-41f8-b3b9-c9b24c0e43c6"
    }
  });

  expect(result).toEqual([
    {
      message: "Application does not exists",
      success: false,
    },
    {
      status: 400,
    },
  ]);
});

test("2: ApplicationId does exist in the system and its status is not Done", async () => {
  const result = await postReviewHandler(
    "02f2c362-0548-41f8-b3b9-c9b24c0e43c6",
    "f088ce9f-7f36-4694-ac36-090d69c3dd9a",
    5,
    "Very good",
    "19b21e8c-aac9-4b07-bfda-668119f4098d"
  );

  //Clean up the database after testing
  await prisma.review.deleteMany({
    where: {
      studentId: "f088ce9f-7f36-4694-ac36-090d69c3dd9a",
      jobId: "02f2c362-0548-41f8-b3b9-c9b24c0e43c6",
    }
  });

  expect(result).toEqual([
    {
      message: "Please provide valid jobId, studentId, stars and description",
      success: false,
    },
    {
      status: 400,
    },
  ]);
});

test("3: EmployerId does not match the employerId of job.employerId where job is the job with id equals ApplicationId.jobId", async () => {
  const result = await postReviewHandler(
    "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    "4d342cdf-9c05-4326-808d-d6d107429c4b",
    5,
    "Very good",
    "9999f24f-51f9-4d40-b2e0-892e017eb17b"
  );

  //Clean up the database after testing
  await prisma.review.deleteMany({
    where: {
      studentId: "4d342cdf-9c05-4326-808d-d6d107429c4b",
      jobId: "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    }
  });

  expect(result).toEqual([
    {
      message: "Invalid job owner",
      success: false,
    },
    {
      status: 401,
    },
  ]);
});

test("4: ApplicationId does exist in the system and its status is “COMPLETED” \
      and employerId match job.employerId where job is the job with id equals ApplicationId.jobId", async () => {
  const result = await postReviewHandler(
    "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    "4d342cdf-9c05-4326-808d-d6d107429c4b",
    5,
    "Very good",
    "3676f24f-51f9-4d40-b2e0-892e017eb17b"
  );

  //Clean up the database after testing
  await prisma.review.deleteMany({
    where: {
      studentId: "4d342cdf-9c05-4326-808d-d6d107429c4b",
      jobId: "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    }
  });

  expect(result).toEqual([
    {
      message: "Successfully create a review",
      success: true,
    },
    {
      status: 201,
    },
  ]);
});

test("5: Stars is not an integer", async () => {
  const result = await postReviewHandler(
    "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    "c3712e5b-e24c-4e8e-ac1a-9000aec609e5",
    "Very good" as any,
    "Very good",
    "3676f24f-51f9-4d40-b2e0-892e017eb17b"
  );

  //Clean up the database after testing
  await prisma.review.deleteMany({
    where: {
      studentId: "c3712e5b-e24c-4e8e-ac1a-9000aec609e5",
      jobId: "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    }
  });

  expect(result).toEqual([
    {
      message: "Failed to create a new review",
      success: false,
    },
    {
      status: 500,
    },
  ]);
});

test("6: Stars is an integer and in range of 1 to 5", async () => {
  const result = await postReviewHandler(
    "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    "c3712e5b-e24c-4e8e-ac1a-9000aec609e5",
    3,
    "Very good",
    "3676f24f-51f9-4d40-b2e0-892e017eb17b"
  );

  //Clean up the database after testing
  await prisma.review.deleteMany({
    where: {
      studentId: "c3712e5b-e24c-4e8e-ac1a-9000aec609e5",
      jobId: "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    }
  });

  expect(result).toEqual([
    {
      message: "Successfully create a review",
      success: true,
    },
    {
      status: 201,
    },
  ]);
});

test("7: Stars is an integer and less than 1", async () => {
  const result = await postReviewHandler(
    "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    "7639942c-c753-4943-94de-d28f25bb8520",
    0,
    "Very good",
    "3676f24f-51f9-4d40-b2e0-892e017eb17b"
  );

  //Clean up the database after testing
  await prisma.review.deleteMany({
    where: {
      studentId: "7639942c-c753-4943-94de-d28f25bb8520",
      jobId: "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    }
  });

  expect(result).toEqual([
    {
      message: "Please provide valid jobId, studentId, stars and description",
      success: false,
    },
    {
      status: 400,
    },
  ]);
});

test("8: Stars is an integer and more than 5", async () => {
  const result = await postReviewHandler(
    "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    "7639942c-c753-4943-94de-d28f25bb8520",
    6,
    "Very good",
    "3676f24f-51f9-4d40-b2e0-892e017eb17b"
  );

  //Clean up the database after testing
  await prisma.review.deleteMany({
    where: {
      studentId: "7639942c-c753-4943-94de-d28f25bb8520",
      jobId: "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    }
  });

  expect(result).toEqual([
    {
      message: "Please provide valid jobId, studentId, stars and description",
      success: false,
    },
    {
      status: 400,
    },
  ]);
});

test("9: Description is an empty string", async () => {
  const result = await postReviewHandler(
    "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    "7639942c-c753-4943-94de-d28f25bb8520",
    5,
    "",
    "3676f24f-51f9-4d40-b2e0-892e017eb17b"
  );

  //Clean up the database after testing
  await prisma.review.deleteMany({
    where: {
      studentId: "7639942c-c753-4943-94de-d28f25bb8520",
      jobId: "1ef9a7f7-c8ad-448a-8197-3ba270151a97",
    }
  });

  expect(result).toEqual([
    {
      message: "Successfully create a review",
      success: true,
    },
    {
      status: 201,
    },
  ]);
});

test("10: Description is not an empty string", async () => {
  const result = await postReviewHandler(
    "f77bb475-7f6f-45c6-aa96-63cd6b8355bd",
    "d1e141cf-b0dd-4234-9912-e58f8012d476",
    5,
    "I'm very happy with the final results.  I wouldn't hesitate to hire you again for future projects \
    and highly recommend them to anyone seeking this kind of job.",
    "3676f24f-51f9-4d40-b2e0-892e017eb17b"
  );

  //Clean up the database after testing
  await prisma.review.deleteMany({
    where: {
      studentId: "d1e141cf-b0dd-4234-9912-e58f8012d476",
      jobId: "f77bb475-7f6f-45c6-aa96-63cd6b8355bd",
    }
  });

  expect(result).toEqual([
    {
      message: "Successfully create a review",
      success: true,
    },
    {
      status: 201,
    },
  ]);
});
