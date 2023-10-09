import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';
import { HorizontalDivider } from '@app/components/divider.horizontal';
import { HighlightedText } from '@app/components/highlight.text';
import { FaIcon } from '@app/components/icons.fontawesome';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';
import { ListItem } from '@app/components/list.item';
import type { AirlinesQuery } from '@app/generated/server.gql';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { parseFlightIata } from '@app/lib/parse.flight.iata';
import { styled } from '@app/lib/styled';
import * as React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Publisher } from '../publisher';
import { State } from '../state';
import { useFocusedInput } from '../state/use.focused.input';
import { useValue } from '../state/use.value';
import { useAirlineSearch } from '../use.airline.search';

export const TextSearchResultSet: React.FC = () => {
  const theme = useTheme();
  const focused = useFocusedInput();
  const textSearch = useValue('textSearch', '');
  const isFocusOnAirlineIata = focused === 'airlineIata';
  const result = useAirlineSearch(textSearch);
  const currentFlightNumber = useValue('flightNumber');
  const flightNumber = !isFocusOnAirlineIata
    ? parseFlightIata(textSearch)?.flightNumber
    : undefined;

  const handleSelection = React.useCallback(
    (airline: AirlinesQuery['airlines'][number]) => {
      vibrate('impactMedium');
      if (isFocusOnAirlineIata) {
        Publisher.broadcast('Selected', undefined);
      }

      State.actions.setState({
        textSearch: undefined,
        airlineIata: airline.iata,
        flightNumber: flightNumber || currentFlightNumber,
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
      data={result}
      keyExtractor={(item) => item.item.id}
      ItemSeparatorComponent={() => <HorizontalDivider />}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity onPress={() => handleSelection(item.item)}>
            <ListItem
              padding="small"
              style={[
                index === 0 && {
                  backgroundColor: theme.pallette.grey[100],
                },
              ]}
              icon={
                <AirlineLogoAvatar size={35} airlineIata={item.item.iata} />
              }
              title={
                <ItemTitle matchKey="name" matches={item.matches}>
                  {item.item.name}
                </ItemTitle>
              }
              description={
                <ItemDescription matchKey="iata" matches={item.matches}>
                  {`${item.item.iata}${flightNumber ?? ''}`}
                </ItemDescription>
              }
              extra={
                index === 0 && (
                  <FaIcon
                    light
                    name="arrow-right-long"
                    color={theme.pallette.active}
                  />
                )
              }
            />
          </TouchableOpacity>
        );
      }}
    />
  );
};

const ItemTitle = styled(HighlightedText, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.typography.color,
  },
]);

const ItemDescription = styled(HighlightedText, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.secondaryColor,
  },
]);
