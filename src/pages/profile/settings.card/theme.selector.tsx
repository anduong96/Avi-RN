import * as React from 'react';

import { Select } from '@app/components/select';
import { useGlobalState } from '@app/state/global';
import { ThemePreset } from '@app/themes/constants';

export const ThemeSelector: React.FC = () => {
  const selectedTheme = useGlobalState((s) => s.theme);

  return (
    <Select
      isDisabled
      onChange={(value) => useGlobalState.setState({ theme: value })}
      options={[
        { label: 'Dark', value: ThemePreset.DARK },
        { label: 'Light', value: ThemePreset.LIGHT },
        { label: 'System', value: ThemePreset.SYSTEM },
      ]}
      value={selectedTheme}
    />
  );
};
