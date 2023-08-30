import * as React from 'react';

import { Text, View } from 'react-native';

import { CalendarDateCell } from './cell';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { generateMonthDates } from './generate.month.dates';
import { isNil } from 'lodash';
import moment from 'moment';
import { styled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';

type Props = {
  month: number;
  year: number;
  onSelect?: (date: moment.Moment) => void;
  value?: moment.MomentInput;
};

const weekdays = moment.weekdaysShort();
export const CalendarDates: React.FC<Props> = ({
  month,
  year,
  value,
  onSelect,
}) => {
  const [cWidth, setCWidth] = React.useState(0);
  const days = React.useMemo(
    () => generateMonthDates(month, year),
    [month, year],
  );

  const boxSize = Math.floor(cWidth / weekdays.length);

  const handleSelect = (selection: moment.Moment) => {
    if (!onSelect) {
      return;
    }

    vibrate('impactMedium');
    onSelect?.(selection);
  };

  return (
    <Container onLayout={(e) => setCWidth(e.nativeEvent.layout.width)}>
      <WeekDaysContainer>
        {weekdays.map((weekday) => (
          <Weekday key={weekday} size={boxSize}>
            <WeekdayText>{weekday}</WeekdayText>
          </Weekday>
        ))}
      </WeekDaysContainer>
      <DatesContainer>
        {days.map((date, index) => (
          <Date
            size={boxSize}
            key={date ? date.valueOf().toString() : `pad-${index}`}
            onPress={() => date && handleSelect(date)}
            disabled={isNil(date)}
          >
            <CalendarDateCell
              disabled={isNil(date) || date.isBefore(moment(), 'date')}
              value={date}
              isActive={date?.isSame(value, 'date')}
            />
          </Date>
        ))}
      </DatesContainer>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  {
    flexGrow: 1,
    gap: theme.space.small,
    width: '100%',
    height: '100%',
  },
]);

const WeekDaysContainer = styled(View, () => [
  {
    flexDirection: 'row',
    overflow: 'hidden',
    width: '100%',
  },
]);

const DatesContainer = styled(View, () => [
  {
    flexGrow: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
]);

const Weekday = styled<{ size: number }, typeof View>(View, (theme, props) => [
  theme.presets.centered,
  {
    width: props.size,
    height: props.size,
    overflow: 'hidden',
  },
]);

const WeekdayText = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.secondaryColor,
  },
]);

const Date = styled<{ size: number }, typeof TouchableOpacity>(
  TouchableOpacity,
  (theme, props) => [
    theme.presets.centered,
    {
      padding: 2,
      width: props.size,
      height: props.size,
      overflow: 'hidden',
    },
  ],
);
