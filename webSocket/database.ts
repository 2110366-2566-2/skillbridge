import { prisma } from '../lib/prisma';
import { toClientMessage, toServerImageMessage, toServerTextMessage } from '../types/chat';
import { uploadImageToS3 } from './uploadImageToS3';
import getS3URL from '../actions/public/S3/getS3URL';

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
        createdAt: savedMessage.createdAt.toISOString(),
        content: savedMessage.content,
        isImage: false
    }

    return messageToClient;
}

export async function saveImageMessage(chatRoomId: string, userId: string, message: toServerImageMessage): Promise<toClientMessage> {
    const imageName = await uploadImageToS3(message);

    // save message into db
    const savedMessage = await prisma.message.create({
        data : {
            chatroomId: chatRoomId,
            userId: userId,
            content: imageName,
            isImage: true
        }
    });

    // construct a message to emits back to clients
    const getS3URLResponse = await getS3URL(imageName)

    // throw error if failed to getS3URL
    if (!getS3URLResponse.success) {
        throw {
            success: getS3URLResponse.success,
            message: getS3URLResponse.message
        }
    }

    console.log(getS3URLResponse);

    const imageURL = getS3URLResponse.data;


    const messageToClient: toClientMessage = {
        id: savedMessage.id,
        userId: savedMessage.userId,
        createdAt: savedMessage.createdAt.toISOString(),
        content: imageURL,
        isImage: savedMessage.isImage
    }

    return messageToClient;
}