import * as React from 'react';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { StringOrElement } from '@app/types/string.or.component';
import { StringRenderer } from '../string.renderer';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Text, View } from 'react-native';
import { styled } from '@app/lib/styled';

type Props = {
  icon?: React.ReactElement | null;
  title: StringOrElement;
  description?: StringOrElement;
  style?: StyleProp<ViewStyle>;
  extra?: React.ReactNode | null | boolean;
  padding?: 'medium' | 'small';
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  shadow?: boolean;
};

export const ListItem: React.FC<Props> = ({
  icon,
  title,
  description,
  style,
  extra,
  padding,
  titleStyle,
  shadow,
  descriptionStyle,
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
          <StringRenderer
            value={description}
            Container={DescriptionText}
            style={descriptionStyle}
          />
        </Content>
        {extra}
      </Body>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  {
    paddingHorizontal: theme.space.medium,
  },
]);

const IconContainer = styled(View, (theme) => [
  theme.presets.centered,
  {
    width: 20,
    height: undefined,
    aspectRatio: 1,
  },
]);

const Content = styled(View, () => ({
  flexGrow: 1,
  gap: 2,
}));

const TitleText = styled(Text, (theme) => [theme.typography.presets.p1]);

const DescriptionText = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.secondaryColor,
  },
]);

const Body = styled<Pick<Props, 'shadow'>, typeof View>(
  View,
  (theme, props) => [
    {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: theme.space.medium,
    },
    props.shadow && [
      theme.presets.shadows[100],
      {
        padding: theme.space.medium,
        borderRadius: theme.borderRadius,
        backgroundColor: theme.pallette.background,
      },
    ],
  ],
);
