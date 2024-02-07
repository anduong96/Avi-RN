import * as React from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';

import Fuse from 'fuse.js';
import moment from 'moment';
import { isEmpty } from 'lodash';

import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';
import { Result } from '@app/components/result';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { Typography } from '@app/components/typography';
import { FaIcon } from '@app/components/icons.fontawesome';
import { useAirlinesQuery } from '@app/generated/server.gql';
import { HighlightedText } from '@app/components/highlight.text';
import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';

import { Publisher } from '../publisher';
import { useFlightSearchState } from '../state';

export const AirlineResultSet: React.FC = () => {
  const theme = useTheme();
  const focused = useFlightSearchState((s) => s.focusInput);
  const textSearch = useFlightSearchState((s) => s.textSearch ?? '');
  const airlines = useAirlinesQuery({
    fetchPolicy: 'cache-first',
    pollInterval: moment.duration({ days: 1 }).asMilliseconds(),
  });
  const searcher = React.useMemo(
    () =>
      new Fuse(airlines.data?.airlines ?? [], {
        includeMatches: true,
        includeScore: true,
        keys: ['name', 'iata', 'cityName', 'state'],
        minMatchCharLength: 2,
        shouldSort: true,
      }),
    [airlines.data],
  );
  const result = React.useMemo(
    () => (textSearch ? searcher.search(textSearch) : []),
    [searcher, textSearch],
  );

  const handleSelection = React.useCallback(
    (selection: (typeof result)[number]['item']) => {
      vibrate('impactMedium');
      logger.debug('Selected', selection);

      if (focused === 'airlineIata') {
        useFlightSearchState.setState({
          airlineIata: selection.iata!,
          focusInput: undefined,
          textSearch: undefined,
        });
      }

      Publisher.broadcast('Selected', undefined);
    },
    [focused],
  );

  useKeyboardSubmitEvent(() => {
    if (focused === 'textSearch' || focused === 'airlineIata') {
      handleSelection(result[0].item);
    }
  }, [result, handleSelection, focused]);

  return (
    <FlatList
      ListEmptyComponent={() => (
        <>
          {airlines.loading && isEmpty(result) ? (
            <Animated.View entering={FadeInDown}>
              <Result
                hero={
                  <ActivityIndicator color={theme.pallette.text} size="large" />
                }
                title={'Loading airlines...'}
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
                  {item.item.iata}
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
              icon={
                <AirlineLogoAvatar airlineIata={item.item.iata!} size={35} />
              }
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
