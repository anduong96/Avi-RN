import * as React from 'react';

import {
  AddonLeft,
  AddonRight,
  Btn,
  Container,
  PlaceholderText,
  ValueText,
} from './styles';

import { CheckIcon } from '../icon.check';
import type { SpaceKeys } from '@app/themes';
import type { StringOrElement } from '@app/types/string.or.component';
import type { TouchableOpacityProps } from 'react-native';
import { View } from 'react-native';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  size?: SpaceKeys;
  placeholder?: string;
  value?: StringOrElement;
  prefix?: React.ReactElement | false;
  postfix?: React.ReactElement | false;
  fullWidth?: boolean;
  hasError?: boolean;
  withFeedback?: boolean;
} & TouchableOpacityProps;

export const InputBtn: React.FC<Props> = ({
  placeholder,
  value,
  prefix,
  postfix,
  fullWidth,
  hasError,
  size,
  style,
  withFeedback,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Container
      isDisabled={props.disabled}
      isFullWidth={fullWidth}
      hasError={hasError}
      style={[style]}
    >
      {prefix && <AddonLeft>{prefix}</AddonLeft>}
      <Btn {...props} size={size}>
        {value ? (
          React.isValidElement(value) ? (
            value
          ) : (
            <ValueText>{value}</ValueText>
          )
        ) : (
          <PlaceholderText>{placeholder}</PlaceholderText>
        )}
      </Btn>
      {withFeedback && value && !hasError && (
        <View style={{ paddingHorizontal: theme.space.medium }}>
          <CheckIcon />
        </View>
      )}
      {postfix && <AddonRight>{postfix}</AddonRight>}
    </Container>
  );
};
