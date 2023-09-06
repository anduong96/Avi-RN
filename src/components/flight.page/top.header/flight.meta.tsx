import * as React from 'react';

import { Text, View } from 'react-native';

import { DOT_SEPARATOR } from '@app/constants';
import FastImage from 'react-native-fast-image';
import type { FullFlightFragmentFragment } from '@app/generated/server.gql';
import moment from 'moment';
import { styled } from '@app/lib/styled';

type Props = {
  flight: Pick<
    FullFlightFragmentFragment,
    'flightNumber' | 'airline' | 'airlineIata' | 'estimatedGateDeparture'
  >;
};

export const FlightMeta: React.FC<Props> = ({
  flight: { flightNumber, airline, airlineIata, estimatedGateDeparture },
}) => {
  return (
    <Container>
      <AirlineLogo source={{ uri: airline.logoCompactImageURL }} />
      <Airline>
        <AirlineName>{airline.name}</AirlineName>
        <Ticket>
          <FlightNumber>
            <FlightText style={{ fontWeight: 'bold' }}>
              {airlineIata}
            </FlightText>
            <FlightText>{flightNumber}</FlightText>
          </FlightNumber>
          <FlightText>{DOT_SEPARATOR}</FlightText>
          <FlightText>{moment(estimatedGateDeparture).fromNow()}</FlightText>
        </Ticket>
      </Airline>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.small,
  },
]);

const FlightNumber = styled(View, () => [
  {
    flexDirection: 'row',
    gap: 2,
  },
]);

const FlightText = styled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.typography.secondaryColor,
  },
]);

const Ticket = styled(View, () => [
  {
    flexDirection: 'row',
    alignItems: 'center',
  },
]);

const AirlineLogo = styled(FastImage, () => [
  {
    height: 50,
    width: undefined,
    aspectRatio: 1,
  },
]);

const Airline = styled(View, () => [
  {
    flexDirection: 'column',
    justifyContent: 'center',
  },
]);

const AirlineName = styled(Text, (theme) => [
  theme.typography.presets.h3,
  {
    lineHeight: undefined,
  },
]);
