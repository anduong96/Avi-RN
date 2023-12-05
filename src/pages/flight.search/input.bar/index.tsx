import * as React from 'react';

import type { TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { MainStack } from '@app/navigation';

import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { RandomFlightBtn } from '@app/components/button.random.flight';
import { type FullFlightFragmentFragment } from '@app/generated/server.gql';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';

import { useTopic } from '../publisher';
import { AirlineInput } from './airline.input';
import { useFlightSearchState } from '../state';
import { TextSearchInput } from './text.search.input';
import { FocusedContainer } from './focused.container';
import { FlightNumberInput } from './flight.number.input';
import { DepartureDateInput } from './departure.date.input';

export const InputBar: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<MainStack>();
  const focusedInput = useFlightSearchState((s) => s.focusInput);
  const hasAirlineIata = useFlightSearchState((s) => s.hasValue('airlineIata'));
  const hasFlightNumber = useFlightSearchState((s) =>
    s.hasValue('flightNumber'),
  );
  const airlineInput = React.useRef<TextInput>(null);
  const flightNumberInput = React.useRef<TextInput>(null);
  const departureDateInput = React.useRef<TextInput>(null);

  const handleFocus = React.useCallback(() => {
    if (
      focusedInput === 'airlineIata' ||
      (focusedInput === 'textSearch' && !hasFlightNumber)
    ) {
      flightNumberInput.current?.focus();
    } else if (focusedInput === 'flightNumber') {
      departureDateInput.current?.focus();
    } else if (focusedInput === 'textSearch') {
      departureDateInput.current?.focus();
    } else if (focusedInput === 'departureDate') {
      useFlightSearchState.setState({ focusInput: undefined });
      departureDateInput.current?.blur();
    }
  }, [focusedInput, hasFlightNumber]);

  useKeyboardSubmitEvent(handleFocus, [handleFocus]);
  useTopic('Selected', handleFocus, [handleFocus]);

  const handleRandomFlight = (flight: FullFlightFragmentFragment) => {
    navigation.push('FlightStack', {
      params: {
        flightID: flight.id,
        isFromSearch: true,
      },
      screen: 'Flight',
    });
  };

  if (!hasAirlineIata && !hasFlightNumber) {
    return (
      <Group direction="row" gap={'tiny'} paddingHorizontal={theme.pagePadding}>
        <TextSearchInput />
        <RandomFlightBtn onFlight={handleRandomFlight} />
      </Group>
    );
  }

  return (
    <Group direction="row" gap="tiny" paddingHorizontal={theme.pagePadding}>
      <FocusedContainer isFocused={focusedInput === 'airlineIata'}>
        <AirlineInput ref={airlineInput} />
      </FocusedContainer>
      <FocusedContainer isFocused={focusedInput === 'flightNumber'}>
        <FlightNumberInput ref={flightNumberInput} />
      </FocusedContainer>
      <FocusedContainer isFocused={focusedInput === 'departureDate'}>
        <DepartureDateInput ref={departureDateInput} />
      </FocusedContainer>
    </Group>
  );
};
