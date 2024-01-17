import * as React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';
import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { FaIcon } from '@app/components/icons.fontawesome';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { PrimaryBackground } from '@app/components/background.primary';

type Props = {
  disabled?: boolean;
  icon: string;
  isActive: boolean;
  isLoading: boolean;
  label: string;
  onPress: () => void;
};

export const ActionBtn: React.FC<Props> = ({
  disabled,
  icon,
  isActive,
  isLoading,
  label,
  onPress,
}) => {
  const theme = useTheme();
  const color = isActive ? theme.pallette.white : theme.pallette.text;

  return (
    <Button disabled={disabled} onPress={onPress}>
      <LoadingOverlay isLoading={isLoading} />
      {isActive && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={[StyleSheet.absoluteFill]}
        >
          <PrimaryBackground />
        </Animated.View>
      )}
      <Group
        direction="row"
        gap="small"
        horizontalAlign="center"
        verticalAlign="center"
      >
        <FaIcon color={color} name={icon} />
        <Typography color={color} isBold type="h3">
          {label}
        </Typography>
      </Group>
    </Button>
  );
};

const Button = withStyled(Pressable, (theme, props) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.background,
    borderColor: theme.pallette.borderColor,
    borderRadius: theme.roundRadius,
    borderWidth: theme.borderWidth,
    overflow: 'hidden',
    paddingVertical: theme.space.small,
    width: 150,
  },
  props.disabled && {
    opacity: 0.3,
  },
]);
