"use client"

import { useEffect, useState } from "react";
import SearchTaskItem from "@/components/searchTask/SearchTaskItem";
import { getDefaultSearchJobs } from "@/actions/tasks";

interface job {
    title: string,
    startDate: string | undefined,
    endDate: string | undefined,
    jobTags: string[],
    description: string,
    acceptNum: number,
    maxAcceptNum: number,
    price: number
}

export default function SearchTaskItemList() {
    const [tasks, setTasks] = useState<job[]>([]);

    useEffect(() => {
        async function fetchDefaultTasks() {
            const defaultTasks: job[] = await getDefaultSearchJobs();
            setTasks(defaultTasks);
        }

        fetchDefaultTasks();
    }, []);

    return (
        <div>
            {tasks.map((task, index) => (
                <li key={index}>
                    {JSON.stringify(task)} {/* Example rendering */}
                </li>
            ))}
        </div>
    )
}