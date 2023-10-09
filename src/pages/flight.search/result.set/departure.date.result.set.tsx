import { FaIcon } from '@app/components/icons.fontawesome';
import { ListItem } from '@app/components/list.item';
import { formatRelativeDay } from '@app/lib/format.date';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import * as chrono from 'chrono-node';
import { compact, unionBy } from 'lodash';
import moment from 'moment';
import * as React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useDebounce } from 'use-debounce';
import { Publisher } from '../publisher';
import { State } from '../state';

export const DepartureDateResultSet: React.FC = () => {
  const textSearch = State.useSelect((state) => state.textSearch);
  const theme = useTheme();
  const [debouncedSearch] = useDebounce(textSearch, 200);
  const options = React.useMemo(
    () =>
      compact([debouncedSearch, 'today', 'tomorrow']).map((dateStr) => ({
        text: dateStr,
        date: chrono.parse(dateStr)?.[0]?.date(),
      })),
    [debouncedSearch],
  );

  const handleSelect = (date: moment.MomentInput) => {
    vibrate('impactMedium');

    State.actions.setState({
      textSearch: undefined,
      departureDate: moment(date).toDate(),
    });

    Publisher.broadcast('Selected', undefined);
  };

  return (
    <ScrollView>
      {unionBy(options, (entry) => moment(entry.date).format('L')).map(
        ({ date, text }, index) => {
          if (!date) {
            return (
              <ListItem
                padding="small"
                title={text}
                key={index}
                description="Unable to recognize"
                icon={<FaIcon name="question" size={20} light />}
                style={[
                  index === 0 && {
                    backgroundColor: theme.pallette.grey[100],
                  },
                ]}
              />
            );
          }

          return (
            <TouchableOpacity key={index} onPress={() => handleSelect(date)}>
              <ListItem
                padding="small"
                title={formatRelativeDay(date)}
                description={moment(date).format('L')}
                icon={<FaIcon name="calendar" size={20} light />}
                extra={
                  index === 0 && (
                    <FaIcon
                      light
                      name="arrow-right-long"
                      color={theme.pallette.active}
                    />
                  )
                }
                style={[
                  index === 0 && {
                    backgroundColor: theme.pallette.grey[100],
                  },
                ]}
              />
            </TouchableOpacity>
          );
        },
      )}
    </ScrollView>
  );
};
