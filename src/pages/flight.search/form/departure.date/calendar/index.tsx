import * as React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';

import { CalendarDates } from './dates';
import { FaIcon } from '@app/components/icons.fontawesome';
import { flightSearchState } from '@app/pages/flight.search/state';
import moment from 'moment';
import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Props = {
  value?: Date;
  onChange?: (value: Required<Props['value']>) => void;
};

export const Calendar: React.FC<Props> = () => {
  const theme = useTheme();
  const activeValue = flightSearchState.useSelect((s) => s.departureDate);
  const [activeMonth, setActiveMonth] = React.useState(moment());
  const [disabledPrev, disabledNext] = React.useMemo(
    () => [
      moment().isSameOrAfter(activeMonth, 'month'),
      moment().add(1, 'years').isBefore(activeMonth, 'month'),
    ],
    [activeMonth],
  );

  const handleSelect = (date: moment.Moment) => {
    flightSearchState.actions.setState({
      departureDate: date.toDate(),
    });
  };

  const handleNextMonth = () => {
    vibrate('impactLight');
    setActiveMonth((current) => current.clone().add(1, 'month'));
  };

  const handlePrevMonth = () => {
    vibrate('impactLight');
    setActiveMonth((current) => current.clone().subtract(1, 'month'));
  };

  return (
    <Container>
      <Header>
        <Action disabled={disabledPrev} onPress={handlePrevMonth}>
          <FaIcon
            name="chevron-left"
            color={
              disabledPrev ? theme.pallette.disabled : theme.pallette.active
            }
          />
        </Action>
        <Title>{activeMonth.format('MMMM, YYYY')}</Title>
        <Action disabled={disabledNext} onPress={handleNextMonth}>
          <FaIcon
            name="chevron-right"
            color={
              disabledNext ? theme.pallette.disabled : theme.pallette.active
            }
          />
        </Action>
      </Header>
      <Body>
        <CalendarDates
          month={activeMonth.get('month')}
          year={activeMonth.get('year')}
          onSelect={handleSelect}
          value={activeValue}
        />
      </Body>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  {
    gap: theme.space.medium,
    paddingVertical: theme.space.medium,
  },
]);

const Header = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
  },
]);

const Action = styled(TouchableOpacity, (theme) => [
  {
    paddingHorizontal: theme.space.large,
  },
]);

const Title = styled(Text, (theme) => [
  theme.typography.presets.h2,
  {
    flexGrow: 1,
    textAlign: 'center',
  },
]);

const Body = styled(View, (theme) => [
  {
    flexGrow: 1,
    padding: theme.space.medium,
  },
]);
