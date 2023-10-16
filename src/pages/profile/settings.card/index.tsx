import * as React from 'react';

import { Card } from '@app/components/card';
import { ListItem } from '@app/components/list.item';
import { SwitchButton } from '@app/components/switch';
import { FaIcon } from '@app/components/icons.fontawesome';

export const SettingsCard: React.FC = () => {
  return (
    <Card>
      <ListItem
        description="Coming soon!"
        extra={<SwitchButton options={['dark']} value="dark" />}
        icon={<FaIcon name="palette" />}
        title="Theme"
      />
    </Card>
  );
};
