import SearchTaskItem from "@/components/searchTask/SearchTaskItem";
import React from "react";

export default function SearchPage() {
  return (
    <div className="md:flex md:flex-col md:items-center">
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <SearchTaskItem />
        <SearchTaskItem />
        <SearchTaskItem />
        <SearchTaskItem />
        <SearchTaskItem />
        <SearchTaskItem />
        <SearchTaskItem />
        <SearchTaskItem />
        <SearchTaskItem />
        <SearchTaskItem />
        <SearchTaskItem />
      </div>
    </div>
  )
}
