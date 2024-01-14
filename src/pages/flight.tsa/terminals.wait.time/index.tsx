import * as React from 'react';
import { ScrollView } from 'react-native';

import { Group } from '@app/components/group';
import { useFlight } from '@app/pages/flight/context';
import { SpaceVertical } from '@app/components/space.vertical';
import { SectionTile, TileLabel } from '@app/pages/flight/styles';
import { useAirportTsaCurrentWaitTimeQuery } from '@app/generated/server.gql';

import { Bar } from '../historical.terminal.wait.time/bar';

export const TerminalsWaitTimeCard: React.FC = () => {
  const flight = useFlight();
  const tsa = useAirportTsaCurrentWaitTimeQuery({
    variables: {
      airportIata: flight.Origin.iata!,
    },
  });

  const data = tsa.data?.airportTsaCurrentWaitTime;
  const activeTerminal = flight.originTerminal;

  if (!data) {
    return null;
  }

  const maxWaitMinute = Math.max(
    ...data.map((entry) => entry.estimatedWaitMinutes),
  );

  return (
    <SectionTile paddingHorizontal={0}>
      <Group paddingHorizontal={'medium'}>
        <TileLabel>All Terminals Estimate</TileLabel>
      </Group>
      <SpaceVertical size="small" />
      <ScrollView horizontal>
        <Group direction="row" gap={'small'} paddingHorizontal={'medium'}>
          {data
            .filter((entry) => entry.terminal !== 'All Terminals')
            .map((entry) => (
              <Bar
                columnHeight={
                  (entry.estimatedWaitMinutes / maxWaitMinute) * 100
                }
                isActive={
                  activeTerminal
                    ? entry.terminal.includes(activeTerminal)
                    : false
                }
                key={entry.terminal}
                label={'T' + entry.terminal.slice(-1)}
                value={entry.estimatedWaitMinutes}
              />
            ))}
        </Group>
      </ScrollView>
    </SectionTile>
  );
};
