import * as React from 'react';

import { Container, Subtitle, Title } from './styles';

import { Text } from 'react-native';

export const Hero: React.FC = () => {
  return (
    <Container>
      <Title>
        Fly with <Text style={{ fontWeight: '800' }}>Confidence</Text>
      </Title>
      <Subtitle>
        Enhancing your journey from takeoff to landing with advance monitoring
        and expert guidance
      </Subtitle>
    </Container>
  );
};
