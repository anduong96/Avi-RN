import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';
import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import * as React from 'react';
import type { TextInput } from 'react-native';
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
      textSearch: airlineIata,
      focusInput: 'airlineIata',
    });
  };

  const handleBlur = () => {
    State.actions.setState({ focusInput: undefined });
  };

  const changeChange = (value?: string) => {
    State.actions.setState({ textSearch: value });
  };

  return (
    <Input
      allowClear
      ref={ref}
      prefix={<AirlineLogoAvatar size={15} airlineIata={airlineIata!} />}
      value={inputValue}
      returnKeyType="next"
      placeholder="Airline"
      autoComplete="off"
      autoCorrect={false}
      autoCapitalize="none"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={changeChange}
      blurOnSubmit
    />
  );
});
