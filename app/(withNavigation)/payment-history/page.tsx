import PaymentHistoryPane from "@/components/paymentHistory/paymentHistoryPane/PaymentHistoryPane";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

interface MonthYear {
  month: number;
  year: number;
}

export default async function Page() {
  // Session
  const session = await getServerSession(authOptions);

  // GenerateYearMonthObjects from January 20200 - now
  function generateYearMonthObjects(): MonthYear[] {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JavaScript months are zero-based

    const yearMonthObjects: MonthYear[] = [];

    for (let year = 2022; year <= currentYear; year++) {
      const startMonth = 0; // Start from January if it's 2022, else start from the current month
      const endMonth = year === currentYear ? currentMonth : 12; // End at current month if it's the current year, else end at December

      for (let month = startMonth; month < endMonth; month++) {
        yearMonthObjects.push({ year, month: month + 1 }); // Adding 1 to month to make it 1-indexed
      }
    }

    // Sort the array in descending order
    yearMonthObjects.sort((a, b) => {
      if (a.year !== b.year) {
        return b.year - a.year; // Sort by year in descending order
      } else {
        return b.month - a.month; // If years are equal, sort by month in descending order
      }
    });
    return yearMonthObjects;
  }

  return (
    <PaymentHistoryPane
      userId={session?.user.id}
      allMonthYear={generateYearMonthObjects()}
    />
  );
}
