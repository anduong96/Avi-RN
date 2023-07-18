import moment from 'moment';

/**
 * The function generates an array of dates for a given month and year, including padding for the
 * beginning and end of the month.
 * @param {number} month - The `month` parameter represents the month of the year, where January is 0
 * and December is 11.
 * @param {number} year - The `year` parameter is the year for which you want to generate the month
 * dates. It should be a number representing the year, such as 2021 or 2022.
 * @returns The function `generateMonthDates` returns an array of dates for a given month and year.
 * Each element in the array is either a `moment` object representing a date or `null` if the date is
 * outside the range of the month.
 */
export function generateMonthDates(month: number, year: number) {
  const startOfMonth = moment({ month, year }).startOf('month');
  const endOfMonth = startOfMonth.clone().endOf('month');
  const daysArr: Array<null | moment.Moment> = Array.from({
    length: startOfMonth.daysInMonth(),
  }).map((_, i) =>
    startOfMonth.clone().add({
      day: i,
    }),
  );

  // Pad begining of month
  Array.from({ length: startOfMonth.weekday() }).forEach(() =>
    daysArr.unshift(null),
  );

  // Pad ending of month
  Array.from({
    length: moment.weekdays.length - endOfMonth.weekday(),
  }).forEach(() => daysArr.push(null));

  return daysArr;
}
