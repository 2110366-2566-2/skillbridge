"use server";

import { prisma } from "../../lib/prisma";

async function getChatroomId(studentId: string, employerId: string, jobId: string): Promise<string> {
    try {
        // Check if the chatroom already exists
        const existingChatroom = await prisma.chatroom.findFirst({
            where: {
                applicationUserId: studentId,
                employerId: employerId,
                applicationJobId: jobId,
            },
        });

        if (existingChatroom) {
            return existingChatroom.id;
        } else {
            // If chatroom doesn't exist, create a new one
            const newChatroom = await prisma.chatroom.create({
                data: {
                    applicationUserId: studentId,
                    employerId: employerId,
                    applicationJobId: jobId,
                },
            });
            return newChatroom.id;
        }
    } catch(err) {
        console.log("Error in getChatRoomId :", err);
        return "";
    }
}

export default getChatroomId;

// // Example usage:
// async function main() {
//     const studentId = "d6c18637-2722-48aa-a63b-203c7fb47982";
//     const employerId = "dcbbf9a1-fdc0-479e-ad2c-c50c90f11414";
//     const jobId = "a41b5933-6d6d-4099-8f5a-804887ce2e30";

//     try {
//         const chatroom = await getChatroomId(studentId, employerId, jobId);
//         console.log('Chatroom:', chatroom);
//     } catch (error) {
//         console.error('Error:', error);
//     } finally {
//         await prisma.$disconnect();
//     }
// }

// main();
