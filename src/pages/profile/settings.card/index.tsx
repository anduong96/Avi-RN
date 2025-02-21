import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { openSettings } from 'react-native-permissions';

import { Card } from '@app/components/card';
import { ListItem } from '@app/components/list.item';
import { FaIcon } from '@app/components/icons.fontawesome';
import { HorizontalDivider } from '@app/components/divider.horizontal';

import { ThemeSelector } from './theme.selector';
import { DateFormatSelector } from './date.format.selector';
import { MeasurementSelector } from './measurement.selector';
import { PushNotificationSwitch } from './push.notification.switch';

export const SettingsCard: React.FC = () => {
  return (
    <Card padding={'medium'} title="Preference">
      <ListItem
        description="Receive flight and other important updates"
        extra={<PushNotificationSwitch />}
        icon={<FaIcon name="bell" />}
        title="Push Notifications"
      />
      <HorizontalDivider />
      <ListItem
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
      <HorizontalDivider />
      <TouchableOpacity onPress={() => openSettings()}>
        <ListItem
          extra={<FaIcon color="active" name="chevron-right" />}
          icon={<FaIcon name="gear" />}
          title="System Settings"
        />
      </TouchableOpacity>
    </Card>
  );
};
