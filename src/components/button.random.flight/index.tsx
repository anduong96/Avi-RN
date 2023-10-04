import { useTheme } from '@app/lib/hooks/use.theme';
import { styled } from '@app/lib/styled';
import * as React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { FaIcon } from '../icons.fontawesome';
import { BlurView } from '@react-native-community/blur';
import type { FullFlightFragmentFragment } from '@app/generated/server.gql';
import { useGetRandomFlightLazyQuery } from '@app/generated/server.gql';
import { LoadingOverlay } from '../loading.overlay';
import { vibrate } from '@app/lib/haptic.feedback';
import { toast } from '@baronha/ting';

type Props = {
  onFlight: (flight: FullFlightFragmentFragment) => void;
};

export const RandomFlightBtn: React.FC<Props> = ({ onFlight }) => {
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
      <FaIcon color={theme.pallette.grey[800]} name="random" />
      <Text style={{ color: theme.pallette.grey[800] }}>Random Flight</Text>
    </Btn>
  );
};

const Btn = styled(Pressable, (theme) => [
  {
    flexDirection: 'row',
    paddingHorizontal: theme.space.small,
    paddingVertical: theme.space.tiny,
    gap: theme.space.small,
    borderRadius: theme.borderRadius,
    overflow: 'hidden',
  },
]);

const Bg = styled(BlurView, () => [StyleSheet.absoluteFill]);
