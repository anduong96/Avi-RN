import * as React from 'react';

import { Card } from '@app/components/card';
import { ListItem } from '@app/components/list.item';
import { FaIcon } from '@app/components/icons.fontawesome';
import { HorizontalDivider } from '@app/components/divider.horizontal';

import { ThemeSelector } from './theme.selector';
import { DateFormatSelector } from './date.format.selector';
import { MeasurementSelector } from './measurement.selector';

export const SettingsCard: React.FC = () => {
  return (
    <Card>
      <ListItem
        description="Coming soon!"
        extra={<ThemeSelector />}
        icon={<FaIcon name="palette" />}
        title="Theme"
      />
      <HorizontalDivider />
      <ListItem
        extra={<MeasurementSelector />}
        icon={<FaIcon name="ruler" />}
        title="Measurement"
      />
      <HorizontalDivider />
      <ListItem
        extra={<DateFormatSelector />}
        icon={<FaIcon name="calendar" />}
        title="Date Format"
      />
    </Card>
  );
};
