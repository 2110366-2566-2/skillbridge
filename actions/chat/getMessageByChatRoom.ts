import { prisma } from "../../lib/prisma";
import getS3URL from "../public/S3/getS3URL";

export interface Message {
  id: string;
  userId: string;
  createdAt: Date;
  content: string;
  isImage: boolean;
}

export interface MessagesGroupByDate {
  Date: string;
  Messages: Message[];
}

const getMessageByChatRoom = async (chatroomId: string): Promise<MessagesGroupByDate[]> => {
  try {
    const results = await prisma.message.findMany({
      where: { chatroomId },
      select: {
        id: true,
        userId: true,
        createdAt: true,
        content: true,
        isImage: true,
      },
    });

    // Iterate through each message and update content property if isImage is true
    let updatedResults = await Promise.all(results.map(async (message) => {
      if (message.isImage) {
        const result = await getS3URL(message.content);
        return {
          ...message,
          content: result.success ? result.data : result.message
        };
      } else {
        return message;
      }
    }));

    // Group messages by createdAt date
    const groupedMessages: { [key: string]: { Date: string; Messages: typeof updatedResults } } = {};
    updatedResults.forEach((message) => {
      const createdAtDate = message.createdAt.toDateString();
      if (!groupedMessages[createdAtDate]) {
        groupedMessages[createdAtDate] = { Date: createdAtDate, Messages: [] };
      }
      groupedMessages[createdAtDate].Messages.push(message);
    });

    // Convert the groupedMessages object into an array of objects
    const result = Object.values(groupedMessages) as MessagesGroupByDate[];

    return result ;
  } catch (error) {
    console.error("Error in getMessageByChatroom:", error);
    return [] as MessagesGroupByDate[];
  }
};

export { getMessageByChatRoom };

// const main = async () => {
//     const chatroomId = "ff43d9ac-6abf-407c-ae96-df572e8800f6";
//     try {
//       const messages = await getMessageByChatRoom(chatroomId);
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
