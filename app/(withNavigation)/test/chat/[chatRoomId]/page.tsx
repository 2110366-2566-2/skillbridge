"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import io, { Socket } from 'socket.io-client';
import { toClientMessage, toServerMessage } from "@/types/chat";
import { v4 as uuidv4 } from 'uuid';

let socket: Socket;

let firstLoad: boolean = true;

export default function page({
  params,
}: {
  params: { chatRoomId: string };
}) {
  
  const chatRoomId = params.chatRoomId;

  if (firstLoad) {
    const userId = uuidv4();
    console.log(userId);
    socket = io('http://localhost:3001', {
      extraHeaders: {
        "chat-room-id": chatRoomId,
        "user-id" : userId
      }
    });
    firstLoad = false;
  }

  console.log("First load:", firstLoad);
  
  
  const [messages, setMessages] = useState<toClientMessage[]>([]);
  const [newTextMessage, setNewTextMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (message: toClientMessage) => {
      console.log(message);
      console.log(message.text);
      setMessages((prev)=>[...prev, message]);
    });
  }, []);

  const sendMessage = () => {
    const messageToServer: toServerMessage = {
      isImage: false,
      text: newTextMessage,
      image: undefined
    };
    socket.emit('chat message', messageToServer);
    setNewTextMessage('');
  };
  
  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{`${message.senderId} said: ${message.text}`}</div>
        ))}
      </div>
      <input
        type="text"
        value={newTextMessage}
        onChange={(e) => {
          console.log(newTextMessage);
          console.log(e.target.value);
          setNewTextMessage(e.target.value);
          console.log(newTextMessage);
        }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}