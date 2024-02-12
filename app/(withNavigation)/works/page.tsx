import React from "react";
import TasksPanel from "@/components/tasks/TasksPanel/TasksPanel";

export default function WorkPage() {

  return <div className="px-10">
    <header className="text-[36px] font-semibold mb-10">งานของฉัน</header>

    <TasksPanel></TasksPanel>
  </div>;
};
