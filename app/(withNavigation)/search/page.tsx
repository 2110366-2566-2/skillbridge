import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import SearchJobItemList from "@/components/searchJob/SearchJobItemList";
import SearchKeywordText from "@/components/searchJob/SearchKeywordText";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SearchPage() {
  // const {data : session} = useSession();

    // console.log("------------------------------------------------------------")
    const session = await getServerSession(authOptions) //Server

    // console.log("session : \n", session);
    if (!session) {
      // console.log(".\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n.\n")
      redirect("/login");
    }

  return (
    <>
      <div className="hidden md:block ml-[7%] my-4">
        <Suspense>
          <SearchKeywordText />
        </Suspense>
      </div>

      <div className="md:flex md:flex-col md:items-center">
        <Suspense>
          <SearchJobItemList />
        </Suspense>
      </div>
    </>
  )
}
