import type { TextInput } from 'react-native';

import * as React from 'react';

import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';

import { State } from '../state';
import { useValue } from '../state/use.value';

export const AirlineInput = React.forwardRef<TextInput>((_, ref) => {
  const airlineIata = useValue('airlineIata');
  const inputValue = State.useSelect((state) =>
    state.focusInput === 'airlineIata'
      ? state.textSearch
      : state.airlineIata ?? state.textSearch,
  );

  const handleFocus = () => {
    vibrate('impactMedium');
    State.actions.setState({
      focusInput: 'airlineIata',
      textSearch: airlineIata,
    });
  };

  const changeChange = (value?: string) => {
    State.actions.setState({ textSearch: value });
  };

  return (
    <Input
      allowClear
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
      blurOnSubmit
      onChange={changeChange}
      onFocus={handleFocus}
      placeholder="Airline"
      prefix={<AirlineLogoAvatar airlineIata={airlineIata!} size={15} />}
      ref={ref}
      returnKeyType="next"
      value={inputValue}
    />
  );
});
