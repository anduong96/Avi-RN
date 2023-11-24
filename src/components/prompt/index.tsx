import * as React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';
import { BlurredBackground } from '@app/components/blurred/background';

import { Typography } from '../typography';
import { StringRenderer } from '../string.renderer';
import { LoadingOverlay } from '../loading.overlay';
import { VerticalDivider } from '../divider.vertical';
import { HorizontalDivider } from '../divider.horizontal';

type Props = {
  acceptStatus?: React.ComponentProps<typeof Typography>['color'];
  acceptText?: string;
  cancelStatus?: React.ComponentProps<typeof Typography>['color'];
  cancelText?: string;
  description?: string;
  hasAccept?: boolean;
  hasCancel?: boolean;
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
  hasAccept = true,
  hasCancel = true,
  onAccept,
  onCancel,
  onFinish,
  title,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAccept = async () => {
    setIsLoading(true);
    try {
      await onAccept?.();
    } catch (e) {
      logger.getSubLogger('Prompt').error('Failed onAccept');
      logger.error(e);
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
    <Container entering={FadeIn}>
      <BlurredBackground />
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
          {hasCancel && (
            <OptionBtn onPress={handleCancel}>
              <OptionText color={cancelStatus} isCentered>
                {cancelText}
              </OptionText>
            </OptionBtn>
          )}
          <VerticalDivider />
          {hasAccept && (
            <OptionBtn onPress={handleAccept}>
              <LoadingOverlay isLoading={isLoading} type="solid" />
              <OptionText color={acceptStatus} isCentered>
                {acceptText}
              </OptionText>
            </OptionBtn>
          )}
        </Actions>
      </Menu>
    </Container>
  );
};

const Container = withStyled(Animated.View, (theme) => [
  theme.presets.centered,
  StyleSheet.absoluteFillObject,
  {
    padding: theme.space.large,
  },
]);

const Menu = withStyled(View, (theme) => [
  {
    borderRadius: theme.borderRadius,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
]);

const Content = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.background,
    gap: theme.space.medium,
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
