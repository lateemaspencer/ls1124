import { parseISO, isSameDay, format } from 'date-fns';

// Function to get the observed holiday date for July 4th
function getObservedHolidayDate(year: number): string {
  return format(new Date(year, 6, 4), 'yyyy-MM-dd'); // July is month index 6
}

// Function to get the first Monday of a given month as a string
function getFirstMondayOfMonth(year: number, month: number): string {
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay();

  const offset = dayOfWeek === 0 ? 1 : 8 - dayOfWeek; // If Sunday, move to next day
  const firstMonday = new Date(firstDay.setDate(firstDay.getDate() + offset));

  return format(firstMonday, 'yyyy-MM-dd');
}

export function isHoliday(dateString: string): boolean {
  const date = parseISO(dateString);
  const year = date.getFullYear();

  // Get observed holiday dates as strings
  const observedJuly4th = getObservedHolidayDate(year);
  const laborDay = getFirstMondayOfMonth(year, 8); // September is month index 8

  // Compare the input date with holiday dates in string format
  return (
    isSameDay(date, parseISO(observedJuly4th)) ||
    isSameDay(date, parseISO(laborDay))
  );
}
