import * as React from 'react';

import moment from 'moment';
import { isNil } from 'lodash';

import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { useFlightPromptnessQuery } from '@app/generated/server.gql';

import { useFlightID } from './context';
import { SectionTile, TileLabel, TileValue } from './styles';

export const PromptnessCompact: React.FC = () => {
  const flightID = useFlightID();
  const response = useFlightPromptnessQuery({
    fetchPolicy: 'cache-first',
    variables: {
      flightID,
    },
  });

  const data = response.data?.flightPromptness;
  const hasData = !isNil(data);
  const { averageDelayTimeMs = 0, onTimePercent = 0 } = data ?? {};

  const getContent = () => {
    if (isNil(onTimePercent) || isNil(averageDelayTimeMs)) {
      return (
        <Group>
          <Typography type="h1">
            ⚠️ Delay information is not available for this flight.
          </Typography>
        </Group>
      );
    }

    return (
      <Group direction="row" gap="tiny">
        <SectionTile>
          <TileLabel>Delay Chance</TileLabel>
          <TileValue>{hasData ? `${100 - onTimePercent}%` : 'N/A'}</TileValue>
        </SectionTile>
        <SectionTile>
          <TileLabel>Delay Average</TileLabel>
          <TileValue>
            {hasData
              ? `${moment.duration(averageDelayTimeMs).minutes()} min`
              : 'N/A'}
          </TileValue>
        </SectionTile>
      </Group>
    );
  };

  return (
    <Group>
      <LoadingOverlay isLoading={response.loading} />
      {getContent()}
    </Group>
  );
};
