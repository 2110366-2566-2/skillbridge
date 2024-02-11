type mockUpDatumn = {
    name: String;
    budget: Number;
    description: String;
    category: String;
    applicants: Number;
    maxApplicants: Number;
    startDate: String;
    endDate: String;
  };

const sortArray = (
    array: Array<mockUpDatumn> = [],
    startDateSortOption: String = "",
    endDateSortOption: String = "",
    priceSortOption: String = "",
    applicantsSortOption: String = ""
  ) => {
    if (startDateSortOption === "asc") {
      array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
        return a.startDate < b.startDate ? -1 : a.startDate > b.startDate ? 1 : 0;
      });
    } else if (startDateSortOption === "desc") {
      array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
        return b.startDate < a.startDate ? -1 : b.startDate > a.startDate ? 1 : 0;
      });
    }
  
    if (endDateSortOption === "asc") {
      array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
        return a.endDate < b.endDate ? -1 : a.endDate > b.endDate ? 1 : 0;
      });
    } else if (endDateSortOption === "desc") {
      array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
        return b.endDate < a.endDate ? -1 : b.endDate > a.endDate ? 1 : 0;
      });
    }
  
    if (priceSortOption === "asc") {
      array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
        return a.budget < b.budget ? -1 : a.budget > b.budget ? 1 : 0;
      });
    } else if (priceSortOption === "desc") {
      array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
        return b.budget < a.budget ? -1 : b.budget > a.budget ? 1 : 0;
      });
    }
  
    if (applicantsSortOption === "asc") {
      array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
        return a.applicants < b.applicants
          ? -1
          : a.applicants > b.applicants
            ? 1
            : 0;
      });
    } else if (applicantsSortOption === "desc") {
      array.sort((a: mockUpDatumn, b: mockUpDatumn) => {
        return b.applicants < a.applicants
          ? -1
          : b.applicants > a.applicants
            ? 1
            : 0;
      });
    }
  
    return array;
  };

  export default sortArray;