import * as React from 'react';

import { ClearContainer, Container } from './styles';
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
import { TextInput } from 'react-native';
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
      debounceChange = 0,
      inputMode,
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

    const handleBlur: Props['onBlur'] = (event) => {
      setIsFocused(false);
      props.onBlur?.(event);
    };

    const handleFocus: Props['onFocus'] = (event) => {
      setIsFocused(false);
      props.onFocus?.(event);
    };

    return (
      <Container
        size={size}
        style={[animatedStyle, props.style]}
        disabled={disabled}
      >
        {prefix}
        <TextInput
          {...props}
          ref={ref}
          inputMode={inputMode}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          defaultValue={value}
          onChangeText={handleChange}
          clearButtonMode="while-editing"
          placeholderTextColor={theme.pallette.grey[400]}
          style={[
            inputStyle,
            {
              fontSize: theme.typography.presets.p1.fontSize,
              flexGrow: 1,
              height: '100%',
            },
            size === 'large' && {
              fontSize: theme.typography.presets.h2.fontSize,
            },
          ]}
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
