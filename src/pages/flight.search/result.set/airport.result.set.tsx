import * as React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

import Fuse from 'fuse.js';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';
import { DOT_SEPARATOR } from '@app/constants';
import { Result } from '@app/components/result';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { Typography } from '@app/components/typography';
import { FaIcon } from '@app/components/icons.fontawesome';
import { useAirportsQuery } from '@app/generated/server.gql';
import { HighlightedText } from '@app/components/highlight.text';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';

import { Publisher } from '../publisher';
import { useFlightSearchState } from '../state';

export const AirportResultSet: React.FC = () => {
  const theme = useTheme();
  const focused = useFlightSearchState((s) => s.focusInput);
  const textSearch = useFlightSearchState((s) => s.textSearch ?? '');
  const airports = useAirportsQuery({
    fetchPolicy: 'cache-first',
    pollInterval: moment.duration({ days: 1 }).asMilliseconds(),
  });
  const searcher = React.useMemo(
    () =>
      new Fuse(airports.data?.airports ?? [], {
        includeMatches: true,
        includeScore: true,
        keys: ['name', 'iata', 'cityName', 'state'],
        minMatchCharLength: 2,
        shouldSort: true,
      }),
    [airports.data],
  );
  const result = React.useMemo(
    () => (textSearch ? searcher.search(textSearch) : []),
    [searcher, textSearch],
  );

  const handleSelection = React.useCallback(
    (selection: (typeof result)[number]['item']) => {
      vibrate('impactMedium');
      logger.debug('Selected', selection);

      if (focused === 'originIata') {
        useFlightSearchState.setState({
          originIata: selection.iata!,
          textSearch: undefined,
        });
      } else if (focused === 'destinationIata') {
        useFlightSearchState.setState({
          destinationIata: selection.iata!,
          textSearch: undefined,
        });
      }

      Publisher.broadcast('Selected', undefined);
    },
    [focused],
  );

  useKeyboardSubmitEvent(() => {
    if (
      focused === 'textSearch' ||
      focused === 'originIata' ||
      focused === 'destinationIata'
    ) {
      handleSelection(result[0].item);
    }
  }, [result, handleSelection, focused]);

  return (
    <FlatList
      ListEmptyComponent={() => (
        <>
          {airports.loading && isEmpty(result) ? (
            <Animated.View entering={FadeInDown}>
              <Result
                hero={
                  <ActivityIndicator color={theme.pallette.text} size="large" />
                }
                title={'Loading airports...'}
              />
            </Animated.View>
          ) : (
            !isEmpty(textSearch) && (
              <Animated.View entering={FadeInDown}>
                <Result
                  hero={<Typography type="massive">😐</Typography>}
                  subtitle="Try a different query"
                  title="No result(s)"
                />
              </Animated.View>
            )
          )}
        </>
      )}
      data={result}
      keyExtractor={({ item }) => item.id}
      renderItem={({ index, item }) => {
        if (!item.item) {
          return null;
        }

        return (
          <Item index={index} onPress={() => handleSelection(item.item)}>
            <ListItem
              description={
                <ItemDescription matchKey="iata" matches={item.matches}>
                  {[item.item.iata, item.item.state, item.item.countryCode]
                    .filter(Boolean)
                    .join(DOT_SEPARATOR)}
                </ItemDescription>
              }
              extra={
                index === 0 && (
                  <FaIcon
                    color={theme.pallette.active}
                    name="arrow-right-long"
                    size={20}
                  />
                )
              }
              horizontalPadding="medium"
              icon={<FaIcon name="tower-control" size={35} />}
              title={
                <ItemTitle matchKey="name" matches={item.matches}>
                  {item.item.name}
                </ItemTitle>
              }
              verticalPadding="medium"
            />
          </Item>
        );
      }}
    />
  );
};

const Item = withStyled<{ index: number }, typeof TouchableOpacity>(
  TouchableOpacity,
  (theme, props) => [
    {
      marginHorizontal: theme.space.small,
    },
    props.index === 0 && {
      backgroundColor: theme.pallette.grey[50],
      borderRadius: theme.borderRadius,
    },
  ],
);

const ItemDescription = withStyled(HighlightedText, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.pallette.textSecondary,
  },
]);

const ItemTitle = withStyled(HighlightedText, (theme) => [
  theme.typography.presets.h4,
  {
    color: theme.pallette.text,
  },
]);
