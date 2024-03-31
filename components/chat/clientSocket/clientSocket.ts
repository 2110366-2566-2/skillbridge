"use client"
import { MessagesGroupByDate } from "@/actions/chat/getMessageByChatRoom";
import { toServerImageMessage, toServerTextMessage } from "@/types/chat";
import { Dispatch, SetStateAction } from "react";
import { Socket, io } from "socket.io-client";

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

// type any because socket.on event handler also any type
export function setIncommingMessageHandler(inComingMessageHandler: any) {
    // set the handler to events
    socket.on('chat text message', inComingMessageHandler);
    socket.on('chat image message', inComingMessageHandler);
}
