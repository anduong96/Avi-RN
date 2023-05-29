import * as React from 'react';

import { Container, Content } from './styles';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import type { View, ViewStyle } from 'react-native';

import { Portal } from '@gorhom/portal';
import { Pressable } from 'react-native';
import { useIsDarkMode } from '@app/lib/hooks/use.color.scheme';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  children: React.ReactElement;
  content: React.ReactElement;
};

export const Tooltip: React.FC<Props> = ({ children, content }) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(false);
  const [style, setStyle] = React.useState<ViewStyle>();
  const isDark = useIsDarkMode();
  const ref = React.useRef<View>(null);

  const handleDisplay = () => {
    ref.current?.measureInWindow((x, y, width, _height) => {
      setStyle({
        top: y,
        left: x + width + theme.space.medium,
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
      <Pressable ref={ref} onPress={handleDisplay}>
        {children}
      </Pressable>
      <Portal>
        {visible && (
          <Container
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
            blurType={isDark ? 'dark' : 'xlight'}
            onTouchStart={handleHide}
          >
            <Content style={[style]}>{content}</Content>
          </Container>
        )}
      </Portal>
    </>
  );
};
