import type moment from 'moment';

import * as React from 'react';
import { FlatList } from 'react-native';

import { BottomSheetSectionList } from '@gorhom/bottom-sheet';

import type { ComponentProps } from '@app/types/component.props';

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

type Props = ComponentProps<
  Pick<
    React.ComponentProps<typeof BottomSheetSectionList>,
    'ListFooterComponent' | 'ListHeaderComponent'
  > & {
    onRenderDay?: (date: moment.Moment) => React.ReactElement;
  }
>;

export const BottomSheetCalendar: React.FC<Props> = ({
  onRenderDay,
  style,
  ...props
}) => {
  const months = React.useMemo(
    () =>
      generateCalendar(new Date(), 12).map((item) => ({
        data: [item.dates],
        month: item.month,
      })),
    [],
  );

  return (
    <BottomSheetSectionList
      {...props}
      contentContainerStyle={[style]}
      initialNumToRender={3}
      renderItem={({ section }) => {
        return (
          <Month>
            <FlatList
              data={section.data[0]}
              numColumns={7}
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
      renderSectionHeader={(item) => {
        return (
          <MonthHeader blurType="xlight">
            <MonthText>{item.section.month.format('MMMM')}</MonthText>
            <YearText>{item.section.month.format('YYYY')}</YearText>
          </MonthHeader>
        );
      }}
      sections={months}
      stickyHeaderIndices={[0]}
      stickySectionHeadersEnabled
    />
  );
};
