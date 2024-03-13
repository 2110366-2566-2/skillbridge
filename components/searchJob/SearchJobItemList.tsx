"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SearchJobItem from "@/components/searchJob/SearchJobItem";
import LoadingJobItem from "./LoadingJobItem";
import SearchNotFound from "./SearchNotFound";
import {
    getDefaultSearchJobs,
    getSearchJobs,
    job,
    jobFilter,
} from "@/actions/search/jobs";

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
                console.error("Error fetching default jobs:", error);
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
                let queryJobs: job[];
                const { q, filter_used } = Object.fromEntries(searchParams);
                if (filter_used && q) {
                    const { sd, ed, min, max, tag } = Object.fromEntries(searchParams);
                    const jobFilter: jobFilter = {
                        startDate: sd ? new Date(sd) : undefined,
                        endDate: ed ? new Date(ed) : undefined,
                        lowestBudget: min ? parseInt(min) : undefined,
                        highestBudget: max ? parseInt(max) : undefined,
                        jobTag: tag ? tag : undefined,
                    };
                    // console.log(jobFilter)
                    queryJobs = await getSearchJobs(q, jobFilter);
                    setJobs(queryJobs);
                } else if (!filter_used && q) {
                    queryJobs = await getSearchJobs(q);
                    setJobs(queryJobs);
                } else if (!filter_used && !q) {
                    queryJobs = await getDefaultSearchJobs();
                    setJobs(queryJobs);
                }
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
                ))
            ) : jobs.length ? (
                jobs.map((job, index) => <SearchJobItem key={index} job={job} />)
            ) : (
                <div className="col-span-full">
                    <SearchNotFound text="ขออภัย ไม่พบงานที่ค้นหา" />
                </div>
            )}
        </div>
    );
}
