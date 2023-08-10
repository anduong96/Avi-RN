import { styled } from '@app/lib/styled';
import * as React from 'react';

import {
  ActivityIndicator,
  View,
  type StyleProp,
  type ViewProps,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  loading?: boolean;
  children: () => React.ReactElement;
  style?: StyleProp<ViewProps>;
};

export const LoadingContainer: React.FC<Props> = ({ children, loading }) => {
  const [isMinReached, setIsMinReached] = React.useState(false);
  const loadingDerived = useDerivedValue(
    () => (isMinReached ? loading : true),
    [loading, isMinReached],
  );
  const spinnerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(loadingDerived.value ? 1 : 0, { duration: 300 }),
    zIndex: withDelay(
      250,
      withTiming(loadingDerived.value ? 1 : -1, {
        duration: 0,
      }),
    ),
  }));

  React.useEffect(() => {
    setTimeout(() => {
      setIsMinReached(true);
    }, 300);
  }, []);

  return (
    <Container>
      <Spinner style={[spinnerStyle]}>
        <ActivityIndicator />
      </Spinner>
      <Content>{children()}</Content>
    </Container>
  );
};

const Container = styled(View, () => [
  {
    flexGrow: 1,
  },
]);

const Spinner = styled(Animated.View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.background,
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
]);

const Content = styled(View, () => [
  {
    flexGrow: 1,
  },
]);
