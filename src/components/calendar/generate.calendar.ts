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
      label: weekdays[index],
      type: CellType.HEADER,
    }));

    return {
      dates: [...headers, ...startFillers, ...dates, ...endFillers] as Array<
        | {
            date: moment.Moment;
            type: CellType.DATE;
          }
        | {
            label: string;
            type: CellType.HEADER;
          }
        | {
            type: CellType.FILLER;
          }
      >,
      month: startOfMonth,
    };
  });
}
