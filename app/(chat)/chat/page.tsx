import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export default async function Page() {
  // Session
  const session = await getServerSession(authOptions);
  const isStudent = session?.email.split("@")[1] === "student.chula.ac.th";

  return (
    <>
      {/* Desktop */}
      {/* TODO : Desktop Empty Chat room */}
      <div className="hidden md:block">Desktop Empty Chat room</div>

      {/* Mobile */}
      {isStudent ? (
        // TODO : Mobile Student Chat list
        <div className="md:hidden">Mobile Student Chat list</div>
      ) : (
        // TODO : Mobile Employer Chat list
        <div className="md:hidden">Mobile Employer Chat list</div>
      )}
    </>
  );
}
