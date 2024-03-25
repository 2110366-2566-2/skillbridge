import { prisma } from "../../lib/prisma";
import getS3URL from "../public/S3/getS3URL";

export interface Message {
  id: string;
  userId: string;
  createdAt: Date;
  content: string;
  isImage: boolean;
}

const getMessageByChatRoom = async (chatroomId: string) => {
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
      orderBy: { createdAt: 'desc' }, // Order by createdAt in descending order
    });

    // Iterate through each message and update content property if isImage is true
    const updatedResults = await Promise.all(results.map(async (message) => ({
      ...message,
      content: message.isImage ? await getS3URL(message.content) : message.content,
    })));

    // Reverse the order of messages array to display latest messages first
    return updatedResults.reverse();
  } catch (error) {
    console.error("Error in getMessageByChatroom:", error);
    return [];
  }
};

export { getMessageByChatRoom };

// const main = async () => {
//     const chatroomId = "bc099058-3b77-4e72-a365-0a4c201e6e51";
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
