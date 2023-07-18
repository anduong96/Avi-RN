import * as React from 'react';

import Animated, { FadeIn } from 'react-native-reanimated';
import { Text, View } from 'react-native';

import { Button } from '@app/components/button';
import type { FlightSearchStackParams } from '@app/stacks/flight.search.stack';
import Lottie from 'lottie-react-native';
import type { MainStackParam } from '@app/stacks';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styled } from '@app/lib/styled';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@app/lib/hooks/use.theme';

type Navigation = NativeStackNavigationProp<FlightSearchStackParams, 'Confirm'>;
type ParentNavigation = NativeStackNavigationProp<MainStackParam, 'Home'>;

const delay = 500;

export const ConfirmDisplay: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Navigation>();
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      if (!showContent) {
        setShowContent(true);
      }
    }, delay);
  }, [showContent, setShowContent]);

  const handleExit = () => {
    const parent = navigation.getParent() as ParentNavigation;
    parent.goBack();
  };

  if (!showContent) {
    return null;
  }

  return (
    <Container>
      <Header entering={FadeIn.delay(1.5 * 1000)}>
        <Title>Flight saved</Title>
      </Header>
      <Content>
        <Lottie
          autoPlay
          loop={false}
          style={{ width: 200, height: 200 }}
          source={require('./assets/success.json')}
        />
      </Content>
      <Actions entering={FadeIn.delay(1.5 * 1000)}>
        <Button
          style={[{ backgroundColor: theme.pallette.active }]}
          onPress={handleExit}
        >
          Exit
        </Button>
      </Actions>
    </Container>
  );
};

const Container = styled(View, () => [
  {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
  },
]);

const Header = styled(Animated.View, (theme) => [
  theme.presets.centered,
  {
    padding: theme.space.large,
    paddingTop: theme.space.large + theme.insets.top,
  },
]);

const Title = styled(Text, (theme) => [
  theme.typography.presets.h1,
  {
    color: theme.pallette.white,
    fontWeight: 'bold',
  },
]);

const Content = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexGrow: 1,
    gap: theme.space.large,
  },
]);

const Actions = styled(Animated.View, (theme) => [
  {
    justifyContent: 'center',
    paddingBottom: theme.insets.bottom + theme.space.medium,
    paddingHorizontal: theme.space.medium,
  },
]);
