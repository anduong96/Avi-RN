import * as React from 'react';

import {
  AirlineContainer,
  AirlineFlightNumber,
  AirportCity,
  AirportIata,
  Body,
  Container,
  DividerContainer,
  FlightPoint,
  Footer,
  Header,
  Movement,
  MovementIconContainer,
  MovementText,
  Time,
  TimeText,
} from './styles';

import { AirlineLogo } from '../airline.logo';
import { DOT_SEPARATOR } from '@app/constants';
import DashedLine from 'react-native-dashed-line';
import { FaIcon } from '../icons.fontawesome';
import type { GetUserFlightsQuery } from '@app/generated/server.gql';
import moment from 'moment';
import { useTheme } from '@app/lib/hooks/use.theme';

type Props = {
  value: GetUserFlightsQuery['userFlights'][number];
};

export const FlightCard: React.FC<Props> = ({ value: { flight } }) => {
  const theme = useTheme();

  return (
    <Container>
      <Header>
        <AirlineContainer>
          <AirlineLogo
            iata={flight.airlineIata}
            type="compact"
            width={15}
            height={15}
          />
          <AirlineFlightNumber>
            {flight.airlineIata} {flight.flightNumber}
          </AirlineFlightNumber>
        </AirlineContainer>
      </Header>
      <Body>
        <FlightPoint type="origin">
          <AirportIata>{flight.origin.iata}</AirportIata>
          <AirportCity>{flight.origin.cityName}</AirportCity>
        </FlightPoint>
        <DividerContainer>
          <DashedLine dashLength={2} dashColor={theme.pallette.grey[200]} />
        </DividerContainer>
        <FlightPoint type="destination">
          <AirportIata>{flight.destination.iata}</AirportIata>
          <AirportCity>{flight.destination.cityName}</AirportCity>
        </FlightPoint>
      </Body>
      <Footer>
        {/* TODO: Change depend on state */}
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
        <Time>
          <TimeText bold>
            {moment(flight.estimatedGateDeparture).fromNow()}
          </TimeText>
          <TimeText>{DOT_SEPARATOR}</TimeText>
          <TimeText>
            {moment(flight.estimatedGateDeparture).format('MMM D')}
          </TimeText>
        </Time>
      </Footer>
    </Container>
  );
};
