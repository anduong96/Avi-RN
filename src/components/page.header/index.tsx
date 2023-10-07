import * as React from 'react';

import { useTheme } from '@app/lib/hooks/use.theme';
import { styled } from '@app/lib/styled';
import type { StringOrElement } from '@app/types/string.or.component';
import type { ViewStyle } from 'react-native';
import { Text, View } from 'react-native';
import { type StyleProp } from 'react-native/types';
import { BackBtn } from '../back.btn';
import { StringRenderer } from '../string.renderer';
import { isNil } from 'lodash';

type Props = {
  style?: StyleProp<ViewStyle>;
  title?: StringOrElement;
  subtitle?: StringOrElement;
  rightActions?: React.ReactElement;
  withoutInsets?: boolean;
  titleSize?: 'h1' | 'h2';
  align?: 'left' | 'center';
} & (
  | {
      leftActions?: React.ReactElement;
    }
  | {
      withBack?: boolean;
      onPressBack?: () => void;
    }
);

export const PageHeader: React.FC<Props> = ({
  title,
  subtitle,
  withoutInsets,
  titleSize,
  align = 'left',
  rightActions,
  style,
  ...props
}) => {
  const theme = useTheme();
  const withBack = 'withBack' in props;

  return (
    <Container withoutInsets={withoutInsets} style={[style]}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <LeftActions isVisible={withBack} align={align}>
          {withBack && <BackBtn onPress={props.onPressBack} />}
        </LeftActions>
        <Content align={align} style={[withBack && { paddingHorizontal: 0 }]}>
          <StringRenderer
            value={title}
            Container={Title}
            style={[titleSize === 'h1' && theme.typography.presets.h1]}
          />
          <StringRenderer value={subtitle} Container={Subtitle} />
        </Content>
        <RightActions isVisible={!isNil(rightActions)} align={align}>
          {rightActions}
        </RightActions>
      </View>
    </Container>
  );
};

const Container = styled<Pick<Props, 'withoutInsets'>, typeof View>(
  View,
  (theme, props) => [
    {
      paddingTop: theme.insets.top || theme.space.medium,
      paddingBottom: theme.space.medium,
      flexDirection: 'row',
    },
    props.withoutInsets && {
      paddingTop: theme.space.medium,
    },
  ],
);

const Content = styled<Pick<Props, 'align'>, typeof View>(
  View,
  (theme, props) => [
    {
      flexGrow: 1,
      paddingHorizontal: theme.space.medium,
    },
    props.align === 'center' && {
      alignItems: 'center',
    },
  ],
);

const Title = styled(Text, (theme) => ({
  ...theme.typography.presets.h2,
  fontWeight: 'bold',
}));

const Subtitle = styled(Text, (theme) => ({
  ...theme.typography.presets.p2,
  color: theme.typography.secondaryColor,
}));

const RightActions = styled<
  Pick<Props, 'align'> & { isVisible?: boolean },
  typeof View
>(View, (theme, props) => [
  {
    zIndex: 1,
    paddingRight: theme.space.medium,
  },
  props.align === 'center' && {
    position: 'absolute',
    right: 0,
  },
  !props.isVisible && {
    display: 'none',
  },
]);

const LeftActions = styled<
  Pick<Props, 'align'> & { isVisible?: boolean },
  typeof View
>(View, (theme, props) => [
  {
    zIndex: 1,
    paddingLeft: theme.space.medium,
  },
  props.align === 'center' && {
    position: 'absolute',
    left: 0,
  },
  !props.isVisible && {
    display: 'none',
  },
]);
