import { getEmployerJobs } from "@/actions/jobs/getEmployerJobs";
import TaskCardType from "../../types/JobCardType";
import getStudentByJob from "@/actions/jobs/getStudentByJob";
import { convertStateNameToThai, getStudentByJobAdapter } from "./adapter";
import getJobById from "@/actions/jobs/getJobByID";

const fetchInitialData = async () => {
  const result = await getEmployerJobs();

  if (result) {
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
  } else {
    return [[], []];
  }
};
export default fetchInitialData;

export const fetchGetStudentByJob = async (
  jobId: string,
  filter: string = "",
) => {
  const studentListResponse = await getStudentByJob(jobId);
  let studentList = (
    studentListResponse === undefined ? [] : studentListResponse
  ).map((student) => getStudentByJobAdapter(student));
  // console.log(`fetched data using filter: ${filter}, we got: ${studentList}`);

  studentList = studentList.filter((student) => convertStateNameToThai("employer", student.status));
  const result = studentList.filter((student) => {return (student.status === filter) || (filter === "")});

  return result;
};
