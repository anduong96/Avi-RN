import type { TextInput } from 'react-native';

import * as React from 'react';

import moment from 'moment';

import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';

import { State } from '../state';

export const DepartureDateInput = React.forwardRef<TextInput>((_, ref) => {
  const inputValue = State.useSelect((state) =>
    state.focusInput === 'departureDate'
      ? state.textSearch
      : state.departureDate
      ? moment(state.departureDate).format('L')
      : undefined,
  );

  const handleChange = (value?: string) => {
    State.actions.setState({
      textSearch: value,
    });
  };

  const handleFocus = () => {
    vibrate('impactMedium');
    State.actions.setState({
      focusInput: 'departureDate',
      textSearch: inputValue,
    });
  };

  return (
    <Input
      allowClear
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
      blurOnSubmit
      onChange={handleChange}
      onFocus={handleFocus}
      placeholder="Flight Date"
      ref={ref}
      returnKeyType="search"
      value={inputValue}
    />
  );
});
