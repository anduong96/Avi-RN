import * as React from 'react';

import {
  Container,
  Content,
  LeftActions,
  RightActions,
  Subtitle,
  Title,
} from './styles';

import { useTheme } from '@app/lib/hooks/use.theme';
import type { StringOrElement } from '@app/types/string.or.component';
import type { ViewStyle } from 'react-native';
import { type StyleProp } from 'react-native/types';
import { BackBtn } from '../back.btn';
import { StringRenderer } from '../string.renderer';

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
      <LeftActions
        style={[align === 'center' && { position: 'absolute', left: 0 }]}
      >
        {'withBack' in props && <BackBtn onPress={props.onPressBack} />}
      </LeftActions>
      <Content
        withoutInsets={withoutInsets}
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
      <RightActions
        style={[align === 'center' && { position: 'absolute', right: 0 }]}
      >
        {rightActions}
      </RightActions>
    </Container>
  );
};
