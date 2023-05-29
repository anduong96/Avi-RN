import * as React from 'react';

import { Btn, Icon, Title } from './styles';

type Props = {
  children: string;
  icon: React.ReactElement;
  onPress: () => void;
};

export const SignInBtn: React.FC<Props> = ({ children, icon, onPress }) => {
  return (
    <Btn onPress={() => onPress()}>
      <Icon>{icon}</Icon>
      <Title>{children}</Title>
    </Btn>
  );
};
