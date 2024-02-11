"use client"

import { useEffect, useState } from "react";
import SearchJobItem from "@/components/searchJob/SearchJobItem";
import LoadingJobItem from "./LoadingJobItem";
import { getDefaultSearchJobs, job } from "@/actions/search/jobs";

export default function SearchJobItemList() {
    const [jobs, setJobs] = useState<job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchDefaultJobs() {
            try {
                const defaultJobs: job[] = await getDefaultSearchJobs();
                setJobs(defaultJobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false); // Update loading state once data fetching is complete
            }
        }

        fetchDefaultJobs();
    }, []);

    return (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {loading ? ( // Render skeleton loader if loading is true
                Array.from({ length: 8 }).map((_, index) => (
                    <LoadingJobItem key={index} />
                ))) : (
                jobs.map((job, index) => (
                    <SearchJobItem key={index} job={job} />
                ))
            )}
        </div>
    );
}