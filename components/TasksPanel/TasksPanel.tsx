import TaskCard from "./TaskCard";
import sortArray from "../../lib/Jobs/sortArray";
import TaskCardType from "../../types/TaskCardType";
import { LoadingOutlined } from "@ant-design/icons";

type Props = {
  startDateSortOption: string;
  endDateSortOption: string;
  priceSortOption: string;
  applicantsSortOption: string;
  data: Array<TaskCardType>;
  isPending: Boolean;
};

// export function
const DoneTasksPanel = ({
  startDateSortOption,
  endDateSortOption,
  priceSortOption,
  applicantsSortOption,
  data,
  isPending,
}: Props) => {

  const taskCardList = sortArray(
    data,
    startDateSortOption,
    endDateSortOption,
    priceSortOption,
    applicantsSortOption
  );

  return (
    <main className="flex flex-col">
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
        {taskCardList.length !== 0 ? (taskCardList.map((data, index) => {
          return (
            <TaskCard
              key={index}
              name={data.name}
              budget={data.budget}
              description={data.description}
              category={data.category}
              applicants={data.applicants}
              maxApplicants={data.maxApplicants}
              startDate={data.startDate}
              endDate={data.endDate}
              isPending={isPending}
            ></TaskCard>
          );
        })) 
        : (
          <div className="flex justify-center items-center">
            <div className="font-medium text-lg text-slate-500 mt-4 mx-auto md:text-2xl md:my-6 lg:font-normal">ขออภัย ไม่พบงานที่ค้นหา</div>
          </div>
        )}
      </main>
    </main>
  );
};

export default DoneTasksPanel;
