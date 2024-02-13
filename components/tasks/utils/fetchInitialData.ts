import { getEmployerJobs } from "@/actions/lookup/employee/jobs";
import TaskCardType from "../Types/TaskCardType";

const fetchInitialData = () => {
    const idSample = ["a9337827-e7cf-4ec4-8601-76fb5518eea1",
    "d8e9d51d-fdfc-40db-8609-cd538d9b29d3",
    "2f8b17f5-ac49-4759-a215-3b5b2fff1199"];
    
    const result = getEmployerJobs(idSample[Math.floor(Math.random() * idSample.length)]);
    console.log(result);

    const mockUpDatumn1: TaskCardType = {
            name: "รับสมัคร TA วิชา Comp Prog",
            budget: 6000,
            description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, tincidunt nunc lorem efdeiowpfkj0eipwfjeiwfjpewfjeopwfj",
            category: "การสอน",
            applicants: 7,
            maxApplicants: 10,
            startDate: "2022-10-10",
            endDate: "2022-10-20",
            isPending: true
          };
        
          const mockUpDatumn2: TaskCardType = {
            name: "รับสมัคร TA วิชา Comp Progefefef ยำดสำยสา้เบพนยานบ",
            budget: 7000,
            description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
            category: "การสอน",
            applicants: 8,
            maxApplicants: 11,
            startDate: "2023-10-10",
            endDate: "2023-10-20",
            isPending: true
          };
        
          const mockUpDatumn3: TaskCardType = {
            name: "รับสมัคร TA วิชา Comp Prog",
            budget: 8000,
            description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy",
            category: "การสอน",
            applicants: 9,
            maxApplicants: 12,
            startDate: "2024-10-10",
            endDate: "2024-10-20",
            isPending: false
          };
        
          const mockUpDatumn4: TaskCardType = {
            name: "รับสมัคร TA วิชา Comp Prog",
            budget: 9000,
            description: "รักการสอนเด็ก ๆ, มีความรู้ python numpy lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, tincidunt nunc lorem efdeiowpfkj0eipwfjeiwfjpewfjeopwfj",
            category: "การสอน",
            applicants: 10,
            maxApplicants: 13,
            startDate: "2025-10-10",
            endDate: "2025-10-20"
            ,isPending: false
          };
        
          const tasks: Array<TaskCardType> = [
            mockUpDatumn1,
            mockUpDatumn2,
            mockUpDatumn3,
            mockUpDatumn4
          ];

          const pendingTasks: Array<TaskCardType> = tasks.filter((task) => task.isPending === true);
            const doneTasks: Array<TaskCardType> = tasks.filter((task) => task.isPending === false);

          return [pendingTasks, doneTasks];
  };

export default fetchInitialData;

// {name: task.title, budget: task.budget, description: task.description, category: task.jobTags, applicants: task.acceptNum, maxApplicants: task.maxAcceptNum, startDate: task.startDate, endDate: task.endDate, isPending: task.jobStatus === "NOT_STARTED"}