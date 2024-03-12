import { CloseOutlined, SortAscendingOutlined } from "@ant-design/icons";
import React, { Dispatch, SetStateAction } from "react";

type UseStatePair<T> = {
  name: string;
  value: T;
  set: Dispatch<SetStateAction<T>>;
};

type Props = {
  sideBarState: UseStatePair<boolean>;
  sortOptions: UseStatePair<string>[];
}

const Sorter = ({
  sideBarState, sortOptions
}: Props) => {
  return (
    <>
      <button
        className="bg-slate-300 font-medium text-md rounded-md px-3 py-2 hover:shadow-md"
        onClick={() => {
          sideBarState.set(true);
        }}
      >
        <div className="flex align-center">
          <SortAscendingOutlined className="flex place-items-center" />
          <p>จัดเรียง</p>
        </div>
      </button>

      {(sideBarState.value === true) ? (
        <>
          <div className="z-10 bg-neutral-800 opacity-60 fixed top-0 right-0 left-0 bottom-0"></div>
          <aside className="fixed font-ibm z-20 bg-slate-50 text-slate-900 top-0 left-0 w-2/3 h-screen flex flex-col items-center pt-7 px-7 pb-40 md:pb-7 justify-between overflow-y-auto">
            <div className="flex flex-col gap-8 justify-start w-full">

              {/* header */}
              <div className="flex flex-row justify-between">
                <div className="text-3xl font-bold text-slate-800 mb-6">
                  จัดเรียง
                </div>
                <CloseOutlined
                  onClick={() => {
                    sideBarState.set(false);
                  }}
                />
              </div>
    
              {/* sort options */}
              {
                sortOptions.map((option) => {
                  return (
                    <section>
                      <div className="text-xl font-bold text-slate-800 mt-2">{option.name}</div>
                      <div className="flex flex-col gap-2 mb-2">
                        <select
                          key={option.name}
                          value={option.value}
                          onChange={(e) => {
                            option.set(e.target.value);
                          }}
                          className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
                        >
                          <option value="">-</option>
                          <option value="asc">น้อยไปมาก</option>
                          <option value="desc">มากไปน้อย</option>
                        </select>
                      </div>
                    </section>
                  )
                })
              }
              
            </div>

            {/* footer */}
            <footer className="flex flex-row justify-between gap-2 w-full mt-8 md:mt-0">

              {/* clear sort options */}
              <button
                onClick={() => {
                  sortOptions.forEach((option) => {
                    option.set("");
                  })
                }}
                className="w-1/2 min-h-[40px] text-slate-700 text-[16px] rounded-md hover:bg-slate-200 focus:ring-2 focus:outline-none focus:ring-slate-300"
              >
                ล้าง
              </button>

              {/* commit sorting button */}
              <button
                className="w-1/2 min-h-[40px] text-white text-[16px] rounded-md bg-slate-700 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300"
                onClick={() => {
                  sideBarState.set(false);
                }}
              >
                จัดเรียง
              </button>
            </footer>
          </aside>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Sorter;
