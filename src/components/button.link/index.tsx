import * as React from 'react';

import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { Container, Label } from './styles';
import type { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  noPadding?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const ButtonLink: React.FC<Props> = ({
  children,
  onPress,
  disabled,
  loading,
  noPadding,
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
      style={[noPadding && styles.noPadding, style]}
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

const styles = StyleSheet.create({
  noPadding: {
    padding: 0,
  },
});
