import * as React from 'react';

import { Background, Container, Content, Footer, Header } from './styles';

import { Button } from '@app/components/button';
import { FaIcon } from '@app/components/icons.fontawesome';
import { Logo } from '@app/components/logo';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import type { MainStackParam } from '@app/stacks';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Hero } from './hero';
import { RandomFlightBtn } from '@app/components/button.random.flight';
import type { FullFlightFragmentFragment } from '@app/generated/server.gql';

type Navigation = NativeStackNavigationProp<MainStackParam, 'Home'>;

export const HomeOnboardPage: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Navigation>();

  const handleAddFirstFlight = () => {
    vibrate('impactMedium');
    navigation.push('FlightSearchStack', {
      screen: 'Search',
      params: {},
    });
  };

  const handleRandomFlight = (flight: FullFlightFragmentFragment) => {
    navigation.push('FlightStack', {
      screen: 'Flight',
      params: {
        flightID: flight.id,
        isFromSearch: false,
      },
    });
  };

  return (
    <Container>
      <Background
        resizeMode="cover"
        resizeMethod="auto"
        source={require('./assets/background.png')}
      />
      <Header>
        <Logo type="light" />
        <RandomFlightBtn onFlight={handleRandomFlight} />
      </Header>
      <Content>
        <Hero />
      </Content>
      <Footer>
        <Button
          gap={theme.space.medium}
          size="large"
          onPress={handleAddFirstFlight}
          prefix={<FaIcon name="plus" color="#fff" />}
        >
          ADD YOUR FLIGHT
        </Button>
      </Footer>
    </Container>
  );
};
