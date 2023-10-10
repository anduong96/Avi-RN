import * as React from 'react';

import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';

import { State } from '../state';

export const TextSearchInput: React.FC = () => {
  const value = State.useSelect((state) => state.textSearch);
  const handleChangeText = (textSearch?: string) => {
    State.actions.setState({
      textSearch,
    });
  };

  const handleFocus = () => {
    vibrate('impactLight');
    State.actions.setState({ focusInput: 'textSearch' });
  };

  const handleBlur = () => {
    State.actions.setState({
      focusInput: undefined,
    });
  };

  React.useEffect(() => {
    return () => {
      State.actions.setState({
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
      onBlur={handleBlur}
      onChange={handleChangeText}
      onFocus={handleFocus}
      placeholder="i.e. AA100"
      returnKeyType="next"
      value={value}
    />
  );
};
