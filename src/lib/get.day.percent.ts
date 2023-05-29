import moment from 'moment';

export function getDayPercent(date: moment.MomentInput) {
  const value = moment(date).diff(new Date(), 'hours');

  if (value > 23) {
    return 0;
  } else if (value < 0) {
    return 100;
  }

  return ((23 - value) / 24) * 100;
}
