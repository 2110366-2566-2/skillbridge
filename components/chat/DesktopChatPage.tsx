"use client"

import ReduxProvider from "@/redux/redux-provider";
import ChatCardListStudent from "./chatCardList/student/ChatCardListStudent";
import ChatGroupListEmployer from "./chatCardList/employer/ChatGroupListEmployer";
import getIsStudent from "@/actions/authentication/getIsStudent";
import getUserId from "@/actions/authentication/getUserId";
import { useEffect } from "react"

type Props = {
    children: React.ReactNode,
    isStudent: boolean,
    userId: string | null
}

export default function DesktopChatPage({ children, isStudent, userId }: Props) {
    // let userId = null
    // let isStudent = null

    // useEffect(() => {
    //     async function getInitialUserData() {
    //         try {
    //             userId = await getUserId();
    //             isStudent = await getIsStudent();
    //         } catch (err) {
    //             console.log(err)
    //             return;
    //         }
    //     }

    //     getInitialUserData();

    // }, [])

    return (
        <ReduxProvider>
            <div className="rounded-3xl bg-slate-50 min-h-[80vh] p-5">
                {/* TODO : Container */}
                <div className="flex gap-4">
                    {isStudent !== null ? (
                        isStudent ? (
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
                        )
                    ) : (
                        <div>กำลังดาวน์โหลด</div>
                    )
                    }
                    {/* TODO : Container of Chat room (chat/page.tsx & [userId]/page.tsx) */}
                    <div className="w-full">{children}</div>
                </div>
            </div>
        </ReduxProvider>
    )
}