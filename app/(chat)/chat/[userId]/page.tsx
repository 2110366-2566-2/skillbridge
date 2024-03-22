import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export default async function ChatRoomPage({
  params,
}: {
  params: { userId: string };
}) {
  const userId = params.userId;

  // Session
  const session = await getServerSession(authOptions);
  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";

  return (
    <>
      {isStudent ? (
        // TODO : Desktop & Mobile Student Chat room
        <div>
          Desktop & Mobile Student Chat room of myUserId:({session?.user.id})
          and userId:({userId})
        </div>
      ) : (
        // TODO : Desktop & Mobile Employer Chat room
        <div>
          Desktop & Mobile Employer Chat room of myUserId:({session?.user.id})
          and userId:({userId})
        </div>
      )}
    </>
  );
}
