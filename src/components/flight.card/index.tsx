import * as React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';

import type {
  Flight,
  UserArchivedFlightsQuery,
} from '@app/generated/server.gql';

import { format } from '@app/lib/format';
import { withStyled } from '@app/lib/styled';
import { DOT_SEPARATOR } from '@app/constants';
import { useTheme } from '@app/lib/hooks/use.theme';
import { FlightStatus } from '@app/generated/server.gql';
import { transformFlightData } from '@app/lib/transformers/transform.flight.data';

import { FaIcon } from '../icons.fontawesome';
import { DividerDashed } from '../divider.dashed';
import { AirlineLogoAvatar } from '../airline.logo.avatar';

type Props = {
  value: UserArchivedFlightsQuery['userArchivedFlights'][number];
};

export const FlightCard: React.FC<Props> = ({ value: { Flight } }) => {
  const theme = useTheme();
  const data = transformFlightData(Flight);
  const departureTime = data.origin.time;
  const arrivalTime = data.destination.time;
  const statusColor =
    data.origin.status === 'early' || data.origin.status === 'on-time'
      ? theme.pallette.success
      : data.origin.status === 'delayed'
        ? theme.pallette.warn
        : theme.pallette.danger;

  return (
    <Container>
      <Header>
        <AirlineContainer>
          <AirlineLogoAvatar airlineIata={Flight.airlineIata} size={25} />
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
          <ActiveDivider progressPercent={Flight.progressPercent} />
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
              color={statusColor}
              name="circle-arrow-up-right"
              size={20}
              solid
            />
          </MovementIconContainer>
          <MovementText color={statusColor}>
            {departureTime.format('LT')}
          </MovementText>
        </Movement>
        <Time>
          <TimeText bold>
            {Flight.status === FlightStatus.SCHEDULED ||
            Flight.status === FlightStatus.DELAYED
              ? format('Departed %s', departureTime.fromNow())
              : Flight.status === FlightStatus.ARRIVED ||
                  Flight.status === FlightStatus.ARCHIVED
                ? format('Arrived %s', arrivalTime.fromNow())
                : Flight.status === FlightStatus.CANCELED
                  ? format('Canceled %s', moment(Flight.updatedAt).fromNow())
                  : format('Land %s', arrivalTime.fromNow())}
          </TimeText>
          <TimeText>{DOT_SEPARATOR}</TimeText>
          <TimeText>{departureTime.format('MMM D')}</TimeText>
        </Time>
      </Footer>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  theme.presets.shadows[200],
  {
    backgroundColor: theme.pallette.grey[50],
    borderRadius: theme.borderRadius,
    gap: theme.space.small,
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.small,
  },
]);

const Header = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
  },
]);

const Body = withStyled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.medium,
    overflow: 'hidden',
  },
]);

const Footer = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    gap: theme.space.medium,
    justifyContent: 'space-between',
    paddingTop: theme.space.small,
  },
]);

const FlightPoint = withStyled<{ type: 'destination' | 'origin' }, typeof View>(
  View,
  (_, props) => [
    {
      flexBasis: 1,
      flexGrow: 1,
    },
    props.type === 'destination' && {
      alignItems: 'flex-end',
    },
  ],
);

const AirportIata = withStyled(Text, (theme) => [
  theme.typography.presets.h1,
  {
    color: theme.pallette.text,
  },
]);

const AirportCity = withStyled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    color: theme.pallette.textSecondary,
  },
]);

const DividerContainer = withStyled(View, (theme) => [
  {
    alignSelf: 'center',
    borderRadius: theme.roundRadius,
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingTop: theme.typography.presets.h1.fontSize / 2,
  },
]);

const ActiveDivider = withStyled<Pick<Flight, 'progressPercent'>, typeof View>(
  View,
  (theme, props) => [
    {
      alignSelf: 'center',
      backgroundColor: theme.pallette.active,
      height: 1,
      position: 'absolute',
    },
    {
      left: 0,
      width: `${props.progressPercent * 100}%`,
    },
  ],
);

const AirlineContainer = withStyled(View, (theme) => [
  {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);

const AirlineFlightNumber = withStyled(Text, (theme) => [
  {
    color: theme.pallette.textSecondary,
  },
]);

const Movement = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
  },
]);

const MovementText = withStyled<{ color: string }, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets.h3,
    {
      color: props.color || theme.pallette.text,
      fontWeight: 'bold',
    },
  ],
);

const MovementIconContainer = withStyled(View, () => [{}]);

const Time = withStyled(View, () => [
  {
    flexDirection: 'row',
  },
]);

const TimeText = withStyled<{ bold?: boolean }, typeof Text>(
  Text,
  (theme, props) => [
    {
      color: theme.pallette.textSecondary,
    },
    props.bold && {
      fontWeight: 'bold',
    },
  ],
);
