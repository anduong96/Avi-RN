import type { TextStyle } from 'react-native';

import * as React from 'react';
import {
  type StyleProp,
  Text,
  TouchableOpacity,
  type ViewStyle,
} from 'react-native';

import { isNil } from 'lodash';
import tinycolor from 'tinycolor2';

import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { FaIcon } from '../icons.fontawesome';
import { LoadingOverlay } from '../loading.overlay';
import { StringRenderer } from '../string.renderer';

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

export const Button = React.forwardRef<unknown, Props>(
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
      : theme.pallette.text;

    return (
      <Container
        color={displayColor}
        disabled={disabled}
        fullWidth={fullWidth}
        gap={gap}
        hasShadow={hasShadow}
        isSolid={isSolid}
        onPress={onPress}
        ref={ref}
        size={size}
        style={[style]}
        type={type}
      >
        <LoadingOverlay
          isDark
          isLoading={isLoading}
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

const Container = styled<
  Pick<
    Props,
    'color' | 'fullWidth' | 'gap' | 'hasShadow' | 'isSolid' | 'size' | 'type'
  >,
  typeof TouchableOpacity
>(TouchableOpacity, (theme, props) => [
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
    borderColor: props.color,
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
    paddingVertical: theme.space.tiny,
  },
  props.size === 'large' && {
    paddingHorizontal: theme.space.xLarge,
    paddingVertical: theme.space.small,
  },
]);

const BtnText = styled<
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

const Icon = styled(FaIcon, (theme) => [
  {
    fontSize: theme.typography.presets.p1.fontSize,
  },
]);
