import * as React from 'react';

import { Container, Meta, Subtitle, Title } from './styles';
import type { StyleProp, ViewStyle } from 'react-native';
import {
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { Spinner } from '../spinner';
import type { StringOrElement } from '@app/types/string.or.component';
import { StringRenderer } from '../string.renderer';
import { useIsDarkMode } from '@app/lib/hooks/use.color.scheme';

type Props = {
  bounce?: boolean;
  isLoading: boolean;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  blur?: boolean;
  title?: StringOrElement;
  subtitle?: StringOrElement;
};

export const SpinnerFull: React.FC<Props> = ({
  bounce,
  isLoading,
  style,
  delay = 200,
  blur,
  title,
  subtitle,
}) => {
  const isDarkMode = useIsDarkMode();
  const delayShared = useDerivedValue(() => delay, [delay]);
  const visibilityStyle = useAnimatedStyle(() => {
    return {
      height: !isLoading ? withDelay(delayShared.value, withTiming(0)) : '100%',
      opacity: !isLoading
        ? withDelay(
            delayShared.value,
            withTiming(0, {
              duration: 200,
            }),
          )
        : 1,
    };
  }, [isLoading]);

  return (
    <Container
      blurAmount={blur ? 7 : 100}
      //TODO: support dark mode
      blurType={isDarkMode ? 'light' : 'light'}
      style={[visibilityStyle, style]}
    >
      <Spinner animated={bounce} />
      <Meta>
        {title && <StringRenderer value={title} Container={Title} />}
        {subtitle && <StringRenderer value={subtitle} Container={Subtitle} />}
      </Meta>
    </Container>
  );
};
