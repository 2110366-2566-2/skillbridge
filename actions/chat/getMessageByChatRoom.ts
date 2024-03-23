import { prisma } from "../../lib/prisma";

const getMessageByChatroom = async (chatroomId: string) => {
    try {
      const results = await prisma.message.findMany({
        where: {
          id : chatroomId,
        },
      });
      return results;
    } catch (error) {
      console.error("Error in getMessageByChatroom:", error);
      return null;
    }
};

export default getMessageByChatroom;

const main = async () => {
    const chatroomId = "your_chatroom_id_here";
    try {
      const messages = await getMessageByChatroom(chatroomId);
      if (messages !== null) {
        console.log("Messages:", messages);
      } else {
        console.log("No messages found.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  
  // Call the main function
  main();