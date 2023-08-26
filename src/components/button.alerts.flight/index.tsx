import * as React from 'react';

import { FaIcon } from '../icons.fontawesome';
import { FlightPushSubState } from '@app/state/flight.push.sub';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Props = {
  flightID: string;
};

export const AlertFlightButton: React.FC<Props> = ({ flightID }) => {
  const theme = useTheme();
  const isEnabled = FlightPushSubState.useSelect(
    (s) => s.subscriptions[flightID]?.pushEnabled ?? false,
  );
  const [color, bgColor, icon] = isEnabled
    ? [theme.pallette.white, theme.pallette.active, 'bell']
    : [theme.typography.color, theme.pallette.grey[100], 'bell-o'];

  const handleToggle = () => {
    vibrate('impactLight');
    isEnabled
      ? FlightPushSubState.actions.disablePush(flightID)
      : FlightPushSubState.actions.enablePush(flightID);
  };

  return (
    <Btn
      onPress={handleToggle}
      style={{
        backgroundColor: bgColor,
        shadowColor: bgColor,
        shadowOpacity: isEnabled ? 0.3 : 0,
      }}
    >
      <FaIcon type="fa" name={icon} color={color} />
      <BtnText style={{ color }}>Alerts</BtnText>
    </Btn>
  );
};

const Btn = styled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  theme.presets.shadows[100],
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
