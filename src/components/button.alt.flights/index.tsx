import * as React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { withStyled } from '@app/lib/styled';

type Props = {
  flightID: string;
};

export const AltFlightsButton: React.FC<Props> = () => {
  return (
    <Btn>
      <Icon name="electric-switch-closed" />
      <BtnText>Alternative Flights</BtnText>
    </Btn>
  );
};

const Btn = withStyled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.grey[100],
    borderRadius: theme.borderRadius,
    flexDirection: 'row',
    gap: theme.space.tiny,
    paddingHorizontal: theme.space.small,
    paddingVertical: 4,
  },
]);

const BtnText = withStyled(Text, (theme) => [theme.typography.presets.p2]);
