import * as React from 'react';
import { Text, View } from 'react-native';

import { isNil } from 'lodash';

import type { transformFlightData } from '@app/lib/transformers/transform.flight.data';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';

type Props = ReturnType<typeof transformFlightData>['origin'] & {
  type: 'destination' | 'origin';
};

const FILLER = '--' as const;

export const FlightPageLocationSection: React.FC<Props> = ({
  airport,
  baggageClaim,
  dayDiff,
  gate,
  status = 'on-time',
  terminal,
  time,
  type,
}) => {
  const theme = useTheme();
  const gateText = gate || FILLER;
  const terminalText = terminal || FILLER;
  const baggageText = baggageClaim || FILLER;
  const timeColor =
    status === 'on-time' || status === 'early'
      ? theme.pallette.success
      : status === 'late'
      ? theme.pallette.danger
      : theme.pallette.warn;

  return (
    <Container>
      <Content>
        <Airport>
          <AirportIata>{airport.iata}</AirportIata>
          <AirportName>{airport.name}</AirportName>
        </Airport>
        <Meta>
          <Time>
            <TimeText style={[{ color: timeColor }]}>
              {time.format('h:mm A')}
            </TimeText>
            {!isNil(dayDiff) && (
              <DayDiffText style={[{ color: timeColor }]}>
                {dayDiff}
              </DayDiffText>
            )}
          </Time>
          <View style={[{ gap: 3 }]}>
            <MetaText isFiller={!terminal}>Terminal {terminalText}</MetaText>
            <MetaText isFiller={!gate}>Gate {gateText}</MetaText>
            {type === 'destination' && (
              <MetaText isFiller={!baggageClaim}>
                Baggage Belt {baggageText}
              </MetaText>
            )}
          </View>
        </Meta>
      </Content>
    </Container>
  );
};

const Content = withStyled(View, (theme) => [
  {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: theme.space.large,
  },
]);

const Container = withStyled(View, (theme) => [
  {
    gap: theme.space.tiny,
  },
]);

const Airport = withStyled(View, () => [
  {
    flexGrow: 1,
    flexShrink: 1,
    overflow: 'hidden',
  },
]);

const AirportIata = withStyled(Typography, () => [], {
  isBold: true,
  type: 'h1',
});

const AirportName = withStyled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.pallette.text,
  },
]);

const Meta = withStyled(View, (theme) => [
  {
    alignItems: 'flex-end',
    gap: theme.space.tiny,
  },
]);

const MetaText = withStyled<{ isFiller?: boolean }, typeof Text>(
  Text,
  (theme, props) => [
    theme.typography.presets.p2,
    {
      color: theme.pallette.text,
      fontWeight: 'bold',
      textAlign: 'right',
    },
    props.isFiller && {
      color: theme.pallette.textSecondary,
    },
  ],
);

const Time = withStyled(View, () => [
  {
    alignItems: 'center',
    flexDirection: 'row',
  },
]);

const TimeText = withStyled(
  Typography,
  () => [
    {
      textAlign: 'right',
    },
  ],
  {
    isBold: true,
    type: 'h1',
  },
);

const DayDiffText = withStyled(
  Typography,
  (theme) => [
    {
      position: 'absolute',
      right: -theme.space.small,
      top: -theme.space.tiny,
    },
  ],
  {
    isBold: true,
    type: 'small',
  },
);
