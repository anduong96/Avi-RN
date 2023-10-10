import type { StyleProp, ViewStyle } from 'react-native';

import * as React from 'react';
import { View } from 'react-native';

import { isNil } from 'lodash';

import type { SpaceKeys } from '@app/themes';

import { styled } from '@app/lib/styled';

import { LoadingOverlay } from '../loading.overlay';

type Props = React.PropsWithChildren<{
  direction?: 'column' | 'row';
  gap?: SpaceKeys;
  hasShadow?: boolean;
  isCentered?: boolean;
  isLoading?: boolean;
  isOutlined?: boolean;
  margin?: SpaceKeys;
  padding?: SpaceKeys;
  style?: StyleProp<ViewStyle>;
}>;

export const Card: React.FC<Props> = ({
  children,
  direction,
  gap,
  hasShadow,
  isCentered,
  isLoading,
  isOutlined,
  margin,
  padding,
  style,
}) => {
  return (
    <Container
      direction={direction}
      gap={gap}
      hasShadow={hasShadow}
      isCentered={isCentered}
      isOutlined={isOutlined}
      margin={margin}
      padding={padding}
      style={[style]}
    >
      <LoadingOverlay isDark isLoading={isLoading} type="solid" />
      {children}
    </Container>
  );
};

const Container = styled<
  Pick<
    Props,
    | 'direction'
    | 'gap'
    | 'hasShadow'
    | 'isCentered'
    | 'isOutlined'
    | 'margin'
    | 'padding'
  >,
  typeof View
>(View, (theme, props) => [
  props.isCentered && theme.presets.centered,
  props.hasShadow && theme.presets.shadows[200],
  {
    backgroundColor: theme.pallette.card,
    borderRadius: theme.borderRadius,
    gap: theme.space.medium,
    padding: theme.space.medium,
  },
  props.padding && {
    padding: theme.space[props.padding],
  },
  props.margin && {
    margin: theme.space[props.margin],
  },
  !isNil(props.gap) && {
    gap: theme.space[props.gap],
  },
]);
