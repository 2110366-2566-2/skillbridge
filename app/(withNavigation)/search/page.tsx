import SearchTaskItem from "@/components/searchTask/SearchTaskItem";
import SearchTaskItemList from "@/components/searchTask/SearchTaskItemList";

export default function SearchPage() {
  return (
    <div className="md:flex md:flex-col md:items-center">
      <SearchTaskItemList />
    </div>
  )
}
