import * as React from 'react';
import { Text, View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { isNil } from 'lodash';

import type { ComponentProps } from '@app/types/component.props';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';

import { CellType, generateCalendar } from './generate.calendar';

type Props = ComponentProps<
  Omit<
    React.ComponentProps<typeof FlatList>,
    'data' | 'getItem' | 'initialNumToRender' | 'keyExtractor' | 'renderItem'
  > & {
    highlightToday?: boolean;
    maxDate?: moment.MomentInput;
    minDate?: moment.MomentInput;
    onRenderDay?: (date: moment.Moment) => React.ReactElement;
    onSelectDay?: (date: moment.Moment) => void;
    value?: moment.MomentInput;
  }
>;

export const Calendar: React.FC<Props> = ({
  highlightToday,
  maxDate = moment().add(12, 'months'),
  minDate = moment(),
  onRenderDay,
  onSelectDay,
  style,
  value,
  ...props
}) => {
  const hasValue = !isNil(value);
  const today = moment();
  const months = React.useMemo(
    () =>
      generateCalendar(
        moment(minDate).toDate(),
        Math.ceil(moment(maxDate).diff(minDate, 'months')),
      ),
    [maxDate, minDate],
  );

  const handleSelect = (date: moment.Moment) => {
    vibrate('impactMedium');
    onSelectDay?.(date);
  };

  return (
    <FlatList
      ListHeaderComponent={props.ListHeaderComponent}
      data={months}
      initialNumToRender={3}
      renderItem={({ item }) => {
        return (
          <Month>
            <MonthHeader>
              <MonthText>{item.month.format('MMMM')}</MonthText>
              <YearText>{item.month.format('YYYY')}</YearText>
            </MonthHeader>
            <FlatList
              data={item.dates}
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
                const isToday = highlightToday && day.date.isSame(today, 'day');
                const isActive = hasValue && day.date.isSame(value, 'day');
                return (
                  <Day
                    isActive={isActive}
                    onPress={() => handleSelect(day.date)}
                  >
                    {onRenderDay?.(day.date) ?? (
                      <>
                        <DayText isActive={isActive}>
                          {day.date.format('D')}
                        </DayText>
                        {isToday && <Dot />}
                      </>
                    )}
                  </Day>
                );
              }}
            />
          </Month>
        );
      }}
      showsVerticalScrollIndicator={false}
      stickyHeaderIndices={props.stickyHeaderIndices}
      style={[style]}
    />
  );
};

const Day = withStyled<{ isActive?: boolean }, typeof TouchableOpacity>(
  TouchableOpacity,
  (theme, props) => [
    theme.presets.centered,
    {
      aspectRatio: 1,
      borderColor: theme.pallette.transparent,
      borderRadius: theme.borderRadius,
      borderWidth: theme.borderWidth,
      flexBasis: 1,
      flexGrow: 1,
      margin: theme.borderWidth,
    },
    props.isActive && {
      borderColor: theme.pallette.active,
    },
  ],
);

const DayText = withStyled<{ isActive?: boolean }, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets.h3,

    props.isActive && {
      fontWeight: 'bold',
    },
  ],
);

const Month = withStyled(View, (theme) => [
  {
    paddingBottom: theme.space.large,
    width: '100%',
  },
]);

const Weekday = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexBasis: 1,
    flexGrow: 1,
    paddingVertical: theme.space.tiny,
  },
]);

const WeekdayText = withStyled(Text, (theme) => [
  theme.typography.presets.small,
  {
    textAlign: 'center',
  },
]);

const YearText = withStyled(Text, (theme) => [theme.typography.presets.h3]);

const MonthText = withStyled(Text, (theme) => [
  theme.typography.presets.h3,
  { fontWeight: 'bold' },
]);

const MonthHeader = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
    padding: theme.space.small,
  },
]);

const Dot = withStyled(View, (theme) => [
  {
    aspectRatio: 1,
    backgroundColor: theme.pallette.primary,
    borderRadius: theme.roundRadius,
    bottom: 5,
    position: 'absolute',
    width: 5,
  },
]);
