import { Input } from '@app/components/input';
import { vibrate } from '@app/lib/haptic.feedback';
import * as React from 'react';
import { State } from '../state';

export const TextSearchInput: React.FC = () => {
  const handleChangeText = (value?: string) => {
    State.actions.setState({
      textSearch: value,
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
      autoFocus
      placeholder="Search"
      returnKeyType="next"
      autoComplete="off"
      autoCorrect={false}
      autoCapitalize="none"
      onFocus={handleFocus}
      onBlur={handleBlur}
      onChange={handleChangeText}
    />
  );
};
