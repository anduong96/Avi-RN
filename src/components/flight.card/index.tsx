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

import { DOT_SEPARATOR } from '@app/constants';
import type { GetUserArchivedFlightsQuery } from '@app/generated/server.gql';
import { useTheme } from '@app/lib/hooks/use.theme';
import moment from 'moment';
import { AirlineLogoAvatar } from '../airline.logo.avatar';
import { DividerDashed } from '../divider.dashed';
import { FaIcon } from '../icons.fontawesome';

type Props = {
  value: GetUserArchivedFlightsQuery['userArchivedFlights'][number];
};

export const FlightCard: React.FC<Props> = ({ value: { Flight } }) => {
  const theme = useTheme();
  const departure = moment
    .utc(Flight.estimatedGateDeparture)
    .tz(Flight.Origin.timezone);

  return (
    <Container>
      <Header>
        <AirlineContainer>
          <AirlineLogoAvatar size={20} airlineIata={Flight.airlineIata} />
          <AirlineFlightNumber>
            {Flight.airlineIata} {Flight.flightNumber}
          </AirlineFlightNumber>
        </AirlineContainer>
      </Header>
      <Body>
        <FlightPoint type="origin">
          <AirportIata>{Flight.Origin.iata}</AirportIata>
          <AirportCity>{Flight.Origin.cityName}</AirportCity>
        </FlightPoint>
        <DividerContainer>
          <DividerDashed />
        </DividerContainer>
        <FlightPoint type="destination">
          <AirportIata>{Flight.Destination.iata}</AirportIata>
          <AirportCity>{Flight.Destination.cityName}</AirportCity>
        </FlightPoint>
      </Body>
      <Footer>
        <Movement>
          <MovementIconContainer>
            <FaIcon
              size={20}
              name="arrow-circle-up"
              color={theme.pallette.successLight}
            />
          </MovementIconContainer>
          <MovementText>{departure.format('LT')}</MovementText>
        </Movement>
        <Time>
          <TimeText bold>{departure.fromNow()}</TimeText>
          <TimeText>{DOT_SEPARATOR}</TimeText>
          <TimeText>{departure.format('MMM D')}</TimeText>
        </Time>
      </Footer>
    </Container>
  );
};
