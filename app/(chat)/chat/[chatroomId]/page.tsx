import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

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
      {isStudent ? (
        // TODO : Desktop & Mobile Student Chat room
        <div>
          ChatroomId : {chatroomId}
        </div>
      ) : (
        // TODO : Desktop & Mobile Employer Chat room
        <div>
          ChatroomId : {chatroomId}
        </div>
      )}
    </>
  );
}
