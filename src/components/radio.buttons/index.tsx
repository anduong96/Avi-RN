import * as React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import RNReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

import { isEmpty } from 'lodash';

import type { LabelOption } from '@app/types/label.option';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { FaIcon } from '../icons.fontawesome';

type Props<T> = {
  allowUncheck?: boolean;
  hasErrors?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onChange?: (value?: T) => void;
  options?: LabelOption<T>[];
  value?: T;
};

export function RadioButtons<T>({
  allowUncheck,
  hasErrors,
  isDisabled,
  isLoading,
  onChange,
  options,
  value,
}: Props<T>) {
  const theme = useTheme();

  const handleSelect = (selection: T) => {
    if (!isDisabled) {
      RNReactNativeHapticFeedback.trigger(HapticFeedbackTypes.impactMedium);
      if (allowUncheck && selection === value) {
        onChange?.(undefined);
      } else {
        onChange?.(selection);
      }
    }
  };

  if (isLoading && isEmpty(options)) {
    return (
      <Container>
        <Option>
          <ActivityIndicator size={'small'} />
        </Option>
      </Container>
    );
  }

  return (
    <Container style={[hasErrors && { borderColor: theme.pallette.danger }]}>
      {options?.map((opt, index) => {
        const isActive = opt.value === value;
        return (
          <Option
            activeOpacity={isActive ? 1 : 0.8}
            disabled={isDisabled}
            hasErrors={hasErrors}
            key={index}
            onPress={() => handleSelect(opt.value)}
          >
            <OptionIndicator hasErrors={hasErrors} isActive={isActive}>
              {isActive && (
                <FaIcon color={theme.pallette.white} name="check" size={10} />
              )}
            </OptionIndicator>
            <OptionText>{opt.label}</OptionText>
          </Option>
        );
      })}
    </Container>
  );
}

const Container = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.small,
  },
]);

const Option = withStyled<
  { hasErrors?: boolean; isActive?: boolean },
  typeof TouchableOpacity
>(TouchableOpacity, (theme, props) => [
  theme.presets.outlinedBox,
  {
    alignItems: 'center',
    flexBasis: 1,
    flexDirection: 'row',
    flexGrow: 1,
    gap: theme.space.medium,
    padding: theme.space.medium,
  },
  props.isActive && {
    borderColor: theme.pallette.success,
  },
  props.hasErrors && {
    borderColor: theme.pallette.danger,
  },
]);

const OptionText = withStyled(Text, (theme) => [
  {
    color: theme.pallette.text,
    flexGrow: 1,
    fontSize: theme.typography.presets.p1.fontSize,
  },
]);

const OptionIndicator = withStyled<
  { hasErrors?: boolean; isActive?: boolean },
  typeof View
>(View, (theme, props) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    borderRadius: 30,
    borderWidth: 1,
    height: undefined,
    position: 'absolute',
    right: theme.space.medium,
    width: 20,
  },
  props.isActive && [
    theme.presets.shadows[100],
    {
      backgroundColor: theme.pallette.success,
      borderColor: theme.pallette.success,
      shadowColor: theme.pallette.success,
      shadowOpacity: 0.8,
    },
  ],
  !props.isActive && {
    borderColor: theme.pallette.grey[200],
  },
  props.hasErrors && {
    borderColor: theme.pallette.danger,
  },
]);
