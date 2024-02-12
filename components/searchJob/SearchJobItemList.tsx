"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchJobItem from "@/components/searchJob/SearchJobItem";
import LoadingJobItem from "./LoadingJobItem";
import SearchNotFound from "./SearchNotFound";
import { getDefaultSearchJobs, getSearchJobs, job } from "@/actions/search/jobs";

export default function SearchJobItemList() {
    const [jobs, setJobs] = useState<job[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const searchParams = useSearchParams();

    useEffect(() => {
        async function fetchDefaultJobs() {
            try {
                if (!searchParams) {
                    const defaultJobs: job[] = await getDefaultSearchJobs();
                    setJobs(defaultJobs);
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false); // Update loading state once data fetching is complete
            }
        }

        fetchDefaultJobs();
    }, []);

    useEffect(() => {
        async function fetchJobs() {
            try {
                setLoading(true);
                const q = searchParams.get("q");
                const queryJobs: job[] = q ? await getSearchJobs(q) : await getDefaultSearchJobs();
                setJobs(queryJobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false); // Update loading state once data fetching is complete
            }
        }

        fetchJobs();
    }, [searchParams]);

    return (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {loading ? ( // Render skeleton loader if loading is true
                Array.from({ length: 12 }).map((_, index) => (
                    <LoadingJobItem key={index} />
                ))) : (
                jobs.length ? jobs.map((job, index) => (
                    <SearchJobItem key={index} job={job} />
                )) : (
                    <div className="col-span-full">
                        <SearchNotFound />
                    </div>
                )
            )}
        </div>
    );
}