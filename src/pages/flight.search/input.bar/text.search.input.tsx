import * as React from 'react';

import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';

import { useFlightSearchState } from '../state';

export const TextSearchInput: React.FC = () => {
  const value = useFlightSearchState((state) => state.textSearch);
  const handleChangeText = (textSearch?: string) => {
    useFlightSearchState.setState({
      textSearch,
    });
  };

  const handleFocus = () => {
    vibrate('impactLight');
    useFlightSearchState.setState({ focusInput: 'textSearch' });
  };

  React.useEffect(() => {
    return () => {
      useFlightSearchState.setState({
        textSearch: undefined,
      });
    };
  }, []);

  return (
    <Input
      allowClear
      autoCapitalize="none"
      autoComplete="off"
      autoCorrect={false}
      autoFocus
      onChange={handleChangeText}
      onFocus={handleFocus}
      placeholder="i.e. AA100 or LAX"
      returnKeyType="next"
      value={value ?? undefined}
    />
  );
};
