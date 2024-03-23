import { prisma } from "../../lib/prisma";

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
    });
    return results;
  } catch (error) {
    console.error("Error in getMessageByChatroom:", error);
    return [];
  }
};

export { getMessageByChatRoom };

// const main = async () => {
//     const chatroomId = "bc099058-3b77-4e72-a365-0a4c201e6e51";
//     try {
//       const messages = await getMessageByChatroom(chatroomId);
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
