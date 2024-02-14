import { getEmployerJobs } from "@/actions/lookup/employee/jobs";
import TaskCardType from "../../types/TaskCardType";

const fetchInitialData = async () => {
    const idSample = ["92e60ed5-51d8-4875-bb4e-5760a09a0449",
    "cf7ca13a-cd83-41a9-a40b-d36a852048f2",
    "11cde2b8-4ff9-4912-ba19-9530fb23a20b",
    "64cef790-e24e-4265-8be6-856f6d32414a"];
    
    const result = await getEmployerJobs(idSample[Math.floor(Math.random() * idSample.length)]);

    const tasks: Array<TaskCardType>  = result.map((task) => {return {name: task.title, budget: task.budget, description: task.description, category: task.jobTags, applicants: task.acceptNum, maxApplicants: task.maxAcceptNum, startDate: task.startDate, endDate: task.endDate, isPending: task.jobStatus === "NOT_STARTED"}});

    const pendingTasks: Array<TaskCardType> = tasks.filter((task) => task.isPending === true);
    const doneTasks: Array<TaskCardType> = tasks.filter((task) => task.isPending === false);

    return [pendingTasks, doneTasks];
  };

export default fetchInitialData;

// {name: task.title, budget: task.budget, description: task.description, category: task.jobTags, applicants: task.acceptNum, maxApplicants: task.maxAcceptNum, startDate: task.startDate, endDate: task.endDate, isPending: task.jobStatus === "NOT_STARTED"}