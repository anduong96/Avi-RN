import * as React from 'react';
import { Text, View } from 'react-native';

import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

import type { SpaceKeys } from '@app/themes';
import type { StringOrElement } from '@app/types/string.or.component';

import { withStyled } from '@app/lib/styled';

import { StringRenderer } from '../string.renderer';

type Props = {
  description?: StringOrElement;
  descriptionStyle?: StyleProp<TextStyle>;
  extra?: React.ReactNode | boolean | null;
  hasShadow?: boolean;
  horizontalPadding?: SpaceKeys;
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
  horizontalPadding,
  icon,
  style,
  title,
  titleStyle,
  verticalPadding,
}) => {
  return (
    <Container
      horizontalPadding={horizontalPadding}
      style={[style]}
      verticalPadding={verticalPadding}
    >
      <Body hasShadow={hasShadow}>
        {icon && <IconContainer>{icon}</IconContainer>}
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

const Container = withStyled<
  Pick<Props, 'horizontalPadding' | 'verticalPadding'>,
  typeof View
>(View, (theme, props) => [
  props.horizontalPadding && {
    paddingHorizontal: theme.space[props.horizontalPadding],
  },
  props.verticalPadding && {
    paddingVertical: theme.space[props.verticalPadding],
  },
]);

const IconContainer = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    height: undefined,
    minWidth: 20,
  },
]);

const Content = withStyled(View, () => ({
  alignItems: 'flex-start',
  flexGrow: 1,
  flexShrink: 1,
  gap: 2,
}));

const TitleText = withStyled(Text, (theme) => [
  theme.typography.presets.h3,
  {
    color: theme.pallette.text,
  },
]);

const DescriptionText = withStyled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.textSecondary,
  },
]);

const Body = withStyled<Pick<Props, 'hasShadow'>, typeof View>(
  View,
  (theme, props) => [
    {
      alignItems: 'center',
      flexDirection: 'row',
      flexGrow: 1,
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
