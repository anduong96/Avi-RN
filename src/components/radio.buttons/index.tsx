import * as React from 'react';

import { Container, Option, OptionIndicator, OptionText } from './styles';
import RNReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

import { ActivityIndicator } from 'react-native';
import type { LabelOption } from '@app/types/label.option';
import { MaterialIcon } from '../icons.material';
import { isEmpty } from 'lodash';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props<T> = {
  allowUncheck?: boolean;
  options?: LabelOption<T>[];
  value?: T;
  onChange?: (value?: T) => void;
  hasErrors?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
};

export function RadioButtons<T>({
  value,
  options,
  allowUncheck,
  hasErrors,
  onChange,
  isLoading,
  isDisabled,
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
            disabled={isDisabled}
            activeOpacity={isActive ? 1 : 0.8}
            key={index}
            hasErrors={hasErrors}
            onPress={() => handleSelect(opt.value)}
          >
            <OptionIndicator isActive={isActive} hasErrors={hasErrors}>
              {isActive && (
                <MaterialIcon
                  color={theme.pallette.white}
                  name="check"
                  size={10}
                />
              )}
            </OptionIndicator>
            <OptionText>{opt.label}</OptionText>
          </Option>
        );
      })}
    </Container>
  );
}
