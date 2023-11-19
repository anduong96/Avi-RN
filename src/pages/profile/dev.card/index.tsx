import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import type { ToastProps } from '@app/components/toast/use.toast';

import { Card } from '@app/components/card';
import { ListItem } from '@app/components/list.item';
import { FaIcon } from '@app/components/icons.fontawesome';
import { useToast } from '@app/components/toast/use.toast';
import { HorizontalDivider } from '@app/components/divider.horizontal';

export const DevCard: React.FC = () => {
  const toast = useToast();

  const handleToast = (preset: ToastProps['preset']) => {
    toast({
      description: 'This is a toast',
      preset,
      title: 'Toast',
    });
  };

  return (
    <Card>
      <TouchableOpacity onPress={() => handleToast('info')}>
        <ListItem icon={<FaIcon name="dev" />} title="Toast Info" />
      </TouchableOpacity>
      <HorizontalDivider />
      <TouchableOpacity onPress={() => handleToast('warning')}>
        <ListItem icon={<FaIcon name="dev" />} title="Toast warning" />
      </TouchableOpacity>
      <HorizontalDivider />
      <TouchableOpacity onPress={() => handleToast('error')}>
        <ListItem icon={<FaIcon name="dev" />} title="Toast error" />
      </TouchableOpacity>
      <HorizontalDivider />
      <TouchableOpacity onPress={() => handleToast('loading')}>
        <ListItem icon={<FaIcon name="dev" />} title="Toast loading" />
      </TouchableOpacity>
    </Card>
  );
};
