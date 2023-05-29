import moment from 'moment';

/**
 * It takes a JavaScript Date object and returns a string in the format YYYY-MM-DD
 * @param {Date} v - The value to be formatted.
 * @returns A function that takes a date and returns a string in the format YYYY-MM-DD
 */
export function formatCalendarDate(v?: Date) {
  return moment(v).format('YYYY-MM-DD');
}

/**
 * "If the value is a string, convert it to a Date object, then format it as a display date."
 *
 * The type annotation on the function is a bit more complicated. It says that the function takes a
 * value of type Date or string, and returns a string
 * @param {Date | string} v - Date | string
 * @returns A function that takes a date or string and returns a formatted date.
 */
export function formatDisplayDate(v?: Date | string) {
  if (!v) {
    return undefined;
  }

  return moment(v).format('ddd, MMMM DD');
}
