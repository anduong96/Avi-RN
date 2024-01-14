import * as React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import type { StyleProp, ViewStyle } from 'react-native';

import { isNil } from 'lodash';
import tinycolor from 'tinycolor2';

import type { SpaceKeys } from '@app/themes';
import type { StringOrElement } from '@app/types/string.or.component';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { getSpaceValue } from '@app/lib/get.space.value';

import { Typography } from '../typography';
import { Collapsible } from '../collapsible';
import { LoadingOverlay } from '../loading.overlay';
import { StringRenderer } from '../string.renderer';
import { AnimatedTouchable } from '../animated.touchable';

type Props = React.PropsWithChildren<{
  collapsible?: boolean;
  direction?: 'column' | 'row';
  gap?: SpaceKeys;
  hasShadow?: boolean;
  isCentered?: boolean;
  isCollapsed?: boolean;
  isLoading?: boolean;
  isOutlined?: boolean;
  margin?: SpaceKeys | number;
  marginHorizontal?: SpaceKeys | number;
  marginVertical?: SpaceKeys | number;
  onCollapseState?: (isCollapsed: boolean) => void;
  padding?: SpaceKeys | number;
  style?: StyleProp<ViewStyle>;
  title?: StringOrElement;
  type?: 'filled' | 'outlined' | 'transparent';
}>;

export const Card: React.FC<Props> = ({
  children,
  collapsible = false,
  direction,
  gap,
  hasShadow,
  isCentered,
  isCollapsed = false,
  isLoading,
  isOutlined,
  margin,
  marginHorizontal,
  marginVertical,
  onCollapseState,
  padding,
  style,
  title,
  type = 'filled',
}) => {
  return (
    <Container>
      {!isNil(title) && (
        <Header>
          <Meta>
            <StringRenderer Container={Typography} type="h3">
              {title}
            </StringRenderer>
          </Meta>
        </Header>
      )}
      {collapsible && (
        <CollapsibleBtn
          isCollapsed={isCollapsed}
          onPress={() => {
            vibrate('effectClick');
            onCollapseState?.(!isCollapsed);
          }}
          padding={padding}
        >
          <Typography
            color={isCollapsed ? 'active' : 'secondary'}
            isBold
            type="small"
          >
            Tap to {isCollapsed ? 'Expand' : 'Minimize'}
          </Typography>
        </CollapsibleBtn>
      )}
      <Collapsible isCollapsed={isCollapsed}>
        <Content
          direction={direction}
          gap={gap}
          hasShadow={hasShadow}
          isCentered={isCentered}
          isOutlined={isOutlined}
          margin={margin}
          marginHorizontal={marginHorizontal}
          marginVertical={marginVertical}
          padding={padding}
          style={style}
          type={type}
        >
          <LoadingOverlay isDark isLoading={isLoading} type="solid" />
          {children}
        </Content>
      </Collapsible>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  {
    gap: theme.space.tiny,
  },
]);

const Header = withStyled(Animated.View, (theme) => [
  {
    alignItems: 'center',
    borderRadius: theme.borderRadius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: theme.space.tiny,
    paddingVertical: theme.space.small,
  },
]);

const Content = withStyled<
  Pick<
    Props,
    | 'direction'
    | 'gap'
    | 'hasShadow'
    | 'isCentered'
    | 'isOutlined'
    | 'margin'
    | 'marginHorizontal'
    | 'marginVertical'
    | 'padding'
    | 'type'
  >,
  typeof View
>(View, (theme, props) => [
  props.isCentered && theme.presets.centered,
  props.hasShadow && theme.presets.shadows[200],
  {
    borderRadius: theme.borderRadius,
    gap: theme.space.medium,
  },
  props.type === 'filled' && {
    backgroundColor: theme.pallette.card,
  },
  props.type === 'outlined' && {
    borderColor: theme.pallette.card,
    borderStyle: 'solid',
    borderWidth: theme.borderWidth,
  },
  props.direction && {
    flexDirection: props.direction,
  },
  !isNil(props.padding) && {
    padding: getSpaceValue(props.padding, theme),
  },
  !isNil(props.margin) && {
    margin: getSpaceValue(props.margin, theme),
  },
  !isNil(props.marginHorizontal) && {
    marginHorizontal: getSpaceValue(props.marginHorizontal, theme),
  },
  !isNil(props.marginVertical) && {
    marginVertical: getSpaceValue(props.marginVertical, theme),
  },
  props.isOutlined && {
    backgroundColor: theme.pallette.transparent,
    borderColor: theme.pallette.borderColor,
    borderWidth: theme.borderWidth,
    shadowOpacity: 0,
  },
  !isNil(props.gap) && {
    gap: theme.space[props.gap],
  },
]);

const Meta = withStyled(View, () => [
  {
    flexGrow: 1,
  },
]);

const CollapsibleBtn = withStyled<
  Pick<Props, 'isCollapsed' | 'padding'>,
  typeof AnimatedTouchable
>(
  AnimatedTouchable,
  (theme, props) => [
    theme.presets.centered,
    {
      backgroundColor: tinycolor(theme.pallette.card)
        .setAlpha(0.5)
        .toRgbString(),
      borderColor: theme.pallette.card,
      borderRadius: theme.borderRadius,
      borderWidth: theme.borderWidth,
      margin: theme.space.medium,
      padding: theme.space.medium,
    },
    props.isCollapsed && {
      borderColor: tinycolor(theme.pallette.active).setAlpha(0.2).toRgbString(),
    },
    !isNil(props.padding) && {
      margin: getSpaceValue(props.padding, theme),
    },
  ],
  {
    activeOpacity: 0.8,
  },
);
