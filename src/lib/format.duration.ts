import moment from 'moment';

export function formatDuration(durationMs: number) {
  return moment
    .utc(durationMs)
    .format('H[h] m[m]')
    .split(' ')
    .filter((item) => !item.startsWith('0'))
    .join(' ');
}
