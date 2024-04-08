import JobCard from "./JobCard";
import sortArray from "../../../lib/Jobs/sortArray";
import JobCardType from "../../../types/JobCardType";
import SearchNotFound from "../../searchJob/SearchNotFound";
import LoadingJobCard from "./LoadingJobCard";

type Props = {
  startDateSortOption: string;
  endDateSortOption: string;
  priceSortOption: string;
  applicantsSortOption: string;
  data: Array<JobCardType>;
  isPending: boolean;
  isLoading: boolean;
};

// export function
const JobsPanel = ({
  startDateSortOption,
  endDateSortOption,
  priceSortOption,
  applicantsSortOption,
  data,
  isPending,
  isLoading,
}: Props) => {
  console.log(data);
  const jobCardList = sortArray(
    data,
    startDateSortOption,
    endDateSortOption,
    priceSortOption,
    applicantsSortOption,
  );

  return (
    <main className="flex flex-col">
      {isLoading && (
        <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
        {Array.from({length: 8}).map((_, index) => 
          <LoadingJobCard key={index} />
      )}
      </main>
)}
      {(!isLoading && jobCardList.length !== 0) && (
        <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
          {jobCardList.map((data, index) => {
            return (
              <JobCard
                key={index}
                jobId={data.jobId}
                name={data.name}
                budget={data.budget}
                description={data.description}
                category={data.category}
                applicants={data.applicants}
                maxApplicants={data.maxApplicants}
                startDate={data.startDate}
                endDate={data.endDate}
                isPending={isPending}
              ></JobCard>
            );
          })}
        </main>
      )}
      {(!isLoading && jobCardList.length === 0) && (
        <div className="flex justify-center items-center">
          <SearchNotFound text="ไม่พบงาน" />
        </div>
      )}
    </main>
  );
};

export default JobsPanel;
