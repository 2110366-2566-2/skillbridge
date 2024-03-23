import Header from "@/components/layout/header/Header";
import Footer from "@/components/layout/footer/Footer";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export default async function NavigationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Session
  const session = await getServerSession(authOptions);
  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex flex-col justify-between min-h-full bg-slate-800">
        <Header />
        <div className="rounded-3xl bg-slate-50 min-h-[80vh] p-5">
          {/* TODO : Container */}
          <div className="flex gap-20">
            {isStudent ? (
              // TODO : Desktop Student Chat list
              <div>Desktop Student Chat list</div>
            ) : (
              // TODO : Desktop Employer Chat list
              <div>Desktop Employer Chat list</div>
            )}
            {/* TODO : Container of Chat room (chat/page.tsx & [userId]/page.tsx) */}
            <div>{children}</div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Mobile */}
      <div className="md:hidden">{children}</div>
    </>
  );
}