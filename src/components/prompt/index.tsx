import * as React from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { BlurView } from '@react-native-community/blur';

import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { Typography } from '../typography';
import { StringRenderer } from '../string.renderer';
import { LoadingOverlay } from '../loading.overlay';

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
          <StringRenderer Container={Typography} isBold type="h2">
            {title}
          </StringRenderer>
          <StringRenderer Container={Typography} type="h3">
            {description}
          </StringRenderer>
        </Content>
        <Divider type="horizontal" />
        <Actions>
          <OptionBtn onPress={handleCancel}>
            <OptionText status={cancelStatus}>{cancelText}</OptionText>
          </OptionBtn>
          <Divider type="vertical" />
          <OptionBtn onPress={handleAccept}>
            <LoadingOverlay isLoading={isLoading} type="solid" />
            <OptionText isBold status={acceptStatus}>
              {acceptText}
            </OptionText>
          </OptionBtn>
        </Actions>
      </Menu>
    </Container>
  );
};

const Container = styled(
  Animated.createAnimatedComponent(BlurView),
  (theme) => [
    theme.presets.centered,
    StyleSheet.absoluteFillObject,
    {
      padding: theme.space.large,
    },
  ],
);

const Menu = styled(View, (theme) => [
  {
    borderRadius: theme.space.medium,
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
]);

const Content = styled(View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.background,
    padding: theme.space.large,
  },
]);

const Actions = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
  },
]);

const OptionBtn = styled(
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

const OptionText = styled(Typography, undefined, {
  type: 'p2',
});

const Divider = styled<{ type: 'horizontal' | 'vertical' }, typeof View>(
  View,
  (theme, props) => [
    {
      backgroundColor: theme.pallette.dividerColor,
    },
    props.type === 'horizontal' && {
      height: 1,
    },
    props.type === 'vertical' && {
      height: '100%',
      width: 1,
    },
  ],
);
