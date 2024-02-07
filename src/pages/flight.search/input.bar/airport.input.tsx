import * as React from 'react';

import type { TextInput } from 'react-native';

import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FaIcon } from '@app/components/icons.fontawesome';

import { useFlightSearchState } from '../state';

type Props = {
  focusKey: 'destinationIata' | 'originIata';
};

export const AirportInput = React.forwardRef<TextInput, Props>(
  ({ focusKey }, ref) => {
    const theme = useTheme();
    const iata = useFlightSearchState((s) => s[focusKey]);
    const isFocus = useFlightSearchState((s) => s.focusInput === focusKey);
    const inputValue = useFlightSearchState((s) =>
      s.focusInput === focusKey ? s.textSearch : s[focusKey],
    );

    const handleFocus = () => {
      vibrate('impactMedium');
      useFlightSearchState.setState({
        focusInput: focusKey,
        textSearch: iata,
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
        placeholder={focusKey === 'destinationIata' ? 'Destination' : 'Origin'}
        prefix={
          <FaIcon
            color={theme.pallette.grey[isFocus ? 800 : 500]}
            name="circle-arrow-up-right"
            size={20}
          />
        }
        ref={ref}
        returnKeyType="next"
        value={inputValue ?? undefined}
      />
    );
  },
);
