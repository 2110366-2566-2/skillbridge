"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import io, { Socket } from 'socket.io-client';
import { toClientMessage, toServerMessage } from "@/types/chat";
import { v4 as uuidv4 } from 'uuid';

let socket: Socket;

let firstLoad: boolean = true;

function isFileImage(file: File | undefined) {
  return file && file['type'].split('/')[0] === 'image';
}

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
  const [imageFile, setImageFile] = useState<File | undefined>();

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
      image: imageFile
    };
    socket.emit('chat message', messageToServer);
    setNewTextMessage('');
  };

  const sendImage = () => {
    console.log(imageFile);
    if (!isFileImage(imageFile)) {
      alert("The file supposed to be an image.");
      setImageFile(undefined);
      return;
    }

    const messageToServer: toServerMessage = {
      isImage: true,
      text: "This supposed to be an image.",
      image: imageFile
    };

    console.log(messageToServer);

    socket.emit('chat message', messageToServer, (status:string) => {
      console.log(status);
    });

    setImageFile(undefined);
    console.log("2", imageFile);
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
      <br></br>
      <div>
      <form>
        <input 
          type="file"
          onChange={async (e) => {
            if (e.target.files == null) {
              return;
            }
            setImageFile(e.target.files[0]);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log(imageFile);
            sendImage();
          }}
        >
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}