import SearchJobItemList from "@/components/searchJob/SearchJobItemList";
import SearchKeywordText from "@/components/searchJob/SearchKeywordText";
import { Suspense } from "react";

export default function SearchPage() {
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
