"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import io, { Socket } from 'socket.io-client';
import { toClientMessage, toServerImageMessage, toServerTextMessage } from "@/types/chat";
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
    socket.on('chat text message', (message: toClientMessage) => {
      console.log(message);
      console.log(message.content);
      setMessages((prev)=>[...prev, message]);
    });

    socket.on('chat image message', (message: toClientMessage) => {
      console.log(message);
      console.log(message.content);
      setMessages((prev)=>[...prev, message]);
    });
  }, []);

  const sendMessage = () => {
    const messageToServer: toServerTextMessage = {
      text: newTextMessage
    };
    socket.emit('chat text message', messageToServer);
    setNewTextMessage('');
  };

  const sendImage = async () => {
    console.log(imageFile);
    if (!isFileImage(imageFile) || !imageFile) {
      alert("The file supposed to be an image.");
      setImageFile(undefined);
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

    setImageFile(undefined);
  };
  
  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((message, index) => {
          if (!message.isImage) {
            return <div key={index}>{`${message.userId} said: ${message.content}`}</div>
          }

          return (
            <div>
              <p>{`${message.userId} sendImage:`}</p>
              <img src={message.content} alt={message.content}/>
            </div>
          )
        })}
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
            console.log( await e.target.files[0].arrayBuffer());
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