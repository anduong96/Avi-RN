import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { startCase } from 'lodash';

import { withStyled } from '@app/lib/styled';

export type Props<T> = {
  disabled?: boolean;
  onChange?: (value: T) => void;
  options: Array<{ label: string; value: T }> | Array<T>;
  value?: T;
};

export function SwitchButton<T extends string>({
  disabled,
  onChange,
  options,
  value,
}: Props<T>) {
  return (
    <Container isDisabled={disabled}>
      {options.map((item) => {
        const [itemValue, itemLabel] =
          typeof item === 'string'
            ? [item, startCase(item)]
            : [item.value, item.label];
        const isActive = value === itemValue;

        return (
          <Option
            disabled={disabled}
            key={itemLabel}
            onPress={() => onChange?.(itemValue as T)}
          >
            <Label isActive={isActive}>{itemLabel}</Label>
          </Option>
        );
      })}
    </Container>
  );
}

const Container = withStyled<{ isDisabled?: boolean }, typeof View>(
  View,
  (_theme, props) => [
    {
      flexDirection: 'row',
    },
    props.isDisabled && {
      opacity: 0.5,
    },
  ],
);

const Option = withStyled(TouchableOpacity, () => [{}]);

const Label = withStyled<{ isActive?: boolean }, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets.p1,
    props.isActive && {
      color: theme.pallette.active,
      fontWeight: 'bold',
    },
  ],
);
