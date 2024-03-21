type JobCardType = {
  jobId: string;
  isDeleted: boolean;
  name: string;
  budget: Number;
  description: string;
  category: string;
  applicants: Number;
  maxApplicants: Number;
  startDate: Date;
  endDate: Date;
  isPending: Boolean;
};

export default JobCardType;
