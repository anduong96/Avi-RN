import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import { isIos } from '@app/lib/is.ios';
import { removeNonNumericCharacters } from '@app/lib/remove.non.numeric';
import * as React from 'react';
import type { TextInput } from 'react-native';
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
      textSearch: flightNumber,
      focusInput: 'flightNumber',
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
      ref={ref}
      maxLength={4}
      keyboardType={isIos ? 'numbers-and-punctuation' : 'default'}
      value={inputValue}
      returnKeyType="next"
      placeholder="Flight Number"
      autoComplete="off"
      autoCorrect={false}
      autoCapitalize="none"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
});
