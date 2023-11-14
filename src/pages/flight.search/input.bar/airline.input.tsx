import type { TextInput } from 'react-native';

import * as React from 'react';

import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';

import { useFlightSearchState } from '../state';

export const AirlineInput = React.forwardRef<TextInput>((_, ref) => {
  const airlineIata = useFlightSearchState((s) => s.airlineIata);
  const inputValue = useFlightSearchState((s) =>
    s.focusInput === 'airlineIata'
      ? s.textSearch
      : s.airlineIata ?? s.textSearch,
  );

  const handleFocus = () => {
    vibrate('impactMedium');
    useFlightSearchState.setState({
      focusInput: 'airlineIata',
      textSearch: airlineIata,
    });
  };

  const changeChange = (value?: string) => {
    useFlightSearchState.setState({
      textSearch: value,
    });
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
