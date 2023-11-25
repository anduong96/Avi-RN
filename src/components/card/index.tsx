import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import type { StyleProp, ViewStyle } from 'react-native';

import { isNil } from 'lodash';

import type { SpaceKeys } from '@app/themes';
import type { StringOrElement } from '@app/types/string.or.component';

import { withStyled } from '@app/lib/styled';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { getSpaceValue } from '@app/lib/get.space.value';

import { Typography } from '../typography';
import { Collapsible } from '../collapsible';
import { FaIcon } from '../icons.fontawesome';
import { LoadingOverlay } from '../loading.overlay';
import { StringRenderer } from '../string.renderer';

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
  const theme = useTheme();
  const isCollapsedDerived = useDerivedValue(() => isCollapsed, [isCollapsed]);
  const collapseBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withTiming(isCollapsedDerived.value ? '0deg' : '180deg'),
      },
    ],
  }));

  return (
    <Container>
      {!isNil(title) && (
        <Header>
          <Meta>
            <StringRenderer Container={Typography} type="h3">
              {title}
            </StringRenderer>
          </Meta>
          <Actions></Actions>
        </Header>
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
      {collapsible && (
        <CollapsibleBtn
          onPress={() => {
            vibrate('effectClick');
            onCollapseState?.(!isCollapsed);
          }}
        >
          <Animated.View style={collapseBtnAnimatedStyle}>
            <FaIcon
              color={theme.pallette.grey[400]}
              name="circle-chevron-down"
            />
          </Animated.View>
        </CollapsibleBtn>
      )}
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

const Meta = withStyled(View, () => [{}]);

const Actions = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
  },
]);

const CollapsibleBtn = withStyled(
  Animated.createAnimatedComponent(TouchableOpacity),
  (theme) => [
    theme.presets.centered,
    {
      backgroundColor: theme.pallette.card,
      borderRadius: theme.borderRadius,
      padding: theme.space.medium,
    },
  ],
  {
    activeOpacity: 0.8,
  },
);
