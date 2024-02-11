import React from "react";
import TaskCard from "../TaskCard";
import sortArray from "./sortArray";

type Props = {
  startDateSortOption: String;
  endDateSortOption: String;
  priceSortOption: String;
  applicantsSortOption: String;
};

type mockUpDatumn = {
  name: String;
  budget: Number;
  description: String;
  category: String;
  applicants: Number;
  maxApplicants: Number;
  startDate: String;
  endDate: String;
};

const PendingTasksPanel = ({
  startDateSortOption,
  endDateSortOption,
  priceSortOption,
  applicantsSortOption
}: Props) => {
  const mockUpDatumn1: mockUpDatumn = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 6000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 7,
    maxApplicants: 10,
    startDate: "2022-10-10",
    endDate: "2022-10-20"
  };

  const mockUpDatumn2: mockUpDatumn = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 7000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 8,
    maxApplicants: 11,
    startDate: "2023-10-10",
    endDate: "2023-10-20"
  };

  const mockUpDatumn3: mockUpDatumn = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 8000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 9,
    maxApplicants: 12,
    startDate: "2024-10-10",
    endDate: "2024-10-20"
  };

  const mockUpDatumn4: mockUpDatumn = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 9000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 10,
    maxApplicants: 13,
    startDate: "2025-10-10",
    endDate: "2025-10-20"
  };

  let mockUpData: Array<mockUpDatumn> = [
    mockUpDatumn1,
    mockUpDatumn2,
    mockUpDatumn3,
    mockUpDatumn4
  ];

  mockUpData = sortArray(
    mockUpData,
    startDateSortOption,
    endDateSortOption,
    priceSortOption,
    applicantsSortOption
  );

  return (
    <main className="flex flex-col">
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
        {mockUpData.map((data) => {
          return (
            <TaskCard
              name={data.name}
              budget={data.budget}
              description={data.description}
              category={data.category}
              applicants={data.applicants}
              maxApplicants={data.maxApplicants}
              startDate={data.startDate}
              endDate={data.endDate}
              isPending={true}
            ></TaskCard>
          );
        })}
      </main>
    </main>
  );
};

export default PendingTasksPanel;
