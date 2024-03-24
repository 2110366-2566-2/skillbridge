import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import ChatCardListStudent from "@/components/chat/chatCardList/student/ChatCardListStudent";
import ChatGroupListEmployer from "@/components/chat/chatCardList/employer/ChatGroupListEmployer";
import DefaultChatRoom from "@/components/chat/chatRoom/DefaultChatRoom";

export default async function Page() {
  // Session
  const session = await getServerSession(authOptions);
  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";
  const userId = session?.user.id ? session.user.id : null;

  return (
    <>
      {/* Desktop */}
      {/* TODO : Desktop Empty Chat room */}
      <div className="hidden lg:block">
        <DefaultChatRoom />
      </div>

      {/* Mobile */}
      {isStudent ? (
        // TODO : Mobile Student Chat list
        userId !== null && (
          <div className="pb-28 lg:hidden">
            <ChatCardListStudent studentId={userId} />
          </div >
        )
      ) : (
        // TODO : Mobile Employer Chat list
        userId !== null && (
          <div className="pb-28 lg:hidden">
            <ChatGroupListEmployer employerId={userId} />
          </div>
        )
      )}
    </>
  );
}
