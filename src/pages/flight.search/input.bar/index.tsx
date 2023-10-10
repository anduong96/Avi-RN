import type { TextInput } from 'react-native';

import * as React from 'react';
import { View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { MainStack } from '@app/navigation';
import type { FullFlightFragmentFragment } from '@app/generated/server.gql';

import { styled } from '@app/lib/styled';
import { RandomFlightBtn } from '@app/components/button.random.flight';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';

import { useTopic } from '../publisher';
import { AirlineInput } from './airline.input';
import { useHasValue } from '../state/use.has.value';
import { TextSearchInput } from './text.search.input';
import { FocusedContainer } from './focused.container';
import { FlightNumberInput } from './flight.number.input';
import { DepartureDateInput } from './departure.date.input';
import { useFocusedInput } from '../state/use.focused.input';

export const InputBar: React.FC = () => {
  const navigation = useNavigation<MainStack<'FlightSearch'>>();
  const focusedInput = useFocusedInput();
  const hasAirlineIata = useHasValue('airlineIata');
  const hasFlightNumber = useHasValue('flightNumber');
  const airlineInput = React.useRef<TextInput>(null);
  const flightNumberInput = React.useRef<TextInput>(null);
  const departureDateInput = React.useRef<TextInput>(null);

  const handleFocus = React.useCallback(() => {
    if (
      focusedInput === 'airlineIata' ||
      (focusedInput === 'textSearch' && !hasFlightNumber)
    ) {
      return flightNumberInput.current?.focus();
    } else if (focusedInput === 'flightNumber') {
      return departureDateInput.current?.focus();
    } else if (focusedInput === 'textSearch') {
      return departureDateInput.current?.focus();
    } else if (focusedInput === 'departureDate') {
      return departureDateInput.current?.blur();
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
      <Container>
        <TextSearchInput />
        <RandomFlightBtn onFlight={handleRandomFlight} />
      </Container>
    );
  }

  return (
    <Container>
      <FocusedContainer isFocused={focusedInput === 'airlineIata'}>
        <AirlineInput ref={airlineInput} />
      </FocusedContainer>
      <FocusedContainer isFocused={focusedInput === 'flightNumber'}>
        <FlightNumberInput ref={flightNumberInput} />
      </FocusedContainer>
      <FocusedContainer isFocused={focusedInput === 'departureDate'}>
        <DepartureDateInput ref={departureDateInput} />
      </FocusedContainer>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  {
    flexDirection: 'row',
    flexShrink: 0,
    flexWrap: 'nowrap',
    gap: theme.space.tiny,
    overflow: 'scroll',
    paddingHorizontal: theme.space.medium,
  },
]);
