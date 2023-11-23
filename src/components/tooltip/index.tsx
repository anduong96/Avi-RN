import * as React from 'react';
import { Pressable, View } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

import type { ViewStyle } from 'react-native';

import { Portal } from '@gorhom/portal';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';

import { AnimatedBlurredView } from '../blurred/view';

type Props = {
  children: React.ReactElement;
  content: React.ReactElement;
};

export const Tooltip: React.FC<Props> = ({ children, content }) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [style, setStyle] = React.useState<ViewStyle>();
  const ref = React.useRef<View>(null);

  const handleDisplay = () => {
    ref.current?.measureInWindow((x, y, width) => {
      setStyle({
        left: x + width + theme.space.medium,
        top: y,
      });
    });

    setVisible(true);
  };

  const handleHide = () => {
    setVisible(false);
    setStyle(undefined);
  };

  return (
    <>
      <Pressable onPress={handleDisplay} ref={ref}>
        {children}
      </Pressable>
      <Portal>
        {visible && (
          <Container
            blurType={theme.isDark ? 'dark' : 'xlight'}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            onTouchStart={handleHide}
          >
            <Content style={[style]}>{content}</Content>
          </Container>
        )}
      </Portal>
    </>
  );
};

const Container = withStyled(AnimatedBlurredView, () => ({
  bottom: 0,
  left: 0,
  position: 'absolute',
  right: 0,
  top: 0,
}));

const Content = withStyled(View, (theme) => ({
  backgroundColor: theme.pallette.background,
  borderRadius: theme.borderRadius,
  padding: theme.space.medium,
  ...theme.presets.shadows[200],
  maxWidth: 200,
}));
