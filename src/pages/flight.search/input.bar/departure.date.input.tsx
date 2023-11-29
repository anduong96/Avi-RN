import * as React from 'react';

import type { TextInput } from 'react-native';

import moment from 'moment';

import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import { useGlobalState } from '@app/state/global';
import { DateFormatType } from '@app/generated/server.gql';

import { useFlightSearchState } from '../state';

export const DepartureDateInput = React.forwardRef<TextInput>((_, ref) => {
  const dateFormat = useGlobalState((s) =>
    s._dateFormat === DateFormatType.AMERICAN ? 'MM/DD/YYYY' : 'DD/MM/YYYY',
  );
  const inputValue = useFlightSearchState((state) =>
    state.focusInput === 'departureDate'
      ? state.textSearch
      : state.departureDate
        ? moment(state.departureDate).format(dateFormat)
        : undefined,
  );

  const handleChange = (value?: string) => {
    useFlightSearchState.setState({
      textSearch: value,
    });
  };

  const handleFocus = () => {
    vibrate('impactMedium');
    useFlightSearchState.setState({
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
