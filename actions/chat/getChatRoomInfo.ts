import { prisma } from "../../lib/prisma";

export interface ChatRoomInfo {
  student: {
    id: string;
    salutation: string;
    firstname: string;
    middlename: string | null;
    lastname: string;
  };
  employer: {
    id: string;
    salutation: string;
    firstname: string;
    middlename: string | null;
    lastname: string;
    position: string;
    organization: string;
  };
  job: {
    id: string;
    title: string;
  };
};

const getChatRoomInfo = async (chatroomId: string) => {
  try {
    const results = await prisma.chatroom.findFirst({
      where: {
        id: chatroomId
      },
      include: {
        student: {
          include: {
            user: {
              select: {
                salutation: true,
                firstname: true,
                middlename: true,
                lastname: true,
              }
            }
          }
        },
        employer: {
          include: {
            user: {
              select: {
                salutation: true,
                firstname: true,
                middlename: true,
                lastname: true,
              }
            }
          }
        },
        application: {
          include: {
            job: {
              select: {
                title: true
              }
            }
          }
        }
      }
    });

    if(!results) return {} as ChatRoomInfo;

    const updatedResults = 
    {
      student: {
        id: results?.applicationUserId,
        salutation: results?.student.user.salutation,
        firstname: results?.student.user.firstname,
        middlename: results?.student.user.middlename,
        lastname: results?.student.user.lastname,   
      },
      employer: {
        id: results?.employerId,
        salutation: results?.employer.user.salutation,
        firstname: results?.employer.user.firstname,
        middlename: results?.employer.user.middlename,
        lastname: results?.employer.user.lastname, 
        position: results?.employer.position,
        organization: results?.employer.organization,
      },
      job: {
        id: results?.applicationJobId,
        title: results?.application.job.title,
      }
    } as ChatRoomInfo;

    return updatedResults;
  } catch (error) {
    console.error("Error in getChatRoomInfo:", error);
    return {} as ChatRoomInfo;
  }
};

export { getChatRoomInfo };

// const main = async () => {
//     const chatroomId = "ff43d9ac-6abf-407c-ae96-df572e8800f6";
//     try {
//       const messages = await getChatRoomInfo(chatroomId);
//       if (messages !== null) {
//         console.log("Messages:", messages);
//       } else {
//         console.log("No messages found.");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//     }
//   };

//   main();
