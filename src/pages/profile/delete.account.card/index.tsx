import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import tinycolor from 'tinycolor2';

import { Card } from '@app/components/card';
import { useUser } from '@app/state/user/use.user';
import { useTheme } from '@app/lib/hooks/use.theme';
import { ListItem } from '@app/components/list.item';
import { FaIcon } from '@app/components/icons.fontawesome';

import { useDeleteAccount } from './use.delete.account';

export const DeleteAccountCard: React.FC = () => {
  const user = useUser();
  const theme = useTheme();
  const deleteAccount = useDeleteAccount();
  const color = theme.pallette.danger;
  const backgroundColor = tinycolor(color).setAlpha(0.2).toRgbString();

  if (user.isAnonymous) {
    return null;
  }

  return (
    <Card padding={'medium'} style={{ backgroundColor }} title="Danger!">
      <TouchableOpacity onPress={() => deleteAccount()}>
        <ListItem
          description="This action cannot be undone."
          descriptionStyle={{
            color,
            fontWeight: 'bold',
          }}
          icon={<FaIcon color={color} name="user-xmark" />}
          title="Delete Account"
          titleStyle={{ color, fontWeight: 'bold' }}
        />
      </TouchableOpacity>
    </Card>
  );
};
