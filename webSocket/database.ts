import exp from 'constants';
import { prisma } from '../lib/prisma';
import { toClientMessage, toServerTextMessage } from '../types/chat';

export async function validChatRoom(chatRoomId: string, userId: string): Promise<boolean> {
    // check if such chatRoom exists and if the userId is in the chatRoom
    const chatRoom = await prisma.chatroom.findFirst({
        where : {
            id: chatRoomId
        },
        select : {
            employerId: true,
            applicationUserId: true,
        }
    })

    if (!chatRoom) {
        return false;
    }

    return chatRoom.applicationUserId === userId || chatRoom.employerId === userId;
}

export async function saveTextMessage(chatRoomId: string, userId: string, message: toServerTextMessage): Promise<toClientMessage> {
    const savedMessage = await prisma.message.create({
        data : {
            chatroomId: chatRoomId,
            userId: userId,
            content: message.text,
            isImage: false
        }
    });

    const messageToClient: toClientMessage = {
        id: savedMessage.id,
        userId: savedMessage.userId,
        createdAt: savedMessage.createdAt,
        content: savedMessage.content,
        isImage: false
    }

    return messageToClient;
}