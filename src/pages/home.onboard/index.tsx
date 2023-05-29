import * as React from 'react';

import { Background, Container, Content, Footer, Header } from './styles';

import { Button } from '@app/components/button';
import { FaIcon } from '@app/components/icons.fontawesome';
import { Hero } from './hero';
import { Logo } from '@app/components/logo';
import type { MainStackParam } from '@app/stacks';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<MainStackParam, 'Home'>;

export const HomeOnboardPage: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<Navigation>();

  const handleAddFirstFlight = () => {
    vibrate('impactMedium');
    navigation.push('FlightSearchStack', {
      screen: 'Search',
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
      </Header>
      <Content>
        <Hero />
      </Content>
      <Footer>
        <Button
          size="large"
          onPress={handleAddFirstFlight}
          prefix={
            <View style={{ marginRight: theme.space.medium }}>
              <FaIcon name="plus" color="#fff" />
            </View>
          }
        >
          ADD YOUR FLIGHT
        </Button>
      </Footer>
    </Container>
  );
};
