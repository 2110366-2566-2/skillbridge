import StudentJobCardType from "@/types/StudentJobCardType";

export default function filterStudentJobs(
  arg: StudentJobCardType,
  option: string = "all",
) {
  if (option === "all") return true;
  else if (option === "งานที่กำลังสมัคร") {
    const arg1 = arg.status === "กำลังรอ";
    const arg2 = arg.status === "ผ่านการคัดเลือก";
    const arg3 = arg.status === "ไม่ผ่านการคัดเลือก";
    return arg1 || arg2 || arg3;
  } else if (option === "งานปัจจุบัน") {
    const arg1 = arg.status === "รอส่งมอบงาน";
    const arg2 = arg.status === "รอผู้จ้างจ่ายมัดจำ";
    const arg3 = arg.status === "รอผู้จ้างจ่ายค่าจ้าง";
    const arg4 = arg.status === "เสร็จสิ้น";
    const arg5 = arg.status === "ถูกยกเลิกงาน";
    return arg1 || arg2 || arg3 || arg4 || arg5;
  } else if (option === "งานที่เสร็จสิ้น") {
    return false;
  }
}
