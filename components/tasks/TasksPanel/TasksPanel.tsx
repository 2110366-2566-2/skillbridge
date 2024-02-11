"use client";

import React, { useState } from 'react'
import PendingTasksPanel from './PendingTasksPanel'
import DoneTasksPanel from './DoneTasksPanel'
import Link from 'next/link';
import { SortAscendingOutlined } from '@ant-design/icons';

type Props = {}

const TasksPanel = () => {

  const [isPending, setIsPending] = useState(true);
  const [startDateSortOption, setStartDateSortOption] = useState("-");
  const [endDateSortOption, setEndDateSortOption] = useState("-");
  const [priceSortOption, setPriceSortOption] = useState("-");
  const [applicantsSortOption, setApplicantsSortOption] = useState("-");

  return (
    <>
        <nav className="mb-3">
            <div className="flex flex-row gap-1 bg-slate-100 w-fit p-2 rounded-sm">
                <button className={`${isPending ? 'bg-slate-50' : '' } hover:shadow-inner font-medium text-md rounded-sm px-[12px] py-[6px] `} onClick={() => setIsPending(true)}>งานปัจจุบัน</button>
                <button className={`${isPending ? '' : 'bg-slate-50'} hover:shadow-inner font-medium text-md rounded-sm px-[12px] py-[6px]`} onClick={() => setIsPending(false)}>งานที่เสร็จแล้ว</button>
            </div>
        </nav>

        <section className="my-3">
            <div className="flex flex-row gap-2 justify-end">
                <button className="bg-slate-300 font-medium text-md rounded-md px-3 py-2 hover:shadow-md">
                    <div className="flex align-center">
                        <SortAscendingOutlined className="flex place-items-center"/>
                        <p>จัดเรียง</p>
                    </div>
                </button>
                <Link href={'/works/create'} key={'createWork'}>
                    <button className={`${isPending ? '' : 'hidden' } bg-slate-900 font-medium text-md text-white rounded-md px-3 py-2 hover:shadow-md`}>สร้างงาน</button>
                </Link>
                
            </div>
        </section>

        <div className="flex flex-row justify-between gap-2">
            {isPending ? <PendingTasksPanel startDateSortOption={startDateSortOption} endDateSortOption={endDateSortOption} priceSortOption={priceSortOption} applicantsSortOption={applicantsSortOption}></PendingTasksPanel> : <DoneTasksPanel startDateSortOption={startDateSortOption} endDateSortOption={endDateSortOption} priceSortOption={priceSortOption} applicantsSortOption={applicantsSortOption}></DoneTasksPanel>}
            <aside className="flex flex-col bg-slate-100 rounded-sm py-7 px-4 w-[200px] h-fit">
                <div className="text-2xl font-semibold">จัดเรียง</div>
                <div className="text-lg font-semibold mt-4 mb-2">ช่วงเวลา</div>
                <div className="flex flex-col gap-1 mb-2">
                    <p>วันที่เริ่มต้น</p>
                    <select value={startDateSortOption} onChange={(e) => {setStartDateSortOption(e.target.value)}}>
                        <option value="">-</option>
                        <option value="asc">น้อยไปมาก</option>
                        <option value="desc">มากไปน้อย</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <p>วันที่สิ้นสุด</p>
                    <select value={endDateSortOption} onChange={(e) => {setEndDateSortOption(e.target.value)}}>
                        <option value="">-</option>
                        <option value="asc">น้อยไปมาก</option>
                        <option value="desc">มากไปน้อย</option>
                    </select>
                </div>
                <div className="text-lg font-semibold mt-4 mb-2">ราคา</div>
                <div className="flex flex-col gap-1 mb-2">
                    <select value={priceSortOption} onChange={(e) => {setPriceSortOption(e.target.value)}}>
                        <option value="">-</option>
                        <option value="asc">น้อยไปมาก</option>
                        <option value="desc">มากไปน้อย</option>
                    </select>
                </div>
                <div className="text-lg font-semibold mt-4 mb-2">จำนวนผู้สมัคร</div>
                <div className="flex flex-col gap-1 mb-2">
                    <select value={applicantsSortOption} onChange={(e) => {setApplicantsSortOption(e.target.value)}}>
                        <option value="">-</option>
                        <option value="asc">น้อยไปมาก</option>
                        <option value="desc">มากไปน้อย</option>
                    </select>
                </div>
            </aside>
        </div>
    </>
  )
}

export default TasksPanel