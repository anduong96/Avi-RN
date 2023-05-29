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

import { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import type { ComponentProps } from '@app/types/component.props';
import { FlatList } from 'react-native';
import type moment from 'moment';

type Props = ComponentProps<
  Pick<
    React.ComponentProps<typeof BottomSheetSectionList>,
    'ListHeaderComponent' | 'ListFooterComponent'
  > & {
    onRenderDay?: (date: moment.Moment) => React.ReactElement;
  }
>;

export const BottomSheetCalendar: React.FC<Props> = ({
  style,
  onRenderDay,
  ...props
}) => {
  const months = React.useMemo(
    () =>
      generateCalendar(new Date(), 12).map((item) => ({
        month: item.month,
        data: [item.dates],
      })),
    [],
  );

  return (
    <BottomSheetSectionList
      {...props}
      contentContainerStyle={[style]}
      initialNumToRender={3}
      sections={months}
      stickySectionHeadersEnabled
      stickyHeaderIndices={[0]}
      renderSectionHeader={(item) => {
        return (
          <MonthHeader blurType="xlight">
            <MonthText>{item.section.month.format('MMMM')}</MonthText>
            <YearText>{item.section.month.format('YYYY')}</YearText>
          </MonthHeader>
        );
      }}
      renderItem={({ section }) => {
        return (
          <Month>
            <FlatList
              numColumns={7}
              data={section.data[0]}
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
