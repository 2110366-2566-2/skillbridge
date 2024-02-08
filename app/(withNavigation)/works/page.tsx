import React from "react";
import PendingTasksPanel from '../../../components/tasks/PendingTasksPanel';

export default function WorkPage() {
  
  return <div className="px-10">
    <header className="text-[36px] font-semibold mb-10">งานของฉัน</header>

    <nav className="mb-3">
      <div className="flex flex-row gap-1 bg-slate-100 w-fit p-2 rounded-sm">
        <button className={`bg-slate-50 hover:shadow-inner font-medium text-md rounded-sm px-[12px] py-[6px] `}>งานที่กำลังรับสมัคร</button>
        <button className="hover:shadow-inner font-medium text-md rounded-sm px-[12px] py-[6px]">งานที่เสร็จแล้ว</button>
      </div>
    </nav>

    <section>
      <div className="flex flex-row gap-2 justify-end">
        <button className="bg-slate-300 font-medium text-md rounded-md px-[10px] py-[4px]">จัดเรียง</button>
        <button className="bg-slate-900 font-medium text-md text-white rounded-md px-[10px] py-[4px]">สร้างงาน</button>
      </div>
    </section>

    <PendingTasksPanel></PendingTasksPanel>
  </div>;
};
