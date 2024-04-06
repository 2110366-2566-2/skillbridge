import { Message, MessagesGroupByDate } from "@/actions/chat/getMessageByChatRoom";
import { ChatListReloadState } from "@/redux/features/chatListSlice";
import { toClientMessage } from "@/types/chat";
import { ActionCreatorWithoutPayload, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";

type messageByDateSetter = Dispatch<SetStateAction<MessagesGroupByDate[]>>;

// this function is dedicated to ChatMessageList component
export function constructIncommingMessageHandler(
    setMessagesByDate: messageByDateSetter,
    dispatch: ThunkDispatch<{
        auth: ChatListReloadState;
    }, undefined, UnknownAction> & Dispatch<UnknownAction>,
    toggleChatListReload: ActionCreatorWithoutPayload<"chatList/toggleChatListReload">
) {
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

        dispatch(toggleChatListReload());
    }

    return inComingMessageHandler;
}