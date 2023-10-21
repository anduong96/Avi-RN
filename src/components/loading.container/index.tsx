import type { StyleProp, ViewProps } from 'react-native';

import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';

type Props = {
  children: () => React.ReactElement;
  loading?: boolean;
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

const Container = withStyled(View, () => [
  {
    flexGrow: 1,
  },
]);

const Spinner = withStyled(Animated.View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.background,
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
]);

const Content = withStyled(View, () => [
  {
    flexGrow: 1,
  },
]);
