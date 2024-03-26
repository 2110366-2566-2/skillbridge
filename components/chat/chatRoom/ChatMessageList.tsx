"use client"

import ChatMessageListByDate from "./ChatMessageListByDate"
import { useRef, useEffect, useState } from "react"
import { Message, MessagesGroupByDate, getMessageByChatRoom } from "@/actions/chat/getMessageByChatRoom"
import { Socket } from "socket.io-client"
import { toClientMessage } from "@/types/chat"

type Props = {
    isStudent: boolean,
    chatroomId: string,
    initialMessagesByDate: MessagesGroupByDate[],
    senderId: string,
    socket: Socket
}

let firstLoad: boolean = true;

export default function ChatMessageList({ isStudent, chatroomId, senderId, socket }: Props) {
    const [messagesByDate, setMessagesByDate] = useState<MessagesGroupByDate[]>([]);
    console.log(messagesByDate);
    console.log(socket);

    function inComingMessageHandler(message: toClientMessage) {
        setMessagesByDate((messagesByDate) => {
            console.log(messagesByDate);

            console.log(message);
            console.log(message.content);
            
            const newMessageDate: Date = new Date(message.createdAt);
            const newMessage: Message =  {
                id: message.id,
                userId: message.userId,
                createdAt: newMessageDate,
                content: message.content,
                isImage: false
            };
            
            const latestMessageByDate = messagesByDate.length !== 0 ? messagesByDate[messagesByDate.length - 1] : undefined;
            
            if (!latestMessageByDate || latestMessageByDate.Date !== newMessageDate.toDateString()) {
                const newMessageByDate: MessagesGroupByDate = {
                    Date: newMessageDate.toDateString(),
                    Messages: [newMessage]
                }

                // setChatListKey((prev) => prev+1);    
                return [...messagesByDate, newMessageByDate];
            }

            const newMessagesByDate = [...messagesByDate];
            newMessagesByDate[messagesByDate.length - 1].Messages.push(newMessage);

            console.log("fi", newMessagesByDate===messagesByDate);
            
            // setChatListKey((prev) => prev+1);
            return newMessagesByDate;
        });
    }

    if (firstLoad) {
        socket.on('chat text message', inComingMessageHandler);
        socket.on('chat image message', inComingMessageHandler);
        firstLoad = false;
    }

    const bottomOfPanelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function getInitialData() {
            try {
                setMessagesByDate(await getMessageByChatRoom(chatroomId));
                console.log(await getMessageByChatRoom(chatroomId));
            } catch (err) {
                console.log(err)
                return;
            }
        }

        getInitialData();
    }, [])

    useEffect(() => {
        if (bottomOfPanelRef.current) {
            bottomOfPanelRef.current.scrollIntoView({ block: 'end' })
        }
    }, [messagesByDate])

    console.log("chat list reloading")

    return (
        <>
            {messagesByDate.length ? (
                <div className="h-full w-full px-3 pb-[6px] overflow-y-auto pt-4 lg:px-3 lg:pb-2">
                    <div className="flex flex-col-reverse">
                        {messagesByDate.slice().reverse().map((messageByDate, index) => <ChatMessageListByDate key={index} messageByDate={messageByDate} senderId={senderId} />)}
                    </div>
                    <div ref={bottomOfPanelRef}></div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-end text-slate-400 text-[14px] h-full w-full px-3 pb-[6px] overflow-y-auto pt-4 lg:px-3 lg:pb-2 lg:text-[16px]">
                    เริ่มต้นการแชทกับคนคนนี้!
                </div>
            )}
        </>
    )
}