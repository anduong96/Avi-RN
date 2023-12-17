import * as React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { withStyled } from '@app/lib/styled';
import { useLogger } from '@app/lib/logger/use.logger';
import { BlurredBackground } from '@app/components/blurred/background';

import { List } from '../list';
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
  const logger = useLogger('Prompt');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAccept = async () => {
    setIsLoading(true);

    try {
      logger.debug('Calling onAccept');
      await onAccept?.();
    } catch (e) {
      logger.error('Failed onAccept');
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
        <LoadingOverlay isLoading={isLoading} type="translucent" />
        <Content>
          <StringRenderer Container={Typography} isBold isCentered type="h2">
            {title}
          </StringRenderer>
          <StringRenderer Container={Typography} isCentered type="h3">
            {description}
          </StringRenderer>
        </Content>
        <HorizontalDivider size={0} />
        <Actions>
          <List
            data={[
              {
                color: cancelStatus,
                onPress: handleCancel,
                text: cancelText,
                visible: hasCancel,
              },
              {
                color: acceptStatus,
                onPress: handleAccept,
                text: acceptText,
                visible: hasAccept,
              },
            ]}
            horizontal
            renderItem={(item) => {
              if (!item.visible) {
                return null;
              }

              return (
                <OptionBtn onPress={item.onPress}>
                  <OptionText color={item.color} isCentered>
                    {item.text}
                  </OptionText>
                </OptionBtn>
              );
            }}
            separator={() => <VerticalDivider size={1} />}
          />
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
