import { RandomFlightBtn } from '@app/components/button.random.flight';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';
import type { FullFlightFragmentFragment } from '@app/generated/server.gql';
import { styled } from '@app/lib/styled';
import type { MainStack } from '@app/stacks';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import type { TextInput } from 'react-native';
import { View } from 'react-native';
import { useTopic } from '../publisher';
import { State } from '../state';
import { useFocusedInput } from '../state/use.focused.input';
import { useHasValue } from '../state/use.has.value';
import { AirlineInput } from './airline.input';
import { DepartureDateInput } from './departure.date.input';
import { FlightNumberInput } from './flight.number.input';
import { FocusedContainer } from './focused.container';
import { TextSearchInput } from './text.search.input';

export const InputBar: React.FC = () => {
  const navigation = useNavigation<MainStack<'Search'>>();
  const focusedInput = useFocusedInput();
  const hasAirlineIata = useHasValue('airlineIata');
  const hasFlightNumber = useHasValue('flightNumber');
  const airlineInput = React.useRef<TextInput>(null);
  const flightNumberInput = React.useRef<TextInput>(null);
  const departureDateInput = React.useRef<TextInput>(null);

  const handleFocus = React.useCallback(() => {
    const state = State.getState();

    const inputs: Array<[unknown, () => void]> = [
      [state.airlineIata, () => airlineInput.current?.focus()],
      [state.flightNumber, () => flightNumberInput.current?.focus()],
      [state.departureDate, () => departureDateInput.current?.focus()],
    ];

    for (const [value, onFocus] of inputs) {
      if (!value) {
        onFocus();
        return;
      }
    }

    if (state.focusInput === 'airlineIata') {
      return flightNumberInput.current?.focus();
    } else if (state.focusInput === 'flightNumber') {
      return departureDateInput.current?.focus();
    } else if (state.focusInput === 'departureDate') {
      return departureDateInput.current?.blur();
    }
  }, []);

  useKeyboardSubmitEvent(handleFocus, [handleFocus]);
  useTopic('Selected', handleFocus, [handleFocus]);

  const handleRandomFlight = (flight: FullFlightFragmentFragment) => {
    const parent = navigation.getParent() as MainStack<'Home'>;
    parent.push('FlightStack', {
      screen: 'Flight',
      params: {
        flightID: flight.id,
        isFromSearch: true,
      },
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
    gap: theme.space.tiny,
    paddingHorizontal: theme.space.medium,
  },
]);
