"use client"

import ReduxProvider from "@/redux/redux-provider";
import ChatCardListStudent from "./chatCardList/student/ChatCardListStudent";
import ChatGroupListEmployer from "./chatCardList/employer/ChatGroupListEmployer";
import getIsStudent from "@/actions/authentication/getIsStudent";
import getUserId from "@/actions/authentication/getUserId";
import { useEffect } from "react"

type Props = {
    isStudent: boolean,
    userId: string | null
}

export default function MobileChatPage({ isStudent, userId }: Props) {

    return (
        <ReduxProvider>
            <div className="rounded-3xl bg-slate-50 min-h-[80vh] py-5">
                {isStudent ? (
                    // TODO : Mobile Student Chat list
                    userId !== null && (
                        <div>
                            <ChatCardListStudent studentId={userId} />
                        </div >
                    )
                ) : (
                    // TODO : Mobile Employer Chat list
                    userId !== null && (
                        <div>
                            <ChatGroupListEmployer employerId={userId} />
                        </div>
                    )
                )}
            </div>
        </ReduxProvider>
    )
}