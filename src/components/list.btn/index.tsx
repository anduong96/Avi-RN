import * as React from 'react';

import { Body, Container, Content, IconContainer, TitleText } from './styles';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { StringOrElement } from '@app/types/string.or.component';
import { StringRenderer } from '../string.renderer';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  icon?: React.ReactElement | null;
  title: StringOrElement;
  style?: StyleProp<ViewStyle>;
  extra?: React.ReactElement | null | boolean;
  padding?: 'medium' | 'small';
  titleStyle?: StyleProp<TextStyle>;
  shadow?: boolean;
};

export const ListBtn: React.FC<Props> = ({
  icon,
  title,
  style,
  extra,
  padding,
  titleStyle,
  shadow,
}) => {
  const theme = useTheme();
  return (
    <Container
      style={[
        style,
        padding === 'medium' && { padding: theme.space.medium },
        padding === 'small' && { padding: theme.space.small },
      ]}
    >
      <Body shadow={shadow}>
        <IconContainer>{icon}</IconContainer>
        <Content>
          <StringRenderer
            value={title}
            Container={TitleText}
            style={titleStyle}
          />
        </Content>
        {extra}
      </Body>
    </Container>
  );
};
