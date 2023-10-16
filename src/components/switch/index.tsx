import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { startCase } from 'lodash';

import { styled } from '@app/lib/styled';

export type Props = {
  disabled?: boolean;
  onChange?: (value: Props['value']) => void;
  options: Array<{ label: string; value: string }> | Array<string>;
  value?: string;
};

export const SwitchButton: React.FC<Props> = ({
  disabled,
  onChange,
  options,
  value,
}) => {
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
            key={itemValue}
            onPress={() => onChange?.(itemValue)}
          >
            <Label isActive={isActive}>{itemLabel}</Label>
          </Option>
        );
      })}
    </Container>
  );
};

const Container = styled<{ isDisabled?: boolean }, typeof View>(
  View,
  (_theme, props) => [
    {
      flexDirection: 'row',
    },
    props.isDisabled && {
      opacity: 0.9,
    },
  ],
);

const Option = styled(TouchableOpacity, (theme) => [
  {
    paddingHorizontal: theme.space.small,
  },
]);

const Label = styled<{ isActive?: boolean }, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets.p1,
    props.isActive && {
      color: theme.pallette.active,
      fontWeight: 'bold',
    },
  ],
);
