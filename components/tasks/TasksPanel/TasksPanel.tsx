"use client";

import React, { useState } from 'react'
import PendingTasksPanel from './PendingTasksPanel'
import DoneTasksPanel from './DoneTasksPanel'
import Link from 'next/link';

type Props = {}

const TasksPanel = () => {

  const [isPending, setIsPending] = useState(true);

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
                <button className="bg-slate-300 font-medium text-md rounded-md px-3 py-2 hover:shadow-md">จัดเรียง</button>
                <Link href={'/works/create'} key={'createWork'}>
                    <button className="bg-slate-900 font-medium text-md text-white rounded-md px-3 py-2 hover:shadow-md">สร้างงาน</button>
                </Link>
                
            </div>
        </section>

        {isPending ? <PendingTasksPanel></PendingTasksPanel> : <DoneTasksPanel></DoneTasksPanel>}
    </>
  )
}

export default TasksPanel