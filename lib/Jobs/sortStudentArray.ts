import { applicationInfo } from "@/actions/jobs/jobCards/fetchJobCards";

const mapper: Map<string, number> = new Map<string, number>([
  ["PENDING", 1],
  ["DISCLAIMED", 2],
  ["ACCEPTED", 3],
  ["REJECTED", 4],
  ["DEPOSIT_PENDING", 5],
  ["IN_PROGRESS", 6],
  ["DELIVERED", 7],
  ["WAGE_PAYMENT_PENDING", 8],
  ["DONE", 9],
  ["CANCELED", 10],
]);

function adapt(status: string): number {
  return mapper.get(status) || 0;
}

const sortArray = (
    array: Array<applicationInfo> = [],
    startDateSortOption: string = "",
    endDateSortOption: string = "",
    statusSortOption: string = ""
) => {
    if (startDateSortOption === "asc") {
        array.sort((a: applicationInfo, b: applicationInfo) => {
            return a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0;
        });
    } else if (startDateSortOption === "desc") {
        array.sort((a: applicationInfo, b: applicationInfo) => {
            return b.startDate < a.startDate ? -1 : b.startDate > a.startDate ? 1 : 0;
        });
    }

    if (endDateSortOption === "asc") {
        array.sort((a: applicationInfo, b: applicationInfo) => {
            return a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0;
        });
    } else if (endDateSortOption === "desc") {
        array.sort((a: applicationInfo, b: applicationInfo) => {
            return b.endDate < a.endDate ? -1 : b.endDate > a.endDate ? 1 : 0;
        });
    }

    if (statusSortOption === "asc") {
        array.sort((a: applicationInfo, b: applicationInfo) => {
            return adapt(a.status) < adapt(b.status)
                ? -1
                : adapt(a.status) > adapt(b.status)
                  ? 1
                  : 0;
        });
    } else if (statusSortOption === "desc") {
        array.sort((a: applicationInfo, b: applicationInfo) => {
            return adapt(b.status) < adapt(a.status)
                ? -1
                : adapt(b.status) > adapt(a.status)
                  ? 1
                  : 0;
        });
    }

    return array;
};

export default sortArray;
