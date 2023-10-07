import type { FullFlightFragmentFragment } from '@app/generated/server.gql';
import { useGetRandomFlightLazyQuery } from '@app/generated/server.gql';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { styled } from '@app/lib/styled';
import { toast } from '@baronha/ting';
import { BlurView } from '@react-native-community/blur';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FaIcon } from '../icons.fontawesome';
import { LoadingOverlay } from '../loading.overlay';

type Props = {
  withLabel?: boolean;
  onFlight: (flight: FullFlightFragmentFragment) => void;
};

export const RandomFlightBtn: React.FC<Props> = ({ onFlight, withLabel }) => {
  const theme = useTheme();
  const [getFlight, { loading }] = useGetRandomFlightLazyQuery({
    onError(error) {
      toast({
        title: error.message,
        preset: 'error',
        position: 'top',
      });
    },
    onCompleted(data) {
      onFlight(data.randomFlight);
    },
  });

  const handlePress = async () => {
    vibrate('impactHeavy');
    await getFlight();
  };

  return (
    <Btn disabled={loading} onPress={handlePress}>
      <LoadingOverlay
        isDark
        type="translucent"
        isLoading={loading}
        size="small"
      />
      <Bg blurType="xlight" />
      <FaIcon color={theme.pallette.grey[800]} name="dice" />
      {withLabel && <Label>Random Flight</Label>}
    </Btn>
  );
};

const Btn = styled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    paddingHorizontal: theme.space.small,
    paddingVertical: theme.space.tiny,
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
  },
]);

const Bg = styled(BlurView, () => [StyleSheet.absoluteFill]);

const Label = styled(Text, (theme) => [
  {
    color: theme.pallette.grey[800],
    marginLeft: theme.space.small,
  },
]);
