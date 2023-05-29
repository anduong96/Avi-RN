import * as React from 'react';

import { ClearContainer, Container, StyledInput } from './styles';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { CheckIcon } from '../icon.check';
import { IS_ANDROID } from '@app/lib/platform';
import { MaterialIcon } from '../icons.material';
import type { SpaceKeys } from '@app/themes';
import { debounce } from 'lodash';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

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
  debounceChange?: number;
  withFeedback?: boolean;
} & Omit<
  React.ComponentProps<typeof StyledInput>,
  'onChange' | 'onChangeText' | 'size'
>;

export const Input: React.FC<Props> = ({
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
  debounceChange = 0,
  inputMode,
  ...props
}) => {
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

  const handleChange = debounce((nextValue?: string) => {
    if (!disabled) {
      if (inputMode === 'numeric') {
        onChange?.(nextValue?.replace(/[^0-9]/g, ''));
      } else {
        onChange?.(nextValue);
      }
    }
  }, debounceChange);

  const setIsFocused = (state: boolean) => {
    isFocused.value = state;
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
        inputMode={inputMode}
        size={size}
        editable={!disabled}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[inputStyle]}
        defaultValue={value}
        onChangeText={handleChange}
        clearButtonMode="while-editing"
        placeholderTextColor={theme.pallette.grey[400]}
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
};
