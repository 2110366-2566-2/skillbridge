import React from "react";
import TaskCard from "../TaskCard";
import sortArray from "./sortArray";
import TaskCardType from "../Types/TaskCardType";
import { getEmployerJobs } from "@/actions/lookup/employee/jobs";

type Props = {
  startDateSortOption: String;
  endDateSortOption: String;
  priceSortOption: String;
  applicantsSortOption: String;
};

const DoneTasksPanel = ({
  startDateSortOption,
  endDateSortOption,
  priceSortOption,
  applicantsSortOption
}: Props) => {
  const mockUpDatumn1: TaskCardType = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 6000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 7,
    maxApplicants: 10,
    startDate: "2022-10-10",
    endDate: "2022-10-20"
  };

  const mockUpDatumn2: TaskCardType = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 7000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 8,
    maxApplicants: 11,
    startDate: "2023-10-10",
    endDate: "2023-10-20"
  };

  const mockUpDatumn3: TaskCardType = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 8000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 9,
    maxApplicants: 12,
    startDate: "2024-10-10",
    endDate: "2024-10-20"
  };

  const mockUpDatumn4: TaskCardType = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 9000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 10,
    maxApplicants: 13,
    startDate: "2025-10-10",
    endDate: "2025-10-20"
  };

  let mockUpData: Array<TaskCardType> = [
    mockUpDatumn1,
    mockUpDatumn2,
    mockUpDatumn3,
    mockUpDatumn4
  ];

  sortArray(
    mockUpData,
    startDateSortOption,
    endDateSortOption,
    priceSortOption,
    applicantsSortOption
  );

  // console.log(getEmployerJobs("a9337827-e7cf-4ec4-8601-76fb5518eea1"));

  return (
    <main className="flex flex-col">
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
        {mockUpData.map((data, index) => {
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
              isPending={false}
            ></TaskCard>
          );
        })}
      </main>
    </main>
  );
};

export default DoneTasksPanel;
