import * as React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { Typography } from '../typography';
import { StringRenderer } from '../string.renderer';
import { LoadingOverlay } from '../loading.overlay';
import { VerticalDivider } from '../divider.vertical';
import { HorizontalDivider } from '../divider.horizontal';

type Props = {
  acceptStatus?: React.ComponentProps<typeof Typography>['status'];
  acceptText?: string;
  cancelStatus?: React.ComponentProps<typeof Typography>['status'];
  cancelText?: string;
  description?: string;
  onAccept?: () => Promise<void> | void;
  onCancel?: () => void;
  onFinish?: () => void;
  title?: string;
};

export const Prompt: React.FC<Props> = ({
  acceptStatus,
  acceptText = 'Proceed',
  cancelStatus,
  cancelText = 'Cancel',
  description = 'Are you sure you want to proceed?',
  onAccept,
  onCancel,
  onFinish,
  title,
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await onAccept?.();
    } finally {
      setIsLoading(false);
    }
    onFinish?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onFinish?.();
  };

  return (
    <Container
      blurAmount={10}
      blurType={theme.isDark ? 'dark' : 'light'}
      entering={FadeIn}
    >
      <Menu>
        <Content>
          <StringRenderer Container={Typography} isBold isCentered type="h2">
            {title}
          </StringRenderer>
          <StringRenderer Container={Typography} isCentered type="h3">
            {description}
          </StringRenderer>
        </Content>
        <HorizontalDivider />
        <Actions>
          <OptionBtn onPress={handleCancel}>
            <OptionText isCentered status={cancelStatus}>
              {cancelText}
            </OptionText>
          </OptionBtn>
          <VerticalDivider />
          <OptionBtn onPress={handleAccept}>
            <LoadingOverlay isLoading={isLoading} type="solid" />
            <OptionText isCentered status={acceptStatus}>
              {acceptText}
            </OptionText>
          </OptionBtn>
        </Actions>
      </Menu>
    </Container>
  );
};

const Container = withStyled(
  Animated.createAnimatedComponent(BlurView),
  (theme) => [
    theme.presets.centered,
    StyleSheet.absoluteFillObject,
    {
      padding: theme.space.large,
    },
  ],
);

const Menu = withStyled(View, (theme) => [
  {
    borderRadius: theme.space.medium,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
]);

const Content = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.background,
    padding: theme.space.large,
  },
]);

const Actions = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
  },
]);

const OptionBtn = withStyled(
  TouchableOpacity,
  (theme) => [
    theme.presets.centered,
    {
      backgroundColor: theme.pallette.background,
      flexBasis: 1,
      flexGrow: 1,
      padding: theme.space.medium,
    },
  ],
  {
    activeOpacity: 0.8,
  },
);

const OptionText = withStyled(Typography, undefined, {
  type: 'p2',
});
