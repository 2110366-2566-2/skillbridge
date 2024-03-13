import { Student } from "@/types/StudentType";

export function getStudentByJobAdapter(student: any) {
  const result: Student = {
    salutation: student.user.salutation,
    firstname: student.user.firstname,
    middlename: student.user.middlename,
    lastname: student.user.lastname,
    userId: student.userId,
    jobId: student.jobId,
    createdAt: student.createdAt,
    updatedAt: student.updatedAt,
    status: student.status,
    bid: student.bid,
  };

  return result;
}
