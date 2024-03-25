import { prisma } from "../../lib/prisma";
import { getEmployerInfoById } from "../public/getUserInfo";
import { Message } from "./getMessageByChatRoom";

export interface StudentChatListData {
  jobId: string;
  jobTitle: string;
  chatrooms: {
    chatroomId: string;
    latestMessage: Message | null;
    employer: {
      profileImageUrl: string | null;
      employerId: string;
      salutation: string;
      firstname: string;
      middlename: string | null;
      lastname: string;
      position: string;
      organization: string;
    };
  }[];
}

export interface EmployerChatListData {
  jobId: string;
  jobTitle: string;
  chatrooms: {
    chatroomId: string;
    latestMessage: Message | null;
    student: {
      profileImageUrl: string | null;
      studentId: string;
      salutation: string;
      firstname: string;
      middlename: string | null;
      lastname: string;
    };
  }[];
}

const getStudentChatListData = async (studentId: string) => {
  try {
    const results = await prisma.chatroom.findMany({
      where: {
        applicationUserId: studentId,
      },
      include: {
        messages: {
          select: {
            id: true,
            userId: true,
            createdAt: true,
            content: true,
            isImage: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        application: {
          include: {
            job: {
              select: {
                title: true,
              },
            },
          },
        },
        employer: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Grouping the results based on jobId and jobTitle
    const groupedResults: { [key: string]: StudentChatListData } = {};
    results.forEach((result) => {
      const {
        applicationJobId,
        id,
        application: {
          job: { title },
        },
        messages,
        employer,
      } = result;
      if (!groupedResults[applicationJobId]) {
        groupedResults[applicationJobId] = {
          jobId: applicationJobId,
          jobTitle: title,
          chatrooms: [],
        };
      }
      groupedResults[applicationJobId].chatrooms.push({
        chatroomId: id,
        latestMessage: messages[0],
        employer: {
          profileImageUrl: employer.user.profileImageUrl,
          employerId: employer.userId,
          salutation: employer.user.salutation,
          firstname: employer.user.firstname,
          middlename: employer.user.middlename,
          lastname: employer.user.lastname,
          position: employer.position,
          organization: employer.organization,
        },
      });
    });

    // Converting the grouped results object into an array
    const modifiedResults = Object.values(groupedResults);

    return modifiedResults;
  } catch (error) {
    console.error("Error in getStudentChatListData:", error);
    return [] as StudentChatListData[];
  }
};

const getEmployerChatListData = async (employerId: string) => {
  try {
    const results = await prisma.chatroom.findMany({
      where: {
        employerId: employerId,
      },
      include: {
        messages: {
          select: {
            id: true,
            userId: true,
            createdAt: true,
            content: true,
            isImage: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        application: {
          include: {
            job: {
              select: {
                title: true,
              },
            },
          },
        },
        student: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    // Grouping the results based on jobId and jobTitle
    const groupedResults: { [key: string]: EmployerChatListData } = {};
    results.forEach((result) => {
      const {
        applicationJobId,
        id,
        application: {
          job: { title },
        },
        messages,
        student,
      } = result;
      if (!groupedResults[applicationJobId]) {
        groupedResults[applicationJobId] = {
          jobId: applicationJobId,
          jobTitle: title,
          chatrooms: [],
        };
      }
      groupedResults[applicationJobId].chatrooms.push({
        chatroomId: id,
        latestMessage: messages[0],
        student: {
          profileImageUrl: student.user.profileImageUrl,
          studentId: student.userId,
          salutation: student.user.salutation,
          firstname: student.user.firstname,
          middlename: student.user.middlename,
          lastname: student.user.lastname,
        },
      });
    });

    // Converting the grouped results object into an array
    const modifiedResults = Object.values(groupedResults);

    return modifiedResults;
  } catch (error) {
    console.error("Error in getEmployerChatListData:", error);
    return [] as EmployerChatListData[];
  }
};

export { getStudentChatListData, getEmployerChatListData };

// // Test getStudentChatList
// const main = async () => {
//   const studentId = "1d0bcf15-bd80-4e5a-8d1a-adbd2686d7fb";
//   const results = await getStudentChatListData(studentId);
//   console.log(results);
//   console.log(
//     JSON.stringify(
//       results,
//       function (key, value) {
//         if (
//           typeof value === "object" &&
//           value !== null &&
//           !Array.isArray(value)
//         ) {
//           return Object.assign({}, value);
//         }
//         return value;
//       },
//       2,
//     ),
//   );
// };
// main();

// // Test getEmployerChatList
// const main = async () => {
//   const employerId = "fe9e109d-36ec-476c-91da-7ac3a225daf4";
//   const results = await getEmployerChatListData(employerId);
//   console.log(results);
//   console.log(
//     JSON.stringify(
//       results,
//       function (key, value) {
//         if (
//           typeof value === "object" &&
//           value !== null &&
//           !Array.isArray(value)
//         ) {
//           return Object.assign({}, value);
//         }
//         return value;
//       },
//       2,
//     ),
//   );
// };
// main();
