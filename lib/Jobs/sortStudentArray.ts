import StudentJobCardType from "@/types/StudentJobCardType";

const mapper: Map<string, number> = new Map<string, number>(
  [
    ["กำลังรอ", 1],
    ["ผ่านการคัดเลือก", 2],
    ["ไม่ผ่านการคัดเลือก", 3],
    ["รอผู้จ้างจ่ายมัดจำ", 4],
    ["รอส่งมอบงาน", 5],
    ["รอผู้จ้างจ่ายค่าจ้าง", 6],
    ["เสร็จสิ้น", 7],
    ["ถูกยกเลิกงาน", 8],
  ]
);

function adapt(status: string): number {
  return mapper.get(status) || 0;
}

const sortArray = (
  array: Array<StudentJobCardType> = [],
  startDateSortOption: string = "",
  endDateSortOption: string = "",
  statusSortOption: string = "",
) => {
  if (startDateSortOption === "asc") {
    array.sort((a: StudentJobCardType, b: StudentJobCardType) => {
      return a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0;
    });
  } else if (startDateSortOption === "desc") {
    array.sort((a: StudentJobCardType, b: StudentJobCardType) => {
      return b.startDate < a.startDate ? -1 : b.startDate > a.startDate ? 1 : 0;
    });
  }

  if (endDateSortOption === "asc") {
    array.sort((a: StudentJobCardType, b: StudentJobCardType) => {
      return a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0;
    });
  } else if (endDateSortOption === "desc") {
    array.sort((a: StudentJobCardType, b: StudentJobCardType) => {
      return b.endDate < a.endDate ? -1 : b.endDate > a.endDate ? 1 : 0;
    });
  }

  if (statusSortOption === "asc") {
    array.sort((a: StudentJobCardType, b: StudentJobCardType) => {
      return adapt(a.status) < adapt(b.status) ? -1 : adapt(a.status) > adapt(b.status) ? 1 : 0;
    });
  } else if (statusSortOption === "desc") {
    array.sort((a: StudentJobCardType, b: StudentJobCardType) => {
      return adapt(b.status) < adapt(a.status) ? -1 : adapt(b.status) > adapt(a.status) ? 1 : 0;
    });
  }

  return array;
};

export default sortArray;
