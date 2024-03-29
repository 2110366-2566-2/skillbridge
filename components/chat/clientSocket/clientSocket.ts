"use client"
import { Message, MessagesGroupByDate } from "@/actions/chat/getMessageByChatRoom";
import { toClientMessage, toServerImageMessage, toServerTextMessage } from "@/types/chat";
import { Dispatch, SetStateAction } from "react";
import { Socket, io } from "socket.io-client";

type messageByDateSetter = Dispatch<SetStateAction<MessagesGroupByDate[]>>;

const websocketServerURL = "https://websocket-6ajomlbega-uc.a.run.app/";

let curChatroomId: string;
let socket: Socket = io(websocketServerURL);


function isImageFile(file: File | undefined) {
    return file && file['type'].split('/')[0] === 'image';
}

export function connect(chatroomId: string, senderId: string) {
    // won't connect again if chatroomId doesn't change to prevent bugs
    if (chatroomId === curChatroomId) return;

    // disconnect from the old connection
    if (socket) {
        socket.disconnect();
    }
    
    // connect to the new connection
    socket = io(websocketServerURL, {
        extraHeaders: {
            "chat-room-id": chatroomId,
            "user-id": senderId
        }
    });

    // remember current chatroomId
    curChatroomId = chatroomId;
};

export function sendMessage(newTextMessage: string) {
    // reconstruct the message to match server's expectation
    const messageToServer: toServerTextMessage = {
        text: newTextMessage
    };

    // send the message to the server
    socket.emit('chat text message', messageToServer);
};


export async function sendImage(imageFile: File) {
    // check if given file is actually an image
    if (!isImageFile(imageFile) || !imageFile) {
        alert("The file supposed to be an image.");
        return;
    }

    // extract buffer from the imageFile
    const arrayBuffer = await imageFile.arrayBuffer();
    const uiInt8Array = new Uint8Array(arrayBuffer);
    const buffer = Buffer.from(uiInt8Array);

    // reconstruct the message to match server's expectation
    const messageToServer: toServerImageMessage = {
        type: imageFile.type,
        size: imageFile.size,
        buffer: buffer
    }

    // send the image message to the server
    socket.emit('chat image message', messageToServer);
};

export function setIncommingMessageHandler(setMessagesByDate: messageByDateSetter) {
    // construct an event handler with the given messagesByDate setter
    const inComingMessageHandler = (message: toClientMessage) => {
        setMessagesByDate((messagesByDate) => {
            // reconstruct the incomming message's date string into Date object
            const newMessageDate: Date = new Date(message.createdAt);

            // reconstruct the incomming message to match frontend's expectation
            const newMessage: Message = {
                id: message.id,
                userId: message.userId,
                createdAt: newMessageDate,
                content: message.content,
                isImage: message.isImage
            };

            // get the latest messages group. where the group is grouped by date
            const latestMessageByDate = messagesByDate.length !== 0 ? messagesByDate[messagesByDate.length - 1] : undefined;

            // check if incomming message's date is the same as the latest
            if (!latestMessageByDate || latestMessageByDate.Date !== newMessageDate.toDateString()) {
                // construct a new messageByDate group with the incomming message
                const newMessageByDate: MessagesGroupByDate = {
                    Date: newMessageDate.toDateString(),
                    Messages: [newMessage]
                }

                // add the message group to the array of messages group 
                return [...messagesByDate, newMessageByDate];
            }

            // add the incomming message into the latest group
            messagesByDate[messagesByDate.length - 1].Messages.push(newMessage);
            return [...messagesByDate];
        });
    }

    // set the handler to events
    socket.on('chat text message', inComingMessageHandler);
    socket.on('chat image message', inComingMessageHandler);
}