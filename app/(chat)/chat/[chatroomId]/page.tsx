import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import ChatRoom from "@/components/chat/chatRoom/ChatRoom";

export default async function ChatRoomPage({
  params,
}: {
  params: { chatroomId: string };
}) {
  const chatroomId = params.chatroomId;

  // Session
  const session = await getServerSession(authOptions);
  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";

  return (
    <>
      {/* TODO : Desktop & Mobile Student/Employer Chat room */}
      <div>
        <ChatRoom isStudent={isStudent} chatroomId={chatroomId} />
      </div>
    </>
  );
}
