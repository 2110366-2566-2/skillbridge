import React from 'react'

type Props = {}

const abandonedSortPanel = (props: Props) => {
  return (
    <aside className="hidden lg:flex lg:flex-col bg-slate-50 rounded-sm pt-7 pb-2 px-4 w-[200px] h-fit shadow-xl">
    {/* <div className="text-2xl font-semibold">จัดเรียง</div>
    <div className="text-lg font-semibold mt-4 mb-2 text-slate-800">
      ช่วงเวลา
    </div>
    <div className="flex flex-col gap-1 mb-2">
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
    <div className="flex flex-col gap-1">
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
    <div className="text-lg font-semibold mt-4 mb-2 text-slate-800">
      ราคา
    </div>
    <div className="flex flex-col gap-1 mb-2">
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
    <div className="text-lg font-semibold mt-4 mb-2 text-slate-800">
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
    <div className="mt-2">
      <button
        onClick={() => {
          setStartDateSortOption("");
          setEndDateSortOption("");
          setPriceSortOption("");
          setApplicantsSortOption("");
        }}
        className="w-full min-h-[40px] text-slate-700 text-[16px] rounded-md hover:bg-slate-200 focus:ring-2 focus:outline-none focus:ring-slate-300"
      >
        ล้าง
      </button>
    </div> */}
  </aside>
  )
}

export default abandonedSortPanel