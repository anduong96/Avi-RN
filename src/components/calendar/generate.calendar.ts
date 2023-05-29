import moment from 'moment';

export enum CellType {
  FILLER,
  DATE,
  HEADER,
}

const weekdays = moment.weekdaysShort();
const weekLength = weekdays.length;
export function generateCalendar(
  startDate: moment.MomentInput,
  monthsToGenerate: number,
) {
  return Array.from({ length: monthsToGenerate }).map((_m, monthsToAdd) => {
    const startOfMonth = moment(startDate)
      .add(monthsToAdd, 'month')
      .startOf('month');

    const endOfMonth = startOfMonth.clone().endOf('month');
    const daysInMonth = startOfMonth.daysInMonth();
    const startFillCount = Math.abs(0 - startOfMonth.weekday());
    const endFillCount = weekLength - endOfMonth.weekday() - 1;
    const startFillers = Array.from({ length: startFillCount }).map(() => ({
      type: CellType.FILLER,
    }));
    const dates = Array.from({ length: daysInMonth }).map((_d, index) => ({
      date: startOfMonth.clone().add({ days: index }),
      type: CellType.DATE,
    }));
    const endFillers = Array.from({ length: endFillCount }).map(() => ({
      type: CellType.FILLER,
    }));
    const headers = Array.from({ length: weekLength }).map((_, index) => ({
      type: CellType.HEADER,
      label: weekdays[index],
    }));

    return {
      month: startOfMonth,
      dates: [...headers, ...startFillers, ...dates, ...endFillers] as Array<
        | {
            type: CellType.DATE;
            date: moment.Moment;
          }
        | {
            type: CellType.FILLER;
          }
        | {
            type: CellType.HEADER;
            label: string;
          }
      >,
    };
  });
}
