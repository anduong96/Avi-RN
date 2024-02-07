import * as React from 'react';

import type { TextInput } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import type { MainStack } from '@app/navigation';

import { logger } from '@app/lib/logger';
import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { RandomFlightBtn } from '@app/components/button.random.flight';
import { type FullFlightFragmentFragment } from '@app/generated/server.gql';
import { useKeyboardSubmitEvent } from '@app/components/input/use.keyboard.submit';

import { useTopic } from '../publisher';
import { AirlineInput } from './airline.input';
import { AirportInput } from './airport.input';
import { useFlightSearchState } from '../state';
import { TextSearchInput } from './text.search.input';
import { FocusedContainer } from './focused.container';
import { FlightNumberInput } from './flight.number.input';
import { DepartureDateInput } from './departure.date.input';

export const InputBar: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<MainStack>();
  const focusedInput = useFlightSearchState((s) => s.focusInput);
  const hasValue = useFlightSearchState((s) => s.hasValue);
  const hasAirlineIata = useFlightSearchState((s) => s.hasValue('airlineIata'));
  const hasFlightNumber = useFlightSearchState((s) =>
    s.hasValue('flightNumber'),
  );
  const hasOriginIata = useFlightSearchState((s) => s.hasValue('originIata'));
  const airlineInput = React.useRef<TextInput>(null);
  const flightNumberInput = React.useRef<TextInput>(null);
  const departureDateInput = React.useRef<TextInput>(null);
  const originInput = React.useRef<TextInput>(null);
  const destinationInput = React.useRef<TextInput>(null);

  const handleFocus = React.useCallback(() => {
    logger.debug('Choosing next input', focusedInput);

    const flightNumberFlow = [
      [flightNumberInput, 'flightNumber'],
      [departureDateInput, 'departureDate'],
    ] as const;
    const flightAirportsFlow = [
      [destinationInput, 'destinationIata'],
      [airlineInput, 'airlineIata'],
      [departureDateInput, 'departureDate'],
    ] as const;

    const flow = hasValue('originIata') ? flightAirportsFlow : flightNumberFlow;
    for (const [input, key] of flow) {
      if (!hasValue(key) && focusedInput !== key) {
        logger.debug('Focusing %s', key);
        input.current?.focus();
        return;
      }
    }

    logger.debug('No next input');
  }, [hasValue, focusedInput]);

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

  if (hasOriginIata) {
    return (
      <Group
        direction="column"
        gap="tiny"
        paddingHorizontal={theme.space.small}
      >
        <Group direction="row" gap="tiny">
          <FocusedContainer isFocused={focusedInput === 'originIata'}>
            <AirportInput focusKey="originIata" ref={originInput} />
          </FocusedContainer>
          <FocusedContainer isFocused={focusedInput === 'destinationIata'}>
            <AirportInput focusKey="destinationIata" ref={destinationInput} />
          </FocusedContainer>
        </Group>
        <Group direction="row" gap="tiny">
          <FocusedContainer isFocused={focusedInput === 'airlineIata'}>
            <AirlineInput ref={airlineInput} />
          </FocusedContainer>
          <FocusedContainer isFocused={focusedInput === 'departureDate'}>
            <DepartureDateInput ref={departureDateInput} />
          </FocusedContainer>
        </Group>
      </Group>
    );
  }

  if (hasAirlineIata && hasFlightNumber) {
    return (
      <Group
        direction="column"
        gap="tiny"
        paddingHorizontal={theme.space.small}
      >
        <Group direction="row" gap={'tiny'}>
          <FocusedContainer isFocused={focusedInput === 'airlineIata'}>
            <AirlineInput ref={airlineInput} />
          </FocusedContainer>
          <FocusedContainer isFocused={focusedInput === 'flightNumber'}>
            <FlightNumberInput ref={flightNumberInput} />
          </FocusedContainer>
        </Group>
        <Group>
          <FocusedContainer isFocused={focusedInput === 'departureDate'}>
            <DepartureDateInput ref={departureDateInput} />
          </FocusedContainer>
        </Group>
      </Group>
    );
  }

  return (
    <Group direction="row" gap={'tiny'} paddingHorizontal={theme.space.small}>
      <TextSearchInput />
      <RandomFlightBtn onFlight={handleRandomFlight} />
    </Group>
  );
};
