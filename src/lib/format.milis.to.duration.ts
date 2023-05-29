/**
 * The function formats a given number of milliseconds into a duration string in the format of hours,
 * minutes, and seconds.
 * @param {number} milliseconds - The input parameter `milliseconds` is a number representing a
 * duration in milliseconds.
 * @returns a formatted string representing the duration in hours, minutes, and seconds based on the
 * input milliseconds. If the duration is less than a second, it returns '0s'.
 */
export function formatMillisToDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  const duration = [];

  if (hours > 0) {
    duration.push(`${hours}h`);
  }
  if (minutes % 60 > 0) {
    duration.push(`${minutes % 60}m`);
  }
  if (seconds % 60 > 0) {
    duration.push(`${seconds % 60}s`);
  }

  if (duration.length === 0) {
    return '0s';
  }

  return duration.join(' ');
}
