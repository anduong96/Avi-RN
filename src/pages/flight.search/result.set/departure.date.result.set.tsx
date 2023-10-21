import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';

import moment from 'moment';
import tinycolor from 'tinycolor2';
import * as chrono from 'chrono-node';
import { compact, uniqBy } from 'lodash';
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
      compact([debouncedSearch, 'today', 'tomorrow'])
        .map((dateStr) => ({ date: chrono.parse(dateStr)?.[0]?.date() }))
        .map(({ date }) => ({ date, text: formatRelativeDay(date) })),
    [debouncedSearch],
  );

  const handleSelect = (date: moment.MomentInput) => {
    vibrate('impactMedium');
    State.actions.setState({ departureDate: moment(date).toDate() });
    Publisher.broadcast('Selected', undefined);
  };

  return (
    <Container>
      <ScrollView>
        {uniqBy(options, (entry) => entry.text.toLowerCase()).map(
          ({ date, text }, index) => {
            if (!date) {
              return (
                <Item
                  description="Unable to recognize"
                  icon={<FaIcon name="question" size={20} />}
                  index={index}
                  key={index}
                  title={text}
                />
              );
            }

            return (
              <TouchableOpacity key={index} onPress={() => handleSelect(date)}>
                <Item
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
                  index={index}
                  title={formatRelativeDay(date)}
                />
              </TouchableOpacity>
            );
          },
        )}
        <TouchableOpacity onPress={() => setShowCalendar(true)}>
          <Item
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
          />
        </TouchableOpacity>
      </ScrollView>
      {showCalendar && (
        <CalendarContainer>
          <Calendar
            ListHeaderComponent={
              <DismissBtn onPress={() => setShowCalendar(false)}>
                <FaIcon
                  color={theme.pallette.active}
                  name="chevron-down"
                  solid
                />
              </DismissBtn>
            }
            highlightToday
            onSelectDay={handleSelect}
            stickyHeaderIndices={[0]}
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
      paddingHorizontal: theme.space.small,
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

const DismissBtn = withStyled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: tinycolor(theme.pallette.grey[50])
      .setAlpha(0.95)
      .toRgbString(),
    height: 50,
    width: '100%',
  },
]);

const Item = withStyled<{ index?: number }, typeof ListItem>(
  ListItem,
  (theme, props) => [
    props.index === 0 && {
      backgroundColor: theme.pallette.grey[100],
    },
  ],
  () => ({
    horizontalPadding: 'medium',
    verticalPadding: 'medium',
  }),
);
