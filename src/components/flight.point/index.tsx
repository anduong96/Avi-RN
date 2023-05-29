import * as React from 'react';

import {
  Airline,
  AirlineIata,
  AirlineLocation,
  Container,
  DateText,
  Footer,
} from './styles';
import type { StyleProp, TextStyle } from 'react-native';

import moment from 'moment';
import { useAirportQuery } from '@app/generated/server.gql';

type Props = {
  airportIata: string;
  date: Date;
  timezone: string;
  type: 'origin' | 'destination';
};

export const FlightPoint: React.FC<Props> = ({
  airportIata,
  date,
  timezone,
  type,
}) => {
  const isDestination = type === 'destination';
  const alignStyle: StyleProp<TextStyle> = [
    isDestination && { textAlign: 'right' },
  ];
  const query = useAirportQuery({
    fetchPolicy: 'cache-first',
    variables: {
      iata: airportIata,
    },
  });

  if (!query.data) {
    return null;
  }

  const airport = query.data.airport;

  return (
    <Container>
      <Airline>
        <AirlineLocation style={[alignStyle]}>
          {airport.cityName}, {airport.countryCode}
        </AirlineLocation>
        <AirlineIata style={[alignStyle]}>{airportIata}</AirlineIata>
      </Airline>
      <Footer style={[isDestination && { flexDirection: 'row-reverse' }]}>
        <DateText style={[alignStyle]}>
          {moment(date).tz(timezone).format('LT')}
        </DateText>
      </Footer>
    </Container>
  );
};
