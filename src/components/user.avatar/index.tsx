import * as React from 'react';

import { Avatar } from '../avatar';
import { useUser } from '@app/state/user';

export const UserAvatar: React.FC = () => {
  const user = useUser();

  return <Avatar imageUri={user.photoURL} size={60} />;
};
