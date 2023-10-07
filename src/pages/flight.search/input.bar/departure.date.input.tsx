import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import moment from 'moment';
import * as React from 'react';
import type { TextInput } from 'react-native';
import { State } from '../state';

export const DepartureDateInput = React.forwardRef<TextInput>((_, ref) => {
  const displayText = State.useSelect((state) =>
    state.departureDate ? moment(state.departureDate).format('L') : '',
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
      defaultValue={displayText}
      returnKeyType="search"
      placeholder="Flight Date"
      autoComplete="off"
      autoCorrect={false}
      autoCapitalize="none"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChange}
      blurOnSubmit
    />
  );
});
