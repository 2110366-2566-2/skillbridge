import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import ChatCardListStudent from "@/components/chat/chatCardList/student/ChatCardListStudent";
import ChatGroupListEmployer from "@/components/chat/chatCardList/employer/ChatGroupListEmployer";
import DesktopChatPage from "@/components/chat/DesktopChatPage";

export default async function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Session
  const session = await getServerSession(authOptions);
  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";
  const userId = session?.user.id ? session.user.id : null;

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:flex flex-col justify-between min-h-full bg-slate-800">
        <Header />
        <DesktopChatPage children={children} isStudent={isStudent} userId={userId} />
        {/* <div className="rounded-3xl bg-slate-50 min-h-[80vh] p-5"> */}
        {/* TODO : Container */}
        {/* <div className="flex gap-4">
            {isStudent ? (
              // TODO : Desktop Student Chat list
              userId !== null && (
                <div className="hidden lg:block min-w-[430px] w-[30vw] max-h-[80vh] overflow-y-auto">
                  <ChatCardListStudent studentId={userId} />
                </div >
              )
            ) : (
              // TODO : Desktop Employer Chat list
              userId !== null && (
                <div className="hidden lg:block min-w-[430px] w-[30vw] max-h-[80vh] overflow-y-auto">
                  <ChatGroupListEmployer employerId={userId} />
                </div>
              )
            )}
            {/* TODO : Container of Chat room (chat/page.tsx & [userId]/page.tsx) */}
        {/* <div className="w-full">{children}</div> */}
        {/* </div> */}
        {/* </div> */}
        <Footer />
      </div>

      {/* Mobile */}
      <div className="lg:hidden">{children}</div>
    </>
  );
}
