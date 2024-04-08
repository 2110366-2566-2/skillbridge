"use server"
import { prisma } from "../../lib/prisma";
import { Message } from "./getMessageByChatRoom";
import getS3URL from "../public/S3/getS3URL";

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
    let modifiedResults = Object.values(groupedResults);

    // Using Promise.all to await all promises
    modifiedResults = await Promise.all(modifiedResults.map(async (obj) => {
      for (const chatRoom of obj.chatrooms) {
        if (chatRoom.employer.profileImageUrl !== null) {
          const s3URL = await getS3URL(chatRoom.employer.profileImageUrl);
          // Assuming getS3URL returns an object with 'success' and 'data' properties
          if (s3URL.success) {
            chatRoom.employer.profileImageUrl = s3URL.data;
          }
        }
      }
      // Order chatrooms by latest message createdAt
      obj.chatrooms.sort((a, b) => {
        const dateA = a.latestMessage ? new Date(a.latestMessage.createdAt).getTime() : 0;
        const dateB = b.latestMessage ? new Date(b.latestMessage.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      return obj; // return the modified object
    }));

    // Order modifiedResults by latest message createdAt of latest chatRoom
    modifiedResults.sort((a, b) => {
      const latestMessageA = a.chatrooms[0]?.latestMessage?.createdAt ? new Date(a.chatrooms[0].latestMessage.createdAt).getTime() : 0;
      const latestMessageB = b.chatrooms[0]?.latestMessage?.createdAt ? new Date(b.chatrooms[0].latestMessage.createdAt).getTime() : 0;
      return latestMessageB - latestMessageA;
    });

    return modifiedResults;
  } catch (error) {
    console.error("Error in getStudentChatListData:", error);
    return [] as StudentChatListData[]; // Return empty array if error occurs
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
    let modifiedResults = Object.values(groupedResults);

    // Using Promise.all to await all promises
    modifiedResults = await Promise.all(modifiedResults.map(async (obj) => {
      for (const chatRoom of obj.chatrooms) {
        if (chatRoom.student.profileImageUrl !== null) {
          const s3URL = await getS3URL(chatRoom.student.profileImageUrl);
          // Assuming getS3URL returns an object with 'success' and 'data' properties
          if (s3URL.success) {
            chatRoom.student.profileImageUrl = s3URL.data;
          }
        }
      }
      // Order chatrooms by latest message createdAt
      obj.chatrooms.sort((a, b) => {
        const dateA = a.latestMessage ? new Date(a.latestMessage.createdAt).getTime() : 0;
        const dateB = b.latestMessage ? new Date(b.latestMessage.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      return obj; // return the modified object
    }));

    // Order modifiedResults by latest message createdAt of latest chatRoom
    modifiedResults.sort((a, b) => {
      const latestMessageA = a.chatrooms[0]?.latestMessage?.createdAt ? new Date(a.chatrooms[0].latestMessage.createdAt).getTime() : 0;
      const latestMessageB = b.chatrooms[0]?.latestMessage?.createdAt ? new Date(b.chatrooms[0].latestMessage.createdAt).getTime() : 0;
      return latestMessageB - latestMessageA;
    });

    return modifiedResults;
  } catch (error) {
    console.error("Error in getEmployerChatListData:", error);
    return [] as EmployerChatListData[];
  }
};


export { getStudentChatListData, getEmployerChatListData };

// // Test getStudentChatList
// const main = async () => {
//   const studentId = "cc82947d-c078-45b2-b800-734942029979";
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
//   const employerId = "a8e614f6-9c05-4e34-86e9-e3de4df90c01";
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
