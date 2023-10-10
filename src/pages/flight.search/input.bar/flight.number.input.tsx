import type { TextInput } from 'react-native';

import * as React from 'react';

import { isIos } from '@app/lib/is.ios';
import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import { removeNonNumericCharacters } from '@app/lib/remove.non.numeric';

import { State } from '../state';
import { useValue } from '../state/use.value';

export const FlightNumberInput = React.forwardRef<TextInput>((_, ref) => {
  const flightNumber = useValue('flightNumber');
  const inputValue = State.useSelect((state) =>
    state.focusInput === 'flightNumber'
      ? state.textSearch
      : state.flightNumber ?? state.textSearch,
  );

  const handleFocus = () => {
    vibrate('impactMedium');
    State.actions.setState({
      focusInput: 'flightNumber',
      textSearch: flightNumber,
    });
  };

  const handleBlur = () => {
    State.actions.setState({
      focusInput: undefined,
    });
  };

  const handleChange = (value?: string) => {
    State.actions.setState({
      textSearch: removeNonNumericCharacters(value),
    });
  };

  return (
    <Input
      allowClear
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
      keyboardType={isIos ? 'numbers-and-punctuation' : 'default'}
      maxLength={4}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder="Flight Number"
      ref={ref}
      returnKeyType="next"
      value={inputValue}
    />
  );
});
