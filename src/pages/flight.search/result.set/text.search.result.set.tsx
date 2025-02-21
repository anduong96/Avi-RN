import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { isEmpty } from 'lodash';
import { FlashList } from '@shopify/flash-list';

import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';
import { DOT_SEPARATOR } from '@app/constants';
import { Result } from '@app/components/result';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { Typography } from '@app/components/typography';
import { FaIcon } from '@app/components/icons.fontawesome';
import { parseFlightIata } from '@app/lib/parse.flight.iata';
import { HighlightedText } from '@app/components/highlight.text';
import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';

import { Publisher } from '../publisher';
import { useFlightSearchState } from '../state';
import { TextSearchItemType, useTextSearch } from '../use.text.search';

export const TextSearchResultSet: React.FC = () => {
  const theme = useTheme();
  const focused = useFlightSearchState((s) => s.focusInput);
  const textSearch = useFlightSearchState((s) => s.textSearch ?? '');
  const isFocusOnAirlineIata = focused === 'airlineIata';
  const flightNumber = !isFocusOnAirlineIata
    ? parseFlightIata(textSearch)?.flightNumber.slice(0, 4)
    : undefined;

  const result = useTextSearch(textSearch, flightNumber);
  const currentFlightNumber = useFlightSearchState((s) => s.flightNumber);

  const handleSelection = React.useCallback(
    (selection: (typeof result)['value'][number]['item']) => {
      vibrate('impactMedium');
      logger.debug('Selected', selection);

      if (!selection) {
        return;
      }

      if (selection.type === TextSearchItemType.AIRLINE) {
        useFlightSearchState.setState({
          airlineIata: selection.iata,
          destinationIata: undefined,
          flightNumber: flightNumber || currentFlightNumber,
          originIata: undefined,
          textSearch: undefined,
        });
      } else {
        useFlightSearchState.setState({
          airlineIata: undefined,
          originIata: selection.iata,
          textSearch: undefined,
        });
      }

      if (!isFocusOnAirlineIata) {
        setTimeout(() => {
          Publisher.broadcast('Selected', undefined);
        }, 50);
      }
    },
    [isFocusOnAirlineIata, flightNumber, currentFlightNumber],
  );

  useKeyboardSubmitEvent(() => {
    if (focused === 'textSearch' || focused === 'airlineIata') {
      handleSelection(result.value[0].item);
    }
  }, [result, handleSelection, focused]);

  return (
    <FlashList
      ListEmptyComponent={() => (
        <>
          {result.loading && isEmpty(result.value) ? (
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
      data={result.value}
      estimatedItemSize={50}
      keyExtractor={(item) => item.item!.data.id}
      renderItem={({ index, item }) => {
        if (!item.item) {
          return null;
        }

        return (
          <Item index={index} onPress={() => handleSelection(item.item)}>
            <ListItem
              description={
                <ItemDescription matchKey="iata" matches={item.matches}>
                  {item.item.type === TextSearchItemType.AIRLINE
                    ? `${item.item.data.iata}${flightNumber ?? ''}`
                    : [
                        item.item.data.iata,
                        item.item.data.state,
                        item.item.data.countryCode,
                      ]
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
              icon={
                item.item.type === TextSearchItemType.AIRLINE ? (
                  <AirlineLogoAvatar airlineIata={item.item.iata!} size={35} />
                ) : (
                  <FaIcon name="tower-control" size={35} />
                )
              }
              title={
                <ItemTitle matchKey="name" matches={item.matches}>
                  {item.item.data.name}
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
