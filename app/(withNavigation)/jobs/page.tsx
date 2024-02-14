import React from "react";
import TasksMenu from "@/components/tasks/TasksPanel/TasksMenu";

export default function WorkPage() {

  return <div className="px-10">
    <header className="text-[36px] font-semibold mb-10">งานของฉัน</header>

    <TasksMenu></TasksMenu>
  </div>;
};
