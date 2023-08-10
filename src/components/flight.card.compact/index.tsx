import * as React from 'react';

import {
  AirportCity,
  AirportIata,
  DividerContainer,
  FlightPoint,
  Movement,
  MovementIconContainer,
  MovementText,
} from '../flight.card/styles';

import { FaIcon } from '../icons.fontawesome';
import type { FindFlightsQuery } from '@app/generated/server.gql';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { isNil } from 'lodash';
import moment from 'moment';
import { styled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Props = {
  flight: FindFlightsQuery['findFlights'][number];
  onPress?: () => void;
};

export const FlightCardCompact: React.FC<Props> = ({ flight, onPress }) => {
  const theme = useTheme();
  const canPress = !isNil(onPress);

  const handlePress = () => {
    if (!canPress) {
      return;
    }

    vibrate('impactMedium');
    onPress?.();
  };

  return (
    <Container onPress={handlePress} disabled={!canPress}>
      <Main>
        <FlightPoint type="origin">
          <AirportIata>{flight.origin.iata}</AirportIata>
          <AirportCity>{flight.origin.cityName}</AirportCity>
        </FlightPoint>
        <DividerContainer>
          {/* <DashedLine dashLength={5} dashColor={theme.pallette.grey[200]} /> */}
        </DividerContainer>
        <FlightPoint type="destination">
          <AirportIata>{flight.destination.iata}</AirportIata>
          <AirportCity>{flight.destination.cityName}</AirportCity>
        </FlightPoint>
      </Main>
      <Footer>
        <Movement>
          <MovementIconContainer>
            <FaIcon
              size={20}
              name="arrow-circle-up"
              color={theme.pallette.successLight}
            />
          </MovementIconContainer>
          <MovementText>
            {moment(flight.estimatedGateDeparture).format('LT')}
          </MovementText>
        </Movement>
        <Actions>
          <FaIcon
            size={20}
            name="chevron-right"
            color={theme.pallette.active}
          />
        </Actions>
      </Footer>
    </Container>
  );
};

const Container = styled(TouchableOpacity, (theme) => [
  theme.presets.shadows[100],
  {
    gap: theme.space.medium,
    backgroundColor: theme.pallette.background,
    borderRadius: theme.borderRadius,
    paddingVertical: theme.space.small,
    paddingHorizontal: theme.space.medium,
  },
]);

const Main = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
    overflow: 'hidden',
  },
]);

const Footer = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
  },
]);

const Actions = styled(View, () => [
  {
    flexGrow: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
]);
