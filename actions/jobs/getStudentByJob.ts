"use server";

import { prisma } from "../../lib/prisma";

const getStudentByJob = async (jobId: string) => {
  try {
    const result = await prisma.application.findMany({
      where: {
        jobId: jobId,
        isDeleted: false,
      },
      include: {
        user: {
          include: {
            student: {
              select: {
                reviews: {
                  where: {
                    jobId : jobId
                  }
                }
              },
            }
          },
        },
        applicationDocumentFiles: {
          select: {
            fileName: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    console.error("Error in getStudentByJob:", error);
  }
};

export default getStudentByJob;

// const main = async () => {
//   const jobId = "93776d2d-0104-422d-8a70-8904cd749371";
//   const result = await getStudentByJob(jobId);
//   console.log("\n")
//   console.log("This is response from 'getStudentByJob(jobId)' action : \n", result);
  
//   console.log("\n")
//   if(result) {
//   console.log(result[0].user.student)
//   console.log("Inside the 'applicationDocumentFiles' is look like this : \n", result[0].applicationDocumentFiles);
//   }
// };
// main();

// This is response from 'getStudentByJob(jobId)' action :
//  [
//   {
//     userId: '5f71ddd6-86cd-4e3a-9430-a9acb066bbcd',
//     jobId: '00ad50f7-e7a9-47df-bfc7-4fb2e75e60ec',
//     bid: 1200,
//     status: 'PENDING',
//     isDeleted: false,
//     createdAt: 2024-03-11T19:30:34.730Z,
//     updatedAt: 2024-03-11T19:30:34.730Z,
//     isAcknowledged: false,
//     user: {
//       salutation: 'นาย',
//       firstname: 'ศุภณัฐ',
//       middlename: null,
//       lastname: 'ตั้งสินมั่นคง',
//       profileImageUrl: null,
//       lineId: null,
//       facebook: null,
//       email: '6430388021@student.chula.ac.th'
//     },
//     applicationDocumentFiles: [ [Object], [Object] ]
//   },
//   {
//     userId: '1dfb2a35-0f95-4598-b99b-7fefe67f13b4',
//     jobId: '00ad50f7-e7a9-47df-bfc7-4fb2e75e60ec',
//     bid: 800,
//     status: 'PENDING',
//     isDeleted: false,
//     createdAt: 2024-03-11T19:30:34.730Z,
//     updatedAt: 2024-03-11T19:30:34.730Z,
//     isAcknowledged: false,
//     user: {
//       salutation: 'นาย',
//       firstname: 'พิตตินันท์',
//       middlename: null,
//       lastname: 'หาญสิงห์กุญช์',
//       profileImageUrl: null,
//       lineId: null,
//       facebook: null,
//       email: '6432115421@student.chula.ac.th'
//     },
//     applicationDocumentFiles: [ [Object] ]
//   }
// ]

// Inside the 'applicationDocumentFiles' is look like this :
//  [
//   {
//     fileName: '8b21380cf45f3eb2b8fddb8ad1d9404f2c51bb9c0989efe69ac4906e92df009e'
//   },
//   {
//     fileName: 'bde37d8cb3947552b65d82e5355a30090ec3c361722034d5b53615b5dbc3cb46'
//   }
// ]
