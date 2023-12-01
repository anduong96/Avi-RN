import type { StyleProp } from 'react-native/types';

import * as React from 'react';
import { Text, View } from 'react-native';

import type { ViewStyle } from 'react-native';

import { isNil } from 'lodash';

import type { StringOrElement } from '@app/types/string.or.component';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { BackBtn } from '../back.btn';
import { StringRenderer } from '../string.renderer';

type Props = {
  align?: 'center' | 'left';
  leftActions?: React.ReactElement;
  onPressBack?: () => void;
  rightActions?: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  subtitle?: StringOrElement;
  title?: StringOrElement;
  titleSize?: 'h1' | 'h2';
  withBack?: boolean;
  withoutInsets?: boolean;
};

export const PageHeader: React.FC<Props> = ({
  align = 'left',
  leftActions,
  rightActions,
  style,
  subtitle,
  title,
  titleSize,
  withoutInsets,
  ...props
}) => {
  const theme = useTheme();
  const withBack = 'withBack' in props;

  return (
    <Container style={[style]} withoutInsets={withoutInsets}>
      <Wrapper>
        <LeftActions align={align} isVisible={withBack || !isNil(leftActions)}>
          {withBack && <BackBtn onPress={props.onPressBack} />}
          {leftActions}
        </LeftActions>
        <Content align={align} style={[withBack && { paddingHorizontal: 0 }]}>
          <StringRenderer
            Container={Title}
            style={[titleSize === 'h1' && theme.typography.presets.h1]}
          >
            {title}
          </StringRenderer>
          <StringRenderer Container={Subtitle}>{subtitle}</StringRenderer>
        </Content>
        <RightActions align={align} isVisible={!isNil(rightActions)}>
          {rightActions}
        </RightActions>
      </Wrapper>
    </Container>
  );
};

const Container = withStyled<Pick<Props, 'withoutInsets'>, typeof View>(
  View,
  (theme, props) => [
    {
      flexDirection: 'row',
      paddingBottom: theme.space.medium,
      paddingTop: theme.insets.top || theme.space.medium,
    },
    props.withoutInsets && {
      paddingTop: theme.space.medium,
    },
  ],
);

const Wrapper = withStyled(View, () => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
]);

const Content = withStyled<Pick<Props, 'align'>, typeof View>(
  View,
  (theme, props) => [
    {
      flexGrow: 1,
      paddingHorizontal: theme.pagePadding,
    },
    props.align === 'center' && {
      alignItems: 'center',
    },
  ],
);

const Title = withStyled(Text, (theme) => [
  theme.typography.presets.h3,
  {
    color: theme.pallette.text,
    fontWeight: 'bold',
  },
]);

const Subtitle = withStyled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.textSecondary,
  },
]);

const RightActions = withStyled<
  Pick<Props, 'align'> & { isVisible?: boolean },
  typeof View
>(View, (theme, props) => [
  {
    paddingRight: theme.space.medium,
    zIndex: 1,
  },
  props.align === 'center' && {
    position: 'absolute',
    right: 0,
  },
  !props.isVisible && {
    display: 'none',
  },
]);

const LeftActions = withStyled<
  Pick<Props, 'align'> & { isVisible?: boolean },
  typeof View
>(View, (theme, props) => [
  {
    gap: theme.space.small,
    paddingLeft: theme.space.medium,
    zIndex: 1,
  },
  props.align === 'center' && {
    left: 0,
    position: 'absolute',
  },
  !props.isVisible && {
    display: 'none',
  },
]);
