import type { StyleProp, ViewStyle } from 'react-native';

import * as React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  noPadding?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export const ButtonLink: React.FC<Props> = ({
  children,
  disabled,
  loading,
  onPress,
  style,
}) => {
  const loadingShared = useDerivedValue(() => loading, [loading]);
  const theme = useTheme();

  const loadingStyle = useAnimatedStyle(() => ({
    width: withTiming(loadingShared.value ? 30 : 0, {
      duration: 500,
    }),
  }));

  const handlePress = () => {
    if (disabled) {
      return;
    }

    vibrate('impactMedium');
    onPress?.();
  };

  return (
    <Container
      activeOpacity={disabled || loading ? 1 : undefined}
      onPress={handlePress}
      style={[style]}
    >
      <Label
        style={[(disabled || loading) && { color: theme.pallette.disabled }]}
      >
        {children}
      </Label>
      {loading && (
        <Animated.View style={loadingStyle}>
          <ActivityIndicator
            size="small"
            style={{ marginLeft: theme.space.medium }}
          />
        </Animated.View>
      )}
    </Container>
  );
};

const Container = withStyled(TouchableOpacity, () => ({
  flexDirection: 'row',
  padding: 0,
}));

const Label = withStyled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.active,
  },
]);
