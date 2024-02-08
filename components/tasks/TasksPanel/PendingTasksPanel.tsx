import React from 'react'
import TaskCard from '../TaskCard'

type Props = {};

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

const PendingTasksPanel = () => {

    const mockUpDatumn: mockUpDatumn = {
        name: "รับสมัคร TA วิชา Comp Prog",
        budget: 6000,
        description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
        category: "การสอน",
        applicants: 7,
        maxApplicants: 10,
        startDate: "2022-10-10",
        endDate: "2022-10-20",
    };
    
    const mockUpData: Array<mockUpDatumn> = Array(5).fill(mockUpDatumn);

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