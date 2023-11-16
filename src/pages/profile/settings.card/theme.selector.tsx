import * as React from 'react';

import type { ThemeType } from '@app/themes/types';

import { useGlobalState } from '@app/state/global';
import { SwitchButton } from '@app/components/switch';

export const ThemeSelector: React.FC = () => {
  const selectedTheme = useGlobalState((s) => s.theme);

  return (
    <SwitchButton<ThemeType>
      disabled
      onChange={(value) => useGlobalState.setState({ theme: value })}
      options={['dark', 'light', 'system']}
      value={selectedTheme}
    />
  );
};
