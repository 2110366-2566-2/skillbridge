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
        isReviewed: student.user.student.reviews.length === 0 ? (false) : (true)
    };
    return result;
}

export function convertStateNameToThai(
    userType: string,
    state: string
): string {
    // in the employer's view
    if (userType === "employer") {
        switch (state) {
            case "PENDING":
                return "สมัคร";
            case "ACCEPTED":
                return "กำลังรอ";
            case "DISCLAIMED":
                return "สละสิทธิ์";
            case "DEPOSIT_PENDING":
                return "รอจ่ายมัดจำ";
            case "IN_PROGRESS":
                return "รอส่งมอบงาน";
            case "DELIVERED":
                return "ส่งมอบงานแล้ว";
            case "WAGE_PAYMENT_PENDING":
                return "รอจ่ายค่าจ้าง";
            case "DONE":
                return "เสร็จสิ้น";
            case "CANCELED":
                return "ยกเลิก";
            default:
                return "";
        }
    }
    // in the student's view
    else if (userType === "student") {
        switch (state) {
            case "PENDING":
                return "กำลังรอ";
            case "DISCLAIMED":
                return "สละสิทธิ์";
            case "ACCEPTED":
                return "ผ่านการคัดเลือก";
            case "REJECTED":
                return "ไม่ผ่านการคัดเลือก";
            case "DEPOSIT_PENDING":
                return "รอผู้จ้างจ่ายมัดจำ";
            case "IN_PROGRESS":
                return "รอส่งมอบงาน";
            case "WAGE_PAYMENT_PENDING":
                return "รอผู้จ้างจ่ายค่าจ้าง";
            case "DONE":
                return "เสร็จสิ้น";
            case "CANCELED":
                return "ยกเลิก";
            case "DELIVERED":
                return "ส่งมอบงานแล้ว";
        }
    }
    return "";
}
