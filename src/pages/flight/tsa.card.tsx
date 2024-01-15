import * as React from 'react';

import { useRoute } from '@react-navigation/native';

import { Group } from '@app/components/group';
import { IconBtn } from '@app/components/icon.btn';
import { formatDurationMs } from '@app/lib/duration/format.duration';
import { useRootNavigation } from '@app/navigation/use.root.navigation';
import { useAirportTsaCurrentWaitTimeQuery } from '@app/generated/server.gql';

import { useFlight } from './context';
import { SectionTile, TileLabel, TileValue } from './styles';

export const TsaCard: React.FC = () => {
  const navigation = useRootNavigation();
  const flight = useFlight();
  const route = useRoute();
  const tsa = useAirportTsaCurrentWaitTimeQuery({
    variables: {
      airportIata: flight.Origin.iata!,
    },
  });
  const data = tsa.data;
  const terminal = flight.originTerminal;
  const target = terminal
    ? data?.airportTsaCurrentWaitTime?.find((entry) =>
        entry.terminal.includes(terminal),
      )
    : null;

  const handleTsaPage = () => {
    navigation.push('FlightStack', {
      params: {
        flightID: flight.id,
      },
      screen: 'TSA',
    });
  };

  if (target) {
    return (
      <SectionTile>
        <Group direction="row" verticalAlign="center">
          <Group flexGrow={1} verticalAlign="center">
            <TileLabel>Estimated TSA Now</TileLabel>
          </Group>
          <Group>
            {route.name !== 'TSA' && (
              <IconBtn icon="chevron-right" onPress={handleTsaPage} />
            )}
          </Group>
        </Group>
        <TileValue isBold type="h0">
          {formatDurationMs(target.estimatedWaitMinutes * 60 * 1000)}
        </TileValue>
      </SectionTile>
    );
  }

  return null;
};
