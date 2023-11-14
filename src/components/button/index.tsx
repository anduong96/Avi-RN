import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import * as React from 'react';
import { Text } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { isNil } from 'lodash';
import tinycolor from 'tinycolor2';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { FaIcon } from '../icons.fontawesome';
import { LoadingOverlay } from '../loading.overlay';
import { StringRenderer } from '../string.renderer';
import { AnimatedTouchable } from '../animated.touchable';

type Props = React.PropsWithChildren<{
  color?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  gap?: number;
  hasShadow?: boolean;
  icon?: string;
  iconProps?: Omit<React.ComponentProps<typeof FaIcon>, 'name'>;
  isBold?: boolean;
  isLoading?: boolean;
  isSolid?: boolean;
  onPress?: () => void;
  postfix?: React.ReactElement;
  prefix?: React.ReactElement;
  size?: 'large' | 'medium' | 'small';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  type?: 'active' | 'default' | 'primary';
}>;

export const Button = React.forwardRef<typeof AnimatedTouchable, Props>(
  (
    {
      children,
      color,
      disabled,
      fullWidth,
      gap,
      hasShadow,
      icon,
      iconProps,
      isBold,
      isLoading,
      isSolid,
      onPress,
      postfix,
      prefix,
      size,
      style,
      textStyle,
      type,
    },
    ref,
  ) => {
    const theme = useTheme();
    const isPressed = useSharedValue(false);
    const pressedStyled = useAnimatedStyle(() => ({
      transform: [
        {
          scale: withTiming(isPressed.value ? 0.9 : 1, {
            duration: 100,
          }),
        },
      ],
    }));
    const displayColor =
      color ||
      (!isSolid
        ? theme.pallette.transparent
        : type === 'primary'
        ? theme.pallette.primary
        : type === 'active'
        ? theme.pallette.active
        : theme.pallette.transparent);

    const textColor = isSolid
      ? tinycolor
          .mostReadable(displayColor, [
            theme.pallette.text,
            theme.pallette.black,
            theme.pallette.white,
          ])
          .toHexString()
      : type === 'primary'
      ? theme.pallette.primary
      : type === 'active'
      ? theme.pallette.active
      : color ?? theme.pallette.text;

    const handlePressIn = () => {
      isPressed.value = true;
    };

    const handlePressOut = () => {
      isPressed.value = false;
    };

    return (
      <Container
        color={displayColor}
        disabled={disabled}
        fullWidth={fullWidth}
        gap={gap}
        hasShadow={hasShadow}
        isSolid={isSolid}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ref={ref}
        size={size}
        style={[pressedStyled, style]}
        type={type}
      >
        <LoadingOverlay
          isDark={theme.isDark}
          isLoading={isLoading}
          isRound
          size="small"
          type="solid"
        />
        {prefix ??
          (icon && (
            <Icon color={textColor} name={icon} {...(iconProps ?? {})} />
          ))}
        <StringRenderer
          Container={BtnText}
          color={textColor}
          isBold={isBold}
          isSolid={isSolid}
          size={size}
          style={[textStyle]}
          type={type}
        >
          {children}
        </StringRenderer>
        {postfix}
      </Container>
    );
  },
);

const Container = withStyled<
  Pick<
    Props,
    'color' | 'fullWidth' | 'gap' | 'hasShadow' | 'isSolid' | 'size' | 'type'
  >,
  typeof AnimatedTouchable
>(AnimatedTouchable, (theme, props) => [
  !props.disabled &&
    props.isSolid &&
    props.hasShadow &&
    theme.presets.shadows[200],
  {
    alignItems: 'center',
    borderRadius: theme.roundRadius,
    borderWidth: theme.borderWidth,
    flexDirection: 'row',
    gap: theme.space.tiny,
    justifyContent: 'center',
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.small,
  },
  !props.isSolid && {
    borderColor:
      props.color === theme.pallette.transparent
        ? theme.pallette.borderColor
        : props.color,
  },
  props.isSolid && {
    backgroundColor: props.color,
    borderColor: props.color,
  },
  props.type === 'primary' &&
    !props.isSolid && {
      borderColor: theme.pallette.primary,
    },
  props.type === 'active' &&
    !props.isSolid && {
      borderColor: theme.pallette.active,
    },
  !isNil(props.gap) && {
    gap: props.gap,
  },
  props.fullWidth && {
    width: '100%',
  },
  props.disabled && {
    opacity: 0.3,
  },
  props.size === 'small' && {
    paddingHorizontal: theme.space.small,
    paddingVertical: 0,
  },
  props.size === 'large' && {
    paddingHorizontal: theme.space.xLarge,
    paddingVertical: theme.space.small,
  },
]);

const BtnText = withStyled<
  Pick<Props, 'color' | 'isBold' | 'isSolid' | 'size' | 'type'>,
  typeof Text
>(Text, (theme, props) => [
  theme.typography.presets.p1,
  props.size === 'large' && theme.typography.presets.h2,
  {
    color: props.color,
  },
  props.isBold && {
    fontWeight: 'bold',
  },
  props.size === 'small' && {
    fontSize: theme.typography.presets.small.fontSize,
  },
]);

const Icon = withStyled(FaIcon, (theme) => [
  {
    fontSize: theme.typography.presets.p1.fontSize,
  },
]);
