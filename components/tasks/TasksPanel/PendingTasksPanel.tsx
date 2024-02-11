import React from 'react'
import TaskCard from '../TaskCard'

type Props = {
  startDateSortOption: String,
  endDateSortOption: String,
  priceSortOption: String,
  applicantsSortOption: String
};

type mockUpDatumn = {
    name: String,
    budget: Number,
    description: String,
    category: String,
    applicants: Number,
    maxApplicants: Number,
    startDate: String,
    endDate: String,
};

const sortArray = (array: Array<mockUpDatumn> = [], startDateSortOption: String = '', endDateSortOption: String = '', priceSortOption: String = '', applicantsSortOption: String = '') => {
    if (startDateSortOption === 'asc') {
        array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
            return a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0;
        });
    } else if (startDateSortOption === 'desc') {
        array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
            return b.startDate < a.startDate ? -1 : b.startDate > a.startDate ? 1 : 0;
        });
    }

    if (endDateSortOption === 'asc') {
        array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
            return a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0;
        });
    } else if (endDateSortOption === 'desc') {
        array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
            return b.endDate < a.endDate ? -1 : b.endDate > a.endDate ? 1 : 0;
        });
    }

    if (priceSortOption === 'asc') {
        array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
            return a.budget < b.budget ? -1 : a.budget > b.budget ? 1 : 0;
        });
    } else if (priceSortOption === 'desc') {
        array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
            return b.budget < a.budget ? -1 : b.budget > a.budget ? 1 : 0;
        });
    }

    if (applicantsSortOption === 'asc') {
        array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
            return a.applicants < b.applicants ? -1 : a.applicants > b.applicants ? 1 : 0;
        });
    } else if (applicantsSortOption === 'desc') {
        array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
            return b.applicants < a.applicants ? -1 : b.applicants > a.applicants ? 1 : 0;
        });
    }

    return array;
}

const PendingTasksPanel = ({startDateSortOption, endDateSortOption, priceSortOption, applicantsSortOption}: Props) => {

  const mockUpDatumn1: mockUpDatumn = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 6000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 7,
    maxApplicants: 10,
    startDate: "2022-10-10",
    endDate: "2022-10-20",
};

const mockUpDatumn2: mockUpDatumn = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 7000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 8,
    maxApplicants: 11,
    startDate: "2023-10-10",
    endDate: "2023-10-20",
};

const mockUpDatumn3: mockUpDatumn = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 8000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 9,
    maxApplicants: 12,
    startDate: "2024-10-10",
    endDate: "2024-10-20",
};

const mockUpDatumn4: mockUpDatumn = {
    name: "รับสมัคร TA วิชา Comp Prog",
    budget: 9000,
    description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
    category: "การสอน",
    applicants: 10,
    maxApplicants: 13,
    startDate: "2025-10-10",
    endDate: "2025-10-20",
};

let mockUpData: Array<mockUpDatumn> = [mockUpDatumn1, mockUpDatumn2, mockUpDatumn3, mockUpDatumn4];

  mockUpData = sortArray(mockUpData, startDateSortOption, endDateSortOption, priceSortOption, applicantsSortOption);

  return (
    <main className="flex flex-col">
      <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 grid-flow-row gap-10">
        {mockUpData.map((data) => {
          return <TaskCard name={data.name} budget={data.budget} description={data.description} category={data.category} applicants={data.applicants} maxApplicants={data.maxApplicants} startDate={data.startDate} endDate={data.endDate} isPending={true}></TaskCard>
        })}
      </main>
    </main>
  );
};

export default PendingTasksPanel;