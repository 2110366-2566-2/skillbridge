import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import ChatRoom from "@/components/chat/chatRoom/ChatRoom";
import ChatRoomSection from "@/components/chat/ChatRoomSection";

export default async function ChatRoomPage({
  params,
}: {
  params: { chatroomId: string };
}) {
  const chatroomId = params.chatroomId;

  // Session
  const session = await getServerSession(authOptions);
  if (session === null) {
    return;
  }

  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";
  const senderId = session?.user.id;

  return (
    <>
      {/* TODO : Desktop & Mobile Student/Employer Chat room */}
      <div>
        {/* <ChatRoom isStudent={isStudent} chatroomId={chatroomId} senderId={senderId} /> */}
        <ChatRoomSection isStudent={isStudent} chatroomId={chatroomId} senderId={senderId} />
      </div>
    </>
  );
}
