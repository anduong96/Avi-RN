import * as React from 'react';

import moment from 'moment';
import { isNil } from 'lodash';

import { Card } from '@app/components/card';
import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { useFlightPromptnessQuery } from '@app/generated/server.gql';

import { useFlightID } from './context';

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
        <Group flexBasis={1} flexGrow={1}>
          <Card isCentered padding={'medium'}>
            <Typography color="secondary" type="p2">
              Delay Chance
            </Typography>
            <Typography type="h1">
              {hasData ? `${100 - onTimePercent}%` : 'N/A'}
            </Typography>
          </Card>
        </Group>
        <Group flexBasis={1} flexGrow={1}>
          <Card isCentered padding={'medium'}>
            <Typography color="secondary" type="p2">
              Delay Average
            </Typography>
            <Typography type="h1">
              {hasData
                ? `${moment.duration(averageDelayTimeMs).minutes()} min`
                : 'N/A'}
            </Typography>
          </Card>
        </Group>
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
