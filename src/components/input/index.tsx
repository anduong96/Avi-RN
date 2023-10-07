import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { IS_ANDROID } from '@app/lib/platform';
import type { SpaceKeys } from '@app/themes';
import { TextInput } from 'react-native';
import { CheckIcon } from '../icon.check';
import { MaterialIcon } from '../icons.material';

type Props = {
  value?: string;
  onChange?: (value: Props['value']) => void;
  hasErrors?: boolean;
  size?: SpaceKeys;
  disabled?: boolean;
  postfix?: React.ReactElement;
  prefix?: React.ReactElement;
  inputStyle?: StyleProp<ViewStyle>;
  allowClear?: boolean;
  withFeedback?: boolean;
  debug?: boolean;
} & Omit<
  React.ComponentProps<typeof TextInput>,
  'onChange' | 'onChangeText' | 'size'
>;

export const Input = React.forwardRef<TextInput, Props>(
  (
    {
      value,
      hasErrors,
      size = 'medium',
      withFeedback,
      onChange,
      disabled,
      inputStyle,
      postfix,
      prefix,
      allowClear,
      inputMode,
      placeholder,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const isFocused = useSharedValue(false);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        borderColor: withTiming(
          hasErrors
            ? theme.pallette.danger
            : isFocused.value
            ? theme.pallette.active
            : theme.pallette.grey[50],
        ),
      };
    });

    const handleClear = () => {
      vibrate('impactMedium');
      onChange?.(undefined);
    };

    const handleChange = (nextValue?: string) => {
      if (!disabled) {
        onChange?.(nextValue);
      }
    };

    const handleBlur: Props['onBlur'] = (event) => {
      isFocused.value = false;
      props.onBlur?.(event);
    };

    const handleFocus: Props['onFocus'] = (event) => {
      isFocused.value = true;
      props.onFocus?.(event);
    };

    const handleSubmit: Props['onSubmitEditing'] = (event) => {
      InputPublisher.broadcast('submit', undefined);
      props.onSubmitEditing?.(event);
    };

    return (
      <Container
        size={size}
        style={[animatedStyle, props.style]}
        disabled={disabled}
      >
        {prefix}
        <StyledInput
          {...props}
          ref={ref}
          defaultValue={defaultValue}
          placeholder={placeholder}
          inputMode={inputMode}
          editable={!disabled}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChange}
          clearButtonMode="while-editing"
          placeholderTextColor={theme.pallette.grey[400]}
          style={[inputStyle]}
          onSubmitEditing={handleSubmit}
        />
        {postfix}
        {value && withFeedback && !hasErrors && <CheckIcon />}
        {allowClear && value && IS_ANDROID && (
          <ClearContainer onPress={handleClear}>
            <MaterialIcon name="close-circle" />
          </ClearContainer>
        )}
      </Container>
    );
  },
);

import { TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { styled } from '../../lib/styled';
import { InputPublisher } from './publisher';

const Container = styled<
  Pick<Props, 'size' | 'disabled'>,
  typeof Animated.View
>(Animated.View, (theme, props) => [
  theme.presets.outlinedBox,
  {
    borderRadius: 100,
    paddingHorizontal: theme.space.small,
    paddingVertical: theme.space.tiny,
    flexDirection: 'row',
    gap: theme.space.small,
    flexGrow: 1,
    backgroundColor: theme.pallette.grey[50],
  },
  props.disabled && {
    opacity: 0.5,
  },
  props.size === 'medium' && {
    paddingVertical: theme.space.small,
  },
  props.size === 'tiny' && {
    paddingVertical: theme.space.tiny,
  },
]);

const StyledInput = styled<Pick<Props, 'size'>, typeof TextInput>(
  TextInput,
  (theme, props) => [
    {
      fontSize: theme.typography.presets.p1.fontSize,
      flexGrow: 1,
    },
    props.size === 'large' && {
      fontSize: theme.typography.presets.h2.fontSize,
    },
  ],
);

const ClearContainer = styled(TouchableOpacity, () => ({}));
