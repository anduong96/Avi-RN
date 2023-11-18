import type { TextInput } from 'react-native';

import * as React from 'react';

import { IS_IOS } from '@app/lib/platform';
import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import { removeNonNumericCharacters } from '@app/lib/remove.non.numeric';

import { useFlightSearchState } from '../state';

export const FlightNumberInput = React.forwardRef<TextInput>((_, ref) => {
  const flightNumber = useFlightSearchState((s) => s.flightNumber);
  const inputValue = useFlightSearchState((state) =>
    state.focusInput === 'flightNumber'
      ? state.textSearch
      : state.flightNumber ?? state.textSearch,
  );

  const handleFocus = () => {
    vibrate('impactMedium');
    useFlightSearchState.setState({
      focusInput: 'flightNumber',
      textSearch: flightNumber,
    });
  };

  const handleChange = (value?: string) => {
    useFlightSearchState.setState({
      textSearch: removeNonNumericCharacters(value),
    });
  };

  return (
    <Input
      allowClear
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
      keyboardType={IS_IOS ? 'numbers-and-punctuation' : 'default'}
      maxLength={4}
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder="Flight Number"
      ref={ref}
      returnKeyType="next"
      value={inputValue}
    />
  );
});
