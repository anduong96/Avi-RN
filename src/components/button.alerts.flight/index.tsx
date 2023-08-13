import * as React from 'react';

import { FaIcon } from '../icons.fontawesome';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styled } from '@app/lib/styled';

type Props = {
  flightID: string;
};

export const AlertFlightButton: React.FC<Props> = () => {
  return (
    <Btn>
      <FaIcon name="bell" />
      <BtnText>Alerts</BtnText>
    </Btn>
  );
};

const Btn = styled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
    backgroundColor: theme.pallette.grey[100],
    borderRadius: theme.borderRadius,
    paddingHorizontal: theme.space.small,
    paddingVertical: 4,
  },
]);

const BtnText = styled(Text, (theme) => [theme.typography.presets.p2]);
