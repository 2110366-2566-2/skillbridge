"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import io from 'socket.io-client';

const socket = io('http://localhost:3001', {
  extraHeaders: {
    "chat-room-id": "1234"
  }
});

export default function page() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (message: string) => {
      console.log(message);
      setMessages((prev)=>[...prev, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', newMessage);
    setNewMessage('');
  };
  
  return (
    <div>
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}