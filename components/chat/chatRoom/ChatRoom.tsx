"use client"
import ChatRoomHeader from "./ChatRoomHeader"
import ChatMessageList from "./ChatMessageList"
import ChatInput from "./ChatInput"
import { ChatRoomInfo, getChatRoomInfo } from "@/actions/chat/getChatRoomInfo"
import { Message, MessagesGroupByDate, getMessageByChatRoom } from "@/actions/chat/getMessageByChatRoom"
import { Session, getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import io from 'socket.io-client';
import { send } from "process"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { toClientMessage, toServerImageMessage, toServerTextMessage } from "@/types/chat"
import { Socket } from "socket.io-client"

type Props = {
    isStudent: boolean,
    chatroomId: string,
    senderId: string
}

let socket: Socket;
let curChatRoomId: string;

function isImageFile(file: File | undefined) {
    return file && file['type'].split('/')[0] === 'image';
}

export default function ChatRoom({ isStudent, chatroomId, senderId }: Props) {
    // curChatRoomId = chatroomId;

    const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>();

    useEffect(() => {
        async function getInitialData() {
            try {
                setChatRoomInfo(await getChatRoomInfo(chatroomId));
            } catch (err) {
                console.log(err)
                return;
            }
        }

        getInitialData();
    }, [])

    if (curChatRoomId !== chatroomId) {
        if (!process.env.NEXT_PUBLIC_WEBSOCKET_URL) {
            return (<div>
                    <h1>{process.env.NEXT_PUBLIC_WEBSOCKET_URL}</h1>
                </div>
            );
        }

        socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
            extraHeaders: {
                "chat-room-id": chatroomId,
                "user-id": senderId!
            }
        });
        // console.log("connecting socket");
        curChatRoomId = chatroomId;
    }


    function sendMessage(newTextMessage: string) {
        const messageToServer: toServerTextMessage = {
            text: newTextMessage
        };
        socket.emit('chat text message', messageToServer);
    };

    async function sendImage(imageFile: File) {
        if (!isImageFile(imageFile) || !imageFile) {
            alert("The file supposed to be an image.");
            return;
        }

        const arrayBuffer = await imageFile.arrayBuffer();
        const uiInt8Array = new Uint8Array(arrayBuffer);
        const buffer = Buffer.from(uiInt8Array);

        const messageToServer: toServerImageMessage = {
            type: imageFile.type,
            size: imageFile.size,
            buffer: buffer
        }

        socket.emit('chat image message', messageToServer);
    };

    // console.log("chat room reloading");

    return (
        <div className="h-[100dvh] w-full flex flex-col bg-neutral-100 border border-[#CBD5E1] lg:h-[80vh]">
            <ChatRoomHeader isStudent={isStudent} chatRoomInfo={chatRoomInfo} />
            <ChatMessageList isStudent={isStudent} chatroomId={chatroomId} senderId={senderId!} socket={socket} />
            <ChatInput isStudent={isStudent} chatroomId={chatroomId} sendMessage={sendMessage} sendImage={sendImage} />
        </div>
    )
}