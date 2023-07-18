import * as React from 'react';

import { Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import type { FullFlightFragmentFragment } from '@app/generated/server.gql';
import moment from 'moment';
import { styled } from '@app/lib/styled';

type Props = {
  flight: FullFlightFragmentFragment;
};

export const FlightPageTopHeader: React.FC<Props> = ({ flight }) => {
  return (
    <Container>
      <Flight>
        <AirlineLogoContainer>
          <FastImage
            source={{ uri: flight.airline.logoCompactImageURL }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </AirlineLogoContainer>
        <FlightMeta>
          <FlightNumber>
            {flight.airlineIata} {flight.flightNumber}
          </FlightNumber>
          <DepartureDate>
            {moment(flight.estimatedGateDeparture).format('LL')}
          </DepartureDate>
        </FlightMeta>
      </Flight>
    </Container>
  );
};

const Container = styled(View, () => [
  {
    flexDirection: 'row',
  },
]);

const Flight = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
    justifyContent: 'center',
  },
]);

const AirlineLogoContainer = styled(View, () => [
  {
    width: 30,
    height: undefined,
    aspectRatio: 1,
  },
]);

const FlightMeta = styled(View, () => []);

const FlightNumber = styled(Text, (theme) => [theme.typography.presets.h4]);

const DepartureDate = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.secondaryColor,
  },
]);
