import * as React from 'react';

import { Container, Content, LeftActions, Subtitle, Title } from './styles';

import { BackBtn } from '../back.btn';
import type { StringOrElement } from '@app/types/string.or.component';
import { StringRenderer } from '../string.renderer';
import type { StyleProp } from 'react-native/types';
import type { ViewStyle } from 'react-native';
import { useTheme } from '@app/lib/hooks/use.theme';

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
  return (
    <Container
      style={[withoutInsets && { paddingTop: theme.space.medium }, style]}
    >
      <LeftActions>
        {'withBack' in props && <BackBtn onPress={props.onPressBack} />}
      </LeftActions>
      <Content
        align={align}
        style={[
          'withBack' in props && {
            paddingHorizontal: 0,
          },
        ]}
      >
        <StringRenderer
          value={title}
          Container={Title}
          style={[titleSize === 'h1' && theme.typography.presets.h1]}
        />
        <StringRenderer value={subtitle} Container={Subtitle} />
      </Content>
      {rightActions}
    </Container>
  );
};
