import * as React from 'react';

import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FaIcon } from '@app/components/icons.fontawesome';
import { SpaceVertical } from '@app/components/space.vertical';

import { Point } from './point';

export const Header: React.FC = () => {
  const theme = useTheme();

  return (
    <Group direction="row" flexGrow={1}>
      <Point type="departure" />
      <Group flexGrow={1} horizontalAlign="center">
        <SpaceVertical size={theme.typography.presets.massive.fontSize / 2} />
        <FaIcon name="arrow-right" />
      </Group>
      <Point type="arrival" />
    </Group>
  );
};
