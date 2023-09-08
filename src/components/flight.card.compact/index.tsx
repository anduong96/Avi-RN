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

import { DividerDashed } from '../divider.dashed';
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
  flight: FindFlightsQuery['flights'][number];
  onPress?: () => void;
};

export const FlightCardCompact: React.FC<Props> = ({ flight, onPress }) => {
  const theme = useTheme();
  const canPress = !isNil(onPress);
  const departure = moment
    .utc(flight.estimatedGateDeparture)
    .tz(flight.Origin.timezone);

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
          <AirportIata>{flight.Origin.iata}</AirportIata>
          <AirportCity>{flight.Origin.cityName}</AirportCity>
        </FlightPoint>
        <DividerContainer>
          <DividerDashed />
        </DividerContainer>
        <FlightPoint type="destination">
          <AirportIata>{flight.Destination.iata}</AirportIata>
          <AirportCity>{flight.Destination.cityName}</AirportCity>
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
          <MovementText>{departure.format('LT')}</MovementText>
        </Movement>
        <Actions>
          <FaIcon
            size={12}
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
    alignItems: 'center',
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
