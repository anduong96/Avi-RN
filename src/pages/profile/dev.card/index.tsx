import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { Card } from '@app/components/card';
import { ListItem } from '@app/components/list.item';
import { FaIcon } from '@app/components/icons.fontawesome';
import { useToast } from '@app/components/toast/use.toast';

export const DevCard: React.FC = () => {
  const toast = useToast();

  const handleToast = () => {
    toast({
      description: 'This is a toast',
      title: 'Toast',
    });
  };

  return (
    <Card>
      <TouchableOpacity onPress={handleToast}>
        <ListItem icon={<FaIcon name="dev" />} title="Toast" />
      </TouchableOpacity>
    </Card>
  );
};
