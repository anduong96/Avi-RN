import * as React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrateFn } from '@app/lib/haptic.feedback';

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
  margin?: SpaceKeys;
  onCollapseState?: (isCollapsed: boolean) => void;
  padding?: SpaceKeys;
  style?: StyleProp<ViewStyle>;
  title?: StringOrElement;
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
  onCollapseState,
  padding,
  style,
  title,
}) => {
  const theme = useTheme();
  const isCollapsedDerived = useDerivedValue(() => isCollapsed, [isCollapsed]);
  const collapseBtnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: withTiming(isCollapsedDerived.value ? '0deg' : '180deg') },
    ],
  }));

  return (
    <Container
      hasShadow={hasShadow}
      isOutlined={isOutlined}
      margin={margin}
      style={[style]}
    >
      {!isNil(title) && (
        <Header>
          <Meta>
            <StringRenderer Container={Typography} type="h3">
              {title}
            </StringRenderer>
          </Meta>
          <Actions>
            {collapsible && (
              <CollapsibleBtn
                onPress={() =>
                  vibrateFn(
                    'effectClick',
                    () => onCollapseState?.(!isCollapsed),
                  )
                }
                style={[collapseBtnAnimatedStyle]}
              >
                <FaIcon
                  color={theme.pallette.active}
                  name="circle-chevron-down"
                />
              </CollapsibleBtn>
            )}
          </Actions>
        </Header>
      )}
      <Collapsible isCollapsed={isCollapsed}>
        <Content
          direction={direction}
          gap={gap}
          isCentered={isCentered}
          padding={padding}
        >
          <LoadingOverlay isDark isLoading={isLoading} type="solid" />
          {children}
        </Content>
      </Collapsible>
    </Container>
  );
};

const Container = withStyled<
  Pick<Props, 'hasShadow' | 'isOutlined' | 'margin'>,
  typeof View
>(View, (theme, props) => [
  props.hasShadow && theme.presets.shadows[200],
  {},
  props.margin && {
    margin: theme.space[props.margin],
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
  Pick<Props, 'direction' | 'gap' | 'isCentered' | 'padding'>,
  typeof View
>(View, (theme, props) => [
  props.isCentered && theme.presets.centered,
  {
    backgroundColor: theme.pallette.card,
    borderRadius: theme.borderRadius,
    gap: theme.space.medium,
    padding: theme.space.medium,
  },
  props.direction && {
    flexDirection: props.direction,
  },
  props.padding && {
    padding: theme.space[props.padding],
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
      borderRadius: theme.roundRadius,
      padding: theme.space.tiny,
    },
  ],
  {
    activeOpacity: 0.8,
  },
);
