import type { TouchableOpacityProps } from 'react-native';

import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type { StringOrElement } from '@app/types/string.or.component';

import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { CheckIcon } from '../icon.check';

type Props = {
  fullWidth?: boolean;
  hasError?: boolean;
  placeholder?: string;
  postfix?: React.ReactElement | false;
  prefix?: React.ReactElement | false;
  size?: SpaceKeys;
  value?: StringOrElement;
  withFeedback?: boolean;
} & TouchableOpacityProps;

export const InputBtn: React.FC<Props> = ({
  fullWidth,
  hasError,
  placeholder,
  postfix,
  prefix,
  size,
  style,
  value,
  withFeedback,
  ...props
}) => {
  const theme = useTheme();
  return (
    <Container
      hasError={hasError}
      isDisabled={props.disabled}
      isFullWidth={fullWidth}
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

import type { SpaceKeys } from '@app/themes';
const Container = styled<
  {
    hasError?: boolean;
    isDisabled?: boolean;
    isFullWidth?: boolean;
  },
  typeof View
>(View, (theme, props) => [
  theme.presets.input,
  {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 55,
    overflow: 'hidden',
  },
  props.isFullWidth && {
    width: '100%',
  },
  props.hasError && {
    borderColor: theme.pallette.danger,
  },
  props.isDisabled && {
    opacity: 0.5,
  },
]);

const Btn = styled<{ size?: SpaceKeys }, typeof TouchableOpacity>(
  TouchableOpacity,
  (theme, props) => [
    {
      borderWidth: 0,
      flexGrow: 1,
      padding: theme.space.medium,
    },
    props.size === 'large' && {
      paddingVertical: theme.space.large,
    },
  ],
);

const PlaceholderText = styled(Text, (theme) => ({
  color: theme.pallette.grey[400],
}));

const ValueText = styled(Text, (theme) => ({
  fontSize: theme.typography.presets.p1.fontSize,
}));

const AddonLeft = styled(View, (theme) => ({
  paddingLeft: theme.space.medium,
}));

const AddonRight = styled(View, (theme) => ({
  paddingRight: theme.space.medium,
}));
