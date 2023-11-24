import * as React from 'react';
import { View } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native';

import moment from 'moment';
import { isNil } from 'lodash';

import type { ComponentProps } from '@app/types/component.props';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';

import { Typography } from '../typography';
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
              <Typography type="h1">{item.month.format('MMMM')}</Typography>
              <Typography isThin type="h1">
                {item.month.format('YYYY')}
              </Typography>
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
                      <Typography isCentered type="small">
                        {day.label}
                      </Typography>
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
                        <Typography isBold={isActive}>
                          {day.date.format('D')}
                        </Typography>
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

const MonthHeader = withStyled(View, (theme) => [
  {
    alignItems: 'center',
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
