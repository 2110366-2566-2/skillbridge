import { CloseOutlined, SortAscendingOutlined } from "@ant-design/icons";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  isOpeningSideBar: boolean;
  setIsOpeningSideBar: Dispatch<SetStateAction<boolean>>;
  startDateSortOption: string;
  setStartDateSortOption: Dispatch<SetStateAction<string>>;
  endDateSortOption: string;
  setEndDateSortOption: Dispatch<SetStateAction<string>>;
  priceSortOption: string;
  setPriceSortOption: Dispatch<SetStateAction<string>>;
  applicantsSortOption: string;
  setApplicantsSortOption: Dispatch<SetStateAction<string>>;
};

const Sorter = ({
  isOpeningSideBar,
  setIsOpeningSideBar,
  startDateSortOption,
  setStartDateSortOption,
  endDateSortOption,
  setEndDateSortOption,
  priceSortOption,
  setPriceSortOption,
  applicantsSortOption,
  setApplicantsSortOption,
}: Props) => {
  return (
    <>
      <button
        className="bg-slate-300 font-medium text-md rounded-md px-3 py-2 hover:shadow-md"
        onClick={() => {
          setIsOpeningSideBar(true);
        }}
      >
        <div className="flex align-center">
          <SortAscendingOutlined className="flex place-items-center" />
          <p>จัดเรียง</p>
        </div>
      </button>

      {isOpeningSideBar ? (
        <>
          <div className="z-10 bg-neutral-800 opacity-60 fixed top-0 right-0 left-0 bottom-0"></div>
          <aside className="fixed font-ibm z-20 bg-slate-50 text-slate-900 top-0 left-0 w-2/3 h-screen flex flex-col items-center pt-7 px-7 pb-40 md:pb-7 justify-between overflow-y-auto">
            <div className="flex flex-col gap-8 justify-start w-full">
              <div className="flex flex-row justify-between">
                <div className="text-3xl font-bold text-slate-800 mb-6">
                  จัดเรียง
                </div>
                <CloseOutlined
                  onClick={() => {
                    setIsOpeningSideBar(false);
                  }}
                />
              </div>

              <div className="text-xl font-bold text-slate-800 mt-2">
                ช่วงเวลา
              </div>
              <div className="flex flex-row justify-between gap-2">
                <div className="flex flex-col w-full">
                  <p className="font-medium text-[16px] text-slate-800 mb-1">
                    วันที่เริ่มต้น
                  </p>
                  <select
                    value={startDateSortOption}
                    onChange={(e) => {
                      setStartDateSortOption(e.target.value);
                    }}
                    className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
                  >
                    <option value="">-</option>
                    <option value="asc">น้อยไปมาก</option>
                    <option value="desc">มากไปน้อย</option>
                  </select>
                </div>
                <div className="flex flex-col w-full">
                  <p className="font-medium text-[16px] text-slate-800 mb-1">
                    วันที่สิ้นสุด
                  </p>
                  <select
                    value={endDateSortOption}
                    onChange={(e) => {
                      setEndDateSortOption(e.target.value);
                    }}
                    className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
                  >
                    <option value="">-</option>
                    <option value="asc">น้อยไปมาก</option>
                    <option value="desc">มากไปน้อย</option>
                  </select>
                </div>
              </div>

              <div className="text-xl font-bold text-slate-800 mt-2">ราคา</div>
              <div className="flex flex-col gap-2 mb-2">
                <select
                  value={priceSortOption}
                  onChange={(e) => {
                    setPriceSortOption(e.target.value);
                  }}
                  className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
                >
                  <option value="">-</option>
                  <option value="asc">น้อยไปมาก</option>
                  <option value="desc">มากไปน้อย</option>
                </select>
              </div>
              <div className="text-xl font-bold text-slate-800 mt-2">
                จำนวนผู้สมัคร
              </div>
              <div className="flex flex-col gap-1 mb-2">
                <select
                  value={applicantsSortOption}
                  onChange={(e) => {
                    setApplicantsSortOption(e.target.value);
                  }}
                  className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 w-full p-2"
                >
                  <option value="">-</option>
                  <option value="asc">น้อยไปมาก</option>
                  <option value="desc">มากไปน้อย</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row justify-between gap-2 w-full mt-8 md:mt-0">
              <button
                onClick={() => {
                  setStartDateSortOption("");
                  setEndDateSortOption("");
                  setPriceSortOption("");
                  setApplicantsSortOption("");
                }}
                className="w-1/2 min-h-[40px] text-slate-700 text-[16px] rounded-md hover:bg-slate-200 focus:ring-2 focus:outline-none focus:ring-slate-300"
              >
                ล้าง
              </button>
              <button
                className="w-1/2 min-h-[40px] text-white text-[16px] rounded-md bg-slate-700 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300"
                onClick={() => {
                  setIsOpeningSideBar(false);
                }}
              >
                จัดเรียง
              </button>
            </div>
          </aside>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Sorter;
