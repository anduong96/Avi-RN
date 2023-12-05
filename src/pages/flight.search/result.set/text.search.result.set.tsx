import * as React from 'react';
import { FlatList, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { AirlinesQuery } from '@app/generated/server.gql';

import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';
import { Result } from '@app/components/result';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { FaIcon } from '@app/components/icons.fontawesome';
import { parseFlightIata } from '@app/lib/parse.flight.iata';
import { HighlightedText } from '@app/components/highlight.text';
import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';

import { Publisher } from '../publisher';
import { useFlightSearchState } from '../state';
import { useAirlineSearch } from '../use.airline.search';

export const TextSearchResultSet: React.FC = () => {
  const theme = useTheme();
  const focused = useFlightSearchState((s) => s.focusInput);
  const textSearch = useFlightSearchState((s) => s.textSearch ?? '');
  const isFocusOnAirlineIata = focused === 'airlineIata';
  const flightNumber = !isFocusOnAirlineIata
    ? parseFlightIata(textSearch)?.flightNumber.slice(0, 4)
    : undefined;
  const result = useAirlineSearch(textSearch, flightNumber);
  const currentFlightNumber = useFlightSearchState((s) => s.flightNumber);

  const handleSelection = React.useCallback(
    (airline: AirlinesQuery['airlines'][number]) => {
      vibrate('impactMedium');
      logger.debug('Airline Selected', airline);

      useFlightSearchState.setState({
        airlineIata: airline.iata,
        flightNumber: flightNumber || currentFlightNumber,
        textSearch: undefined,
      });

      if (!isFocusOnAirlineIata) {
        //TODO: Fix race condition issue
        setTimeout(() => {
          Publisher.broadcast('Selected', undefined);
        }, 50);
      }
    },
    [isFocusOnAirlineIata, flightNumber, currentFlightNumber],
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
          {textSearch && (
            <Animated.View>
              <Result hero={<EmptyHero>😐</EmptyHero>} title="No results" />
            </Animated.View>
          )}
        </>
      )}
      data={result}
      keyExtractor={(item) => item.item.id}
      renderItem={({ index, item }) => {
        return (
          <Item index={index} onPress={() => handleSelection(item.item)}>
            <ListItem
              description={
                <ItemDescription matchKey="iata" matches={item.matches}>
                  {`${item.item.iata}${flightNumber ?? ''}`}
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
                <AirlineLogoAvatar airlineIata={item.item.iata} size={35} />
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

const ItemTitle = withStyled(HighlightedText, (theme) => [
  theme.typography.presets.h4,
  {
    color: theme.pallette.text,
  },
]);

const ItemDescription = withStyled(HighlightedText, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.pallette.textSecondary,
  },
]);

const EmptyHero = withStyled(Text, (theme) => [
  theme.typography.presets.massive,
]);

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
