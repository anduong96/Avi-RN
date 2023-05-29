import * as React from 'react';

import { Container, InitialsText } from './styles';
import type { StyleProp, ViewStyle } from 'react-native';

import { ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import { compact } from 'lodash';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  imageUri?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  size?: number;
  type?: 'fill' | 'outlined';
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
  renderContent?: () => React.ReactElement | undefined | null;
};

export const Avatar: React.FC<Props> = ({
  imageUri,
  firstName,
  lastName,
  size = 100,
  type = 'fill',
  backgroundColor,
  textColor,
  style,
  loading,
  renderContent,
}) => {
  const theme = useTheme();
  const [bgColor, color] =
    type === 'fill'
      ? [theme.pallette.grey[400], theme.pallette.white]
      : [theme.pallette.background, theme.typography.color];

  const Content = () => {
    const custom = renderContent?.();

    if (custom) {
      return custom;
    } else if (loading) {
      return <ActivityIndicator />;
    } else if (imageUri) {
      return (
        <FastImage
          source={{ uri: imageUri }}
          style={{ borderRadius: size, width: size, height: size }}
        />
      );
    } else {
      return (
        <InitialsText
          style={[
            {
              fontSize: size * 0.5,
              color: textColor || color,
            },
          ]}
        >
          {compact([firstName?.[0], lastName?.[0]]).join('') || '?'}
        </InitialsText>
      );
    }
  };

  return (
    <Container
      size={size}
      type={type}
      backgroundColor={backgroundColor}
      style={[
        {
          backgroundColor: backgroundColor || bgColor,
          borderColor: backgroundColor || bgColor,
        },
        style,
      ]}
    >
      <Content />
    </Container>
  );
};
