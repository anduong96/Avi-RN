import * as React from 'react';

import { ClearContainer, Container, StyledInput } from './styles';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { CheckIcon } from '../icon.check';
import { MaterialIcon } from '../material.icons';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { debounce } from 'lodash';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  value?: string;
  onChange?: (value: Props['value']) => void;
  hasErrors?: boolean;
  type?: 'filled' | 'outlined';
  size?: 'small' | 'medium';
  disabled?: boolean;
  postfix?: React.ReactElement;
  prefix?: React.ReactElement;
  inputStyle?: StyleProp<ViewStyle>;
  allowClear?: boolean;
  debounceChange?: number;
  withFeedback?: boolean;
} & Omit<React.ComponentProps<typeof StyledInput>, 'onChange' | 'onChangeText'>;

export const Input: React.FC<Props> = ({
  value,
  hasErrors,
  size,
  type = 'outlined',
  withFeedback,
  onChange,
  disabled,
  inputStyle,
  postfix,
  prefix,
  allowClear,
  debounceChange = 0,
  ...props
}) => {
  const theme = useTheme();
  const isFocused = useSharedValue(false);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: theme.pallette.background,
      borderColor: withTiming(
        hasErrors
          ? theme.pallette.danger
          : isFocused.value
          ? theme.pallette.grey[400]
          : theme.pallette.grey[200],
      ),
    };
  });

  const handleClear = () => {
    onChange?.(undefined);
    ReactNativeHapticFeedback.trigger('impactMedium');
  };

  const handleChange = debounce((nextValue?: string) => {
    if (!disabled) {
      onChange?.(nextValue);
    }
  }, debounceChange);

  const setIsFocused = (state: boolean) => {
    isFocused.value = state;
  };

  return (
    <Container
      type={type}
      style={[animatedStyle, props.style]}
      disabled={disabled}
    >
      {prefix}
      <StyledInput
        {...props}
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          size === 'small' && { paddingVertical: theme.space.small },
          inputStyle,
        ]}
        defaultValue={value}
        onChangeText={handleChange}
        placeholderTextColor={theme.pallette.grey[400]}
      />
      {postfix}
      {value && withFeedback && !hasErrors && <CheckIcon />}
      {allowClear && value && (
        <ClearContainer onPress={handleClear}>
          <MaterialIcon name="close-circle" />
        </ClearContainer>
      )}
    </Container>
  );
};
