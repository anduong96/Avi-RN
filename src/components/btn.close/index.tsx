import type { StyleProp, ViewStyle } from 'react-native';

import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { styled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useExitPage } from '@app/lib/hooks/use.exit.page';

import { FaIcon } from '../icons.fontawesome';

type Props = {
  disabled?: boolean;
  onPress?: () => void;
  size?: number;
  style?: StyleProp<ViewStyle>;
  withFeedback?: boolean;
};

export const CloseBtn: React.FC<Props> = ({
  disabled,
  onPress,
  size = 30,
  style,
  withFeedback = true,
}) => {
  const exit = useExitPage();

  const handlePress = () => {
    if (withFeedback) {
      vibrate('effectClick');
    }

    if (onPress) {
      onPress();
    } else {
      exit();
    }
  };

  return (
    <Container
      disabled={disabled}
      onPress={handlePress}
      size={size}
      style={style}
    >
      <FaIcon name="times" size={15} />
    </Container>
  );
};

const Container = styled<{ size: number }, typeof TouchableOpacity>(
  TouchableOpacity,
  (theme, props) => [
    theme.presets.centered,
    {
      aspectRatio: 1,
      backgroundColor: theme.pallette.background,
      borderColor: theme.pallette.borderColor,
      borderRadius: props.size,
      borderWidth: theme.borderWidth,
      height: undefined,
      width: props.size,
    },
  ],
);
