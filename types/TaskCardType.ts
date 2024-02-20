type TaskCardType = {
  jobId: string;
  isDeleted: boolean;
  name: string;
  budget: Number;
  description: string;
  category: string;
  applicants: Number;
  maxApplicants: Number;
  startDate: string;
  endDate: string;
  isPending: Boolean;
};

export default TaskCardType;