import * as React from 'react';

import { CellType, generateCalendar } from './generate.calendar';
import {
  Day,
  DayText,
  Month,
  MonthHeader,
  MonthText,
  Weekday,
  WeekdayText,
  YearText,
} from './styles';

import type { ComponentProps } from '@app/types/component.props';
import { FlatList } from 'react-native';
import type moment from 'moment';

type Props = ComponentProps<
  Omit<
    React.ComponentProps<typeof FlatList>,
    'initialNumToRender' | 'data' | 'renderItem' | 'keyExtractor' | 'getItem'
  > & {
    onRenderDay?: (date: moment.Moment) => React.ReactElement;
  }
>;

export const Calendar: React.FC<Props> = ({ style, onRenderDay, ...props }) => {
  const months = React.useMemo(() => generateCalendar(new Date(), 12), []);

  return (
    <FlatList
      {...props}
      style={[style]}
      initialNumToRender={3}
      data={months}
      renderItem={({ item }) => {
        return (
          <Month>
            <MonthHeader>
              <MonthText>{item.month.format('MMMM')}</MonthText>
              <YearText>{item.month.format('YYYY')}</YearText>
            </MonthHeader>
            <FlatList
              numColumns={7}
              data={item.dates}
              renderItem={({ item: day }) => {
                if (day.type === CellType.FILLER) {
                  return <Day />;
                } else if (day.type === CellType.HEADER) {
                  return (
                    <Weekday>
                      <WeekdayText>{day.label}</WeekdayText>
                    </Weekday>
                  );
                }

                return (
                  <Day>
                    {onRenderDay?.(day.date) ?? (
                      <DayText>{day.date.format('D')}</DayText>
                    )}
                  </Day>
                );
              }}
            />
          </Month>
        );
      }}
    />
  );
};
