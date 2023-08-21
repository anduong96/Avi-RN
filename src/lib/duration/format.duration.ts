import moment from 'moment';

export function formatDuration(
  value: moment.DurationInputArg1,
  unit?: moment.unitOfTime.DurationConstructor,
): string {
  const duration = moment.duration(value, unit);
}
