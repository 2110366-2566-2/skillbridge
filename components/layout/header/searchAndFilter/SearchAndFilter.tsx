"use client";

import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { Suspense } from "react";

export default function SearchAndFilter() {
  const pathName = usePathname();
  const isSearchPage = pathName.startsWith("/search");

  return (
    <>
      {isSearchPage && (
        <div>
          {/* Mobile and Tablet */}
          <div className="flex flex-col lg:hidden">
            {/* Topic */}
            <div className="font-semibold text-[30px] text-white ml-5 mb-4">
              หางาน
            </div>
            {/* SearchBar and Filter */}
            <div className="flex flex-row items-center mx-5 mb-5">
              <div className="w-full mr-[10px]">
                <SearchBar />
              </div>
              <div>
                <Suspense>
                  <Filter />
                </Suspense>
              </div>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:inline-block lg:mr-2">
            {/* SearchBar and Filter */}
            <div className="flex gap-4">
              <div>
                <SearchBar />
              </div>
              <div>
                <Suspense>
                  <Filter />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
