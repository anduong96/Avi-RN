import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import moment from 'moment';
import * as React from 'react';
import type { TextInput } from 'react-native';
import { State } from '../state';
import { FaIcon } from '@app/components/icons.fontawesome';

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

  const handleBlur = () => {
    State.actions.setState({
      focusInput: undefined,
    });
  };

  return (
    <Input
      allowClear
      ref={ref}
      value={inputValue}
      returnKeyType="search"
      placeholder="Flight Date"
      autoComplete="off"
      autoCorrect={false}
      autoCapitalize="none"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      prefix={<FaIcon name="calendar" size={12} light />}
      blurOnSubmit
    />
  );
});
