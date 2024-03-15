"use server";
import { ApplicationStatus, Application } from "@prisma/client";
import { prisma } from "../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getApplication, getEmployerUserId, validateJobOwner } from "./utils";
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

async function pendingToAccepted(studentUserId: string, jobId: string) {
  const employerUserId = await getEmployerUserId(); // get employer id from session
  await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

  const application = await getApplication(studentUserId, jobId);

  if (application.status !== ApplicationStatus.PENDING) {
    throw {
      message: "Application status is not valid",
      status: 400,
    };
  }

    await prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.ACCEPTED
        }
    });

  const job = await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
    select: {
      title: true,
    },
  });

  const subject = `ใบสมัครสำหรับงาน ${job.title} ของคุณถูกรับคัดเลือกแล้ว`;
  const text = `ใบสมัครสำหรับงาน ${job.title} ของคุณถูกรับคัดเลือกแล้ว`;

  sendEmail(studentUserId, subject, text);
}

async function pendingToRejected(studentUserId: string, jobId: string) {
  const employerUserId = await getEmployerUserId(); // get employer id from session
  await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

  const application = await getApplication(studentUserId, jobId);

  if (application.status !== ApplicationStatus.PENDING) {
    throw {
      message: "Application status is not valid",
      status: 400,
    };
  }

    await prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.REJECTED
        }
    });

  const job = await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
    select: {
      title: true,
    },
  });

  const subject = `ใบสมัครสำหรับงาน ${job.title} ของคุณถูกไม่ผ่านการคัดเลือก`;
  const text = `ใบสมัครสำหรับงาน ${job.title} ของคุณถูกไม่ผ่านการคัดเลือก`;

  sendEmail(studentUserId, subject, text);
}

async function depositPendingToInProgress(
  studentUserId: string,
  jobId: string,
) {
  //called when employer pay deposit
  const employerUserId = await getEmployerUserId(); // get employer id from session
  await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

  const application = await getApplication(studentUserId, jobId);

  if (application.status !== ApplicationStatus.DEPOSIT_PENDING) {
    throw {
      message: "Application status is not valid",
      status: 400,
    };
  }

    await prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.IN_PROGRESS
        }
    });

  const job = await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
    select: {
      title: true,
    },
  });

  const subject = `ผู้จ้างได้จ่ายค่ามัดจำสำหรับงาน ${job.title} แล้ว`;
  const text = `ผู้จ้างได้จ่ายค่ามัดจำสำหรับงาน ${job.title} แล้ว สามารถเริ่มทำงานได้`;

  sendEmail(studentUserId, subject, text);
}

async function inProgressToCanceled(studentUserId: string, jobId: string) {
    const employerUserId = await getEmployerUserId(); // get employer id from session
    await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

    const application = await getApplication(studentUserId, jobId);

    if (application.status !== ApplicationStatus.IN_PROGRESS) {
        throw {
            message: "Application status is not valid",
            status: 400
        }
    }

    await prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.CANCELED
        }
    });

    const job = await prisma.job.findUniqueOrThrow({
        where: {
            id: jobId
        },
        select: {
            title: true
        }
    })

    const subject = `ผู้จ้างยกเลิกงาน ${job.title} ของคุณ`;
    const text = `ผู้จ้างยกเลิกงาน ${job.title} ของคุณ`;

    sendEmail(studentUserId, subject, text);
}
 
async function deliveredToInProgress(studentUserId: string, jobId: string) {
  const employerUserId = await getEmployerUserId(); // get employer id from session
  await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

  const application = await getApplication(studentUserId, jobId);

  if (application.status !== ApplicationStatus.DELIVERED) {
    throw {
      message: "Application status is not valid",
      status: 400,
    };
  }

    await prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.IN_PROGRESS
        }
    });

  const job = await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
    select: {
      title: true,
    },
  });

  const subject = `ผู้จ้างปฏิเสธงาน ${job.title} ของคุณ`;
  const text = `ผู้จ้างปฏิเสธงาน ${job.title} ของคุณ กรุณาปรับปรุงงานและส่งมอบงานใหม่`;

  sendEmail(studentUserId, subject, text);
}

async function deliveredToCanceled(studentUserId: string, jobId: string) {
  const employerUserId = await getEmployerUserId(); // get employer id from session
  await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

  const application = await getApplication(studentUserId, jobId);

  if (application.status !== ApplicationStatus.DELIVERED) {
    throw {
      message: "Application status is not valid",
      status: 400,
    };
  }

    await prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.CANCELED
        }
    });

  const job = await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
    select: {
      title: true,
    },
  });

  const subject = `ผู้จ้างยกเลิกงาน ${job.title} ของคุณ`;
  const text = `ผู้จ้างยกเลิกงาน ${job.title} ของคุณ`;

  sendEmail(studentUserId, subject, text);
}

async function deliveredToWagePaymentPending(
  studentUserId: string,
  jobId: string,
) {
  const employerUserId = await getEmployerUserId(); // get employer id from session
  await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

  const application = await getApplication(studentUserId, jobId);

  if (application.status !== ApplicationStatus.DELIVERED) {
    throw {
      message: "Application status is not valid",
      status: 400,
    };
  }

    await prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.WAGE_PAYMENT_PENDING
        }
    });

  const job = await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
    select: {
      title: true,
    },
  });

  const subject = `ผู้จ้างยอมรับการส่งมอบงาน ${job.title} ของคุณแล้ว`;
  const text = `ผู้จ้างยอมรับการส่งมอบงาน ${job.title} ของคุณแล้ว กรุณารอผู้จ้างจ่ายค่าจ้างที่เหลือ`;

  sendEmail(studentUserId, subject, text);
}

async function wagePaymentPendingToDone(studentUserId: string, jobId: string) {
  const employerUserId = await getEmployerUserId(); // get employer id from session
  await validateJobOwner(employerUserId, jobId); // check if employer is the owner of the job. if not just throw an error

  const application = await getApplication(studentUserId, jobId);

  if (application.status !== ApplicationStatus.WAGE_PAYMENT_PENDING) {
    throw {
      message: "Application status is not valid",
      status: 400,
    };
  }

    await prisma.application.update({
        where: {
            userId_jobId: {
                userId: studentUserId,
                jobId: jobId
            },
        },
        data: {
            status: ApplicationStatus.DONE
        }
    });

  const job = await prisma.job.findUniqueOrThrow({
    where: {
      id: jobId,
    },
    select: {
      title: true,
    },
  });

  const subject = `ผู้จ้างจ่ายค่าจ้างสำหรับงาน ${job.title} ของคุณแล้ว`;
  const text = `ผู้จ้างจ่ายค่าจ้างสำหรับงาน ${job.title} ของคุณแล้ว`;

  sendEmail(studentUserId, subject, text);
}

export { pendingToAccepted, pendingToRejected, depositPendingToInProgress, deliveredToInProgress, deliveredToCanceled, deliveredToWagePaymentPending, wagePaymentPendingToDone, inProgressToCanceled };