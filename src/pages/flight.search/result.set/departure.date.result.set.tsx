import * as React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import moment from 'moment';
import * as chrono from 'chrono-node';
import { compact, unionBy } from 'lodash';
import { useDebounce } from 'use-debounce';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { Calendar } from '@app/components/calendar';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { formatRelativeDay } from '@app/lib/format.date';
import { FaIcon } from '@app/components/icons.fontawesome';

import { State } from '../state';
import { Publisher } from '../publisher';

export const DepartureDateResultSet: React.FC = () => {
  const departureDate = State.useSelect((state) => state.departureDate);
  const textSearch = State.useSelect((state) => state.textSearch);
  const theme = useTheme();
  const [debouncedSearch] = useDebounce(textSearch, 200);
  const [showCalendar, setShowCalendar] = React.useState(false);
  const options = React.useMemo(
    () =>
      compact([debouncedSearch, 'today', 'tomorrow']).map((dateStr) => ({
        date: chrono.parse(dateStr)?.[0]?.date(),
        text: dateStr,
      })),
    [debouncedSearch],
  );

  const handleSelect = (date: moment.MomentInput) => {
    vibrate('impactMedium');

    State.actions.setState({
      departureDate: moment(date).toDate(),
      textSearch: undefined,
    });

    Publisher.broadcast('Selected', undefined);
  };

  return (
    <Container>
      <ScrollView>
        {unionBy(options, (entry) => moment(entry.date).format('L')).map(
          ({ date, text }, index) => {
            if (!date) {
              return (
                <ListItem
                  description="Unable to recognize"
                  icon={<FaIcon light name="question" size={20} />}
                  key={index}
                  style={[
                    index === 0 && {
                      backgroundColor: theme.pallette.grey[50],
                    },
                  ]}
                  title={text}
                  verticalPadding="medium"
                />
              );
            }

            return (
              <TouchableOpacity key={index} onPress={() => handleSelect(date)}>
                <ListItem
                  description={moment(date).format('L')}
                  extra={
                    index === 0 && (
                      <FaIcon
                        color={theme.pallette.active}
                        name="arrow-right-long"
                        size={20}
                      />
                    )
                  }
                  icon={<FaIcon light name="calendar" size={20} />}
                  style={[
                    index === 0 && {
                      backgroundColor: theme.pallette.grey[100],
                    },
                  ]}
                  title={formatRelativeDay(date)}
                  verticalPadding="medium"
                />
              </TouchableOpacity>
            );
          },
        )}
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <ListItem
            icon={
              <FaIcon
                color={theme.pallette.active}
                name="hand-pointer"
                size={20}
                solid
              />
            }
            title="Pick from calendar"
            titleStyle={{ color: theme.pallette.active }}
            verticalPadding="medium"
          />
        </TouchableOpacity>
      </ScrollView>
      {showCalendar && (
        <CalendarContainer>
          <DismissContainer>
            <DismissBtn onPress={() => setShowCalendar(false)}>
              <FaIcon color={theme.pallette.active} name="chevron-down" solid />
            </DismissBtn>
          </DismissContainer>
          <Calendar
            highlightToday
            onSelectDay={handleSelect}
            value={departureDate}
          />
        </CalendarContainer>
      )}
    </Container>
  );
};

const Container = withStyled(View, () => [
  {
    flexGrow: 1,
    position: 'relative',
  },
]);

const CalendarContainer = withStyled(
  Animated.View,
  (theme) => [
    {
      backgroundColor: theme.pallette.grey[50],
      bottom: 0,
      gap: theme.space.medium,
      left: 0,
      padding: theme.space.small,
      position: 'absolute',
      right: 0,
      top: 0,
    },
  ],
  {
    entering: FadeInDown,
    exiting: FadeOutDown,
  },
);

const DismissBtn = withStyled(TouchableOpacity, () => []);
const DismissContainer = withStyled(View, () => [
  {
    flexDirection: 'row',
    justifyContent: 'center',
  },
]);
