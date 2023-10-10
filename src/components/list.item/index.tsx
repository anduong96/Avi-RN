import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import * as React from 'react';
import { Text, View } from 'react-native';

import type { SpaceKeys } from '@app/themes';
import type { StringOrElement } from '@app/types/string.or.component';

import { styled } from '@app/lib/styled';

import { StringRenderer } from '../string.renderer';

type Props = {
  description?: StringOrElement;
  descriptionStyle?: StyleProp<TextStyle>;
  extra?: React.ReactNode | boolean | null;
  hasShadow?: boolean;
  icon?: React.ReactElement | null;
  style?: StyleProp<ViewStyle>;
  title: StringOrElement;
  titleStyle?: StyleProp<TextStyle>;
  verticalPadding?: SpaceKeys;
};

export const ListItem: React.FC<Props> = ({
  description,
  descriptionStyle,
  extra,
  hasShadow,
  icon,
  style,
  title,
  titleStyle,
  verticalPadding,
}) => {
  return (
    <Container style={[style]} verticalPadding={verticalPadding}>
      <Body hasShadow={hasShadow}>
        <IconContainer>{icon}</IconContainer>
        <Content>
          <StringRenderer Container={TitleText} style={titleStyle}>
            {title}
          </StringRenderer>
          <StringRenderer Container={DescriptionText} style={descriptionStyle}>
            {description}
          </StringRenderer>
        </Content>
        {extra}
      </Body>
    </Container>
  );
};

const Container = styled<Pick<Props, 'verticalPadding'>, typeof View>(
  View,
  (theme, props) => [
    {
      paddingHorizontal: theme.space.large,
    },
    props.verticalPadding && {
      paddingVertical: theme.space[props.verticalPadding],
    },
  ],
);

const IconContainer = styled(View, (theme) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    height: undefined,
    minWidth: 20,
  },
]);

const Content = styled(View, (theme) => ({
  alignItems: 'flex-start',
  flexGrow: 1,
  flexShrink: 1,
  gap: theme.space.tiny,
}));

const TitleText = styled(Text, (theme) => [theme.typography.presets.h3]);

const DescriptionText = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.textSecondary,
  },
]);

const Body = styled<Pick<Props, 'hasShadow'>, typeof View>(
  View,
  (theme, props) => [
    {
      alignItems: 'center',
      flexDirection: 'row',
      gap: theme.space.medium,
      justifyContent: 'space-between',
    },
    props.hasShadow && [
      theme.presets.shadows[100],
      {
        backgroundColor: theme.pallette.background,
        borderRadius: theme.borderRadius,
        padding: theme.space.medium,
      },
    ],
  ],
);
