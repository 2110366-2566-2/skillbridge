import SearchJobItemList from "@/components/searchJob/SearchJobItemList";
import SearchKeywordText from "@/components/searchJob/SearchKeywordText";

export default function SearchPage() {
  return (
    <>
      <div className="hidden md:block ml-[7%] my-4">
        <SearchKeywordText />
      </div>

      <div className="md:flex md:flex-col md:items-center">
        <SearchJobItemList />
      </div>
    </>
  )
}
