import * as React from 'react';

import {
  Airline,
  AirlineLogoContainer,
  AirlineNameText,
  Body,
  Container,
  Divider,
  FlightNumberText,
  Header,
  Item,
  Journey,
} from './styles';

import FastImage from 'react-native-fast-image';
import { FlightPoint } from '../flight.point';
import { useAirlineQuery } from '@app/generated/server.gql';

type Point = Pick<
  React.ComponentProps<typeof FlightPoint>,
  'airportIata' | 'date' | 'timezone'
>;

type Props = {
  flightNumber: string;
  airlineIata: string;
  origin: Point;
  destination: Point;
};

export const FlightCard: React.FC<Props> = ({
  origin,
  destination,
  airlineIata,
  flightNumber,
}) => {
  const airlineQuery = useAirlineQuery({
    fetchPolicy: 'cache-first',
    variables: {
      iata: airlineIata,
    },
  });

  return (
    <Container>
      <Header>
        {airlineQuery.data && (
          <>
            <AirlineLogoContainer>
              <FastImage
                style={{
                  width: 25,
                  height: undefined,
                  aspectRatio: 1,
                }}
                source={{
                  uri: airlineQuery.data.airline.logoCompactImageURL,
                }}
              />
            </AirlineLogoContainer>
            <Airline>
              <FlightNumberText>
                {airlineIata} {flightNumber}
              </FlightNumberText>
              <AirlineNameText>
                {airlineQuery.data.airline.name}
              </AirlineNameText>
            </Airline>
          </>
        )}
      </Header>
      <Body>
        <Item>
          <FlightPoint
            type="origin"
            date={origin.date}
            timezone={origin.timezone}
            airportIata={origin.airportIata}
          />
        </Item>
        <Journey>
          <Divider />
        </Journey>
        <Item>
          <FlightPoint
            type="destination"
            date={destination.date}
            timezone={destination.timezone}
            airportIata={destination.airportIata}
          />
        </Item>
      </Body>
    </Container>
  );
};
