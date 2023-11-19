import type { StyleProp, ViewStyle } from 'react-native';

import * as React from 'react';
import { TextInput } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import mergeRefs from 'merge-refs';

import type { SpaceKeys } from '@app/themes';

import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { IS_ANDROID, IS_IOS } from '@app/lib/platform';

import { InputPublisher } from './publisher';
import { withStyled } from '../../lib/styled';
import { FaIcon } from '../icons.fontawesome';
import { AnimatedTouchable } from '../animated.touchable';

type Props = {
  allowClear?: boolean;
  debug?: boolean;
  disabled?: boolean;
  hasErrors?: boolean;
  inputStyle?: StyleProp<ViewStyle>;
  onChange?: (value: Props['value']) => void;
  postfix?: React.ReactElement;
  prefix?: React.ReactElement;
  size?: SpaceKeys;
  value?: string;
  withFeedback?: boolean;
} & Omit<
  React.ComponentProps<typeof TextInput>,
  'onChange' | 'onChangeText' | 'size'
>;

export const Input = React.forwardRef<TextInput, Props>(
  (
    {
      allowClear,
      defaultValue,
      disabled,
      hasErrors,
      inputMode,
      inputStyle,
      onChange,
      placeholder,
      postfix,
      prefix,
      size = 'medium',
      value,
      withFeedback,
      ...props
    },
    ref,
  ) => {
    const theme = useTheme();
    const input = React.useRef<TextInput>(null);
    const [showClear, setShowClear] = React.useState(false);
    const isFocused = useSharedValue(false);
    const animatedStyle = useAnimatedStyle(() => {
      return {
        borderColor: withTiming(
          hasErrors
            ? theme.pallette.danger
            : isFocused.value
              ? theme.pallette.active
              : theme.pallette.borderColor,
        ),
      };
    });

    const handleClear = () => {
      vibrate('effectClick');
      input.current?.clear();
    };

    const handleChange = (nextValue?: string) => {
      if (!disabled) {
        onChange?.(nextValue);
      }

      if (nextValue && !showClear) {
        setShowClear(Boolean(allowClear && nextValue));
      }
    };

    const handleBlur: Props['onBlur'] = (event) => {
      isFocused.value = false;
      props.onBlur?.(event);
      setShowClear(false);
    };

    const handleFocus: Props['onFocus'] = (event) => {
      isFocused.value = true;
      props.onFocus?.(event);
      setShowClear(Boolean(allowClear && event.nativeEvent.text));
    };

    const handleSubmit: Props['onSubmitEditing'] = (event) => {
      InputPublisher.broadcast('submit', undefined);
      props.onSubmitEditing?.(event);
    };

    return (
      <Container
        disabled={disabled}
        size={size}
        style={[animatedStyle, props.style]}
      >
        {prefix}
        <StyledInput
          {...props}
          clearButtonMode={allowClear ? 'while-editing' : 'never'}
          defaultValue={defaultValue}
          editable={!disabled}
          inputMode={inputMode}
          keyboardAppearance={theme.isDark ? 'dark' : 'light'}
          onBlur={handleBlur}
          onChangeText={handleChange}
          onFocus={handleFocus}
          onSubmitEditing={handleSubmit}
          placeholder={placeholder}
          placeholderTextColor={theme.pallette.grey[200]}
          ref={mergeRefs(ref, input)}
          size={size}
          style={[inputStyle]}
          value={value}
        />
        {postfix}
        {value && withFeedback && !hasErrors && (
          <FaIcon color={theme.pallette.success} name="check-circle" />
        )}
        {IS_ANDROID && showClear && (
          <ClearContainer
            activeOpacity={1}
            entering={FadeIn.delay(1000)}
            exiting={FadeOut}
            onPress={handleClear}
          >
            <FaIcon name="circle-xmark" size={20} solid />
          </ClearContainer>
        )}
      </Container>
    );
  },
);

const Container = withStyled<
  Pick<Props, 'disabled' | 'size'>,
  typeof Animated.View
>(Animated.View, (theme, props) => [
  theme.presets.outlinedBox,
  {
    alignItems: 'center',
    borderRadius: theme.roundRadius,
    flexBasis: 1,
    flexDirection: 'row',
    flexGrow: 1,
    gap: theme.space.tiny,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: theme.space.medium,
  },
  IS_IOS && {
    paddingVertical: theme.space.small,
  },
  IS_IOS &&
    props.size === 'tiny' && {
      paddingVertical: theme.space.tiny,
    },
  props.disabled && {
    opacity: 0.5,
  },
]);

const StyledInput = withStyled<Pick<Props, 'size'>, typeof TextInput>(
  TextInput,
  (theme, props) => [
    {
      color: theme.pallette.text,
      flexGrow: 1,
      fontSize: theme.typography.presets.p1.fontSize,
      justifyContent: 'center',
      textAlign: 'left',
      textAlignVertical: 'center',
    },
    IS_ANDROID && {
      paddingHorizontal: 0,
      paddingVertical: 5,
    },
    props.size === 'large' && {
      fontSize: theme.typography.presets.h2.fontSize,
    },
  ],
);

const ClearContainer = withStyled(AnimatedTouchable, (theme) => [
  {
    flexDirection: 'row',
    position: 'absolute',
    right: theme.space.medium,
  },
]);
