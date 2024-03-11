import { getEmployerJobs } from "@/actions/lookup/employee/jobs";
import TaskCardType from "../../types/JobCardType";

const fetchInitialData = async (userId: string) => {
  const result = await getEmployerJobs(userId);

  const tasks: Array<TaskCardType> = result.map((task) => {
    return {
      jobId: task.id,
      isDeleted: task.isDeleted,
      name: task.title,
      budget: task.budget,
      description: task.description,
      category: task.jobTags,
      applicants: task.acceptNum,
      maxApplicants: task.maxAcceptNum,
      startDate: task.startDate,
      endDate: task.endDate,
      isPending: task.jobStatus === "NOT_STARTED",
    };
  });

  console.log(tasks);
  const pendingTasks: Array<TaskCardType> = tasks.filter(
    (task) => task.isPending === true,
  );
  const doneTasks: Array<TaskCardType> = tasks.filter(
    (task) => task.isPending === false,
  );

  return [pendingTasks, doneTasks];
};

export default fetchInitialData;

// {name: task.title, budget: task.budget, description: task.description, category: task.jobTags, applicants: task.acceptNum, maxApplicants: task.maxAcceptNum, startDate: task.startDate, endDate: task.endDate, isPending: task.jobStatus === "NOT_STARTED"}
