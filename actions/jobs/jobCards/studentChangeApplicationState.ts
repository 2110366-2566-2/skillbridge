"use server";
import { ApplicationStatus } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { getApplication, getEmailDetail, getStudentUserId, studentChangeApplicationStatus } from "./utils";
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

/*
Status transitions possibly made by student:

pending => Disclaimed
accepted => DepositPending
accepted => Disclaimed
inProgress => Delivered
*/

async function pendingToDisclaimed(jobId: string) {
  //this function change application status from PENDING to DISCLAIMED and send email to notify employer

  // change application status from PENDING to DISCLAIMED
  await studentChangeApplicationStatus(jobId, ApplicationStatus.DISCLAIMED);

  // get detail necessary to send email
  const { job, user } = await getEmailDetail(jobId);

  // setup subject and text for email
  const subject = `มีนิสิตยกเลิกการสมัครงาน ${job.title}`;
  const text = `นิสิต ${user.salutation} ${user.firstname} ${user.lastname} ได้ยกเลิกการสมัครงาน ${job.title}`;

  // send email
  sendEmail(job.employerId, subject, text);
}

async function acceptedToDepositPending(jobId: string) {
  //this function change application status from ACCEPTED to PENDING and send email to notify employer

  // change application status from ACCEPTED to PENDING
  await studentChangeApplicationStatus(jobId, ApplicationStatus.DEPOSIT_PENDING);

  // get detail necessary to send email
  const { job, user } = await getEmailDetail(jobId);

  // setup subject and text for email
  const subject = `มีนิสิตยอมรับที่จะทำงาน ${job.title} แล้ว`;
  const text = `นิสิต ${user.salutation} ${user.firstname} ${user.lastname} ได้ยอมรับที่จะทำงาน ${job.title} กรุณาชำระค่ามัดจำเพื่อให้นิสิตเริ่มทำงาน`;

  // send email
  sendEmail(job.employerId, subject, text);
}

async function acceptedToDisclaimed(jobId: string) {
  //this function change application status from ACCEPTED to DISCLAIMED and send email to notify employer

  // change application status from ACCEPTED to DISCLAIMED
  await studentChangeApplicationStatus(jobId, ApplicationStatus.DISCLAIMED);

  // get detail necessary to send email
  const { job, user } = await getEmailDetail(jobId);

  // setup subject and text for email
  const subject = `มีนิสิตปฏิเสธที่จะทำงาน ${job.title}`;
  const text = `นิสิต ${user.salutation} ${user.firstname} ${user.lastname} ปฏิเสธที่จะทำงาน ${job.title}`;

  // send email
  sendEmail(job.employerId, subject, text);
}

async function inProgressToDelivered(jobId: string) {
  //this function change application status from IN_PROGRESS to DELIVERED and send email to notify employer

  // change application status from IN_PROGRESS to DELIVERED
  await studentChangeApplicationStatus(jobId, ApplicationStatus.DELIVERED);

  // get detail necessary to send email
  const { job, user } = await getEmailDetail(jobId);

  // setup subject and text for email
  const subject = `นิสิตส่งมอบงาน ${job.title}`;
  const text = `นิสิต ${user.salutation} ${user.firstname} ${user.lastname} ส่งมอบงาน ${job.title} แล้ว`;

  // send email
  sendEmail(job.employerId, subject, text);
}

async function acknowledgeApplication(jobId: string) {
  const studentUserId = await getStudentUserId();

  const application = await getApplication(studentUserId, jobId);

  const isValidStatus =
    application.status === ApplicationStatus.CANCELED ||
    application.status === ApplicationStatus.DONE ||
    application.status === ApplicationStatus.REJECTED;
  if (!isValidStatus) {
    throw {
      message: "Application status is not valid",
      status: 400,
    };
  }

  await prisma.application.update({
    where: {
      userId_jobId: {
        userId: studentUserId,
        jobId: jobId,
      },
    },
    data: {
      isAcknowledged: true,
    },
  });
}

export {
  pendingToDisclaimed,
  acceptedToDepositPending,
  acceptedToDisclaimed,
  inProgressToDelivered,
  acknowledgeApplication,
};
