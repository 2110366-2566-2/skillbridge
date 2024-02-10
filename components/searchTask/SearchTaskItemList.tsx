"use client"

import { useEffect, useState } from "react";
import SearchTaskItem from "@/components/searchTask/SearchTaskItem";
import LoadingTaskItem from "./LoadingTaskItem";
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
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchDefaultTasks() {
            try {
                const defaultTasks: job[] = await getDefaultSearchJobs();
                setTasks(defaultTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            } finally {
                setLoading(false); // Update loading state once data fetching is complete
            }
        }

        fetchDefaultTasks();
    }, []);

    return (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {loading ? ( // Render skeleton loader if loading is true
                Array.from({ length: 8 }).map((_, index) => (
                    <LoadingTaskItem key={index} />
                ))) : (
                tasks.map((task, index) => (
                    <SearchTaskItem key={index} task={task} />
                ))
            )}
        </div>
    );
}