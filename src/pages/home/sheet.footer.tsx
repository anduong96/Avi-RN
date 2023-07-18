import * as React from 'react';

import { FaIcon } from '@app/components/icons.fontawesome';
import { vibrate } from '@app/lib/haptic.feedback';
import { styled } from '@app/lib/styled';
import {
  BottomSheetFooter,
  useBottomSheet,
  type BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import { BlurView } from '@react-native-community/blur';
import { TouchableOpacity } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = BottomSheetFooterProps;

export const SheetFooter: React.FC<Props> = ({ animatedFooterPosition }) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const sheet = useBottomSheet();
  const animatedStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      sheet.animatedIndex.value,
      [0, 1],
      [0, -180],
      Extrapolate.CLAMP,
    );
    return {
      transform: [
        {
          rotate: `${rotation}deg`,
        },
      ],
    };
  });

  const handlePress = () => {
    vibrate('impactMedium');
    if (sheet.animatedIndex.value === 0) {
      sheet.snapToIndex(1);
    } else {
      sheet.snapToIndex(0);
    }
  };

  return (
    <BottomSheetFooter
      bottomInset={insets.bottom}
      animatedFooterPosition={animatedFooterPosition}
    >
      <Container style={[animatedStyle]}>
        <Background blurType="light">
          <Btn onPress={handlePress}>
            <FaIcon name="chevron-up" color={theme.pallette.grey[400]} />
          </Btn>
        </Background>
      </Container>
    </BottomSheetFooter>
  );
};

const Container = styled(Animated.View, () => [
  {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    elevation: 8,
    borderRadius: 100,
  },
]);

const Btn = styled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    width: '100%',
    height: '100%',
  },
]);

const Background = styled(BlurView, (theme) => [
  theme.presets.centered,
  {
    width: '100%',
    height: '100%',
  },
]);
