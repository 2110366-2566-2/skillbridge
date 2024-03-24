import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import ChatCardListStudent from "@/components/chat/student/ChatCardListStudent";
import ChatGroupListEmployer from "@/components/chat/employer/ChatGroupListEmployer";

export default async function Page() {
  // Session
  const session = await getServerSession(authOptions);
  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";
  const userId = session?.user.id ? session.user.id : null;

  return (
    <>
      {/* Desktop */}
      {/* TODO : Desktop Empty Chat room */}
      <div className="hidden lg:block">Desktop Empty Chat room</div>

      {/* Mobile */}
      {isStudent ? (
        // TODO : Mobile Student Chat list
        userId !== null && (
          <div className="pb-28 lg:hidden" >
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
