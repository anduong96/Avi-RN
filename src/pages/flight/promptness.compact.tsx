import * as React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';
import { isNil } from 'lodash';

import type { FullFlightFragmentFragment } from '@app/generated/server.gql';

import { withStyled } from '@app/lib/styled';
import { Card } from '@app/components/card';
import { Statistic } from '@app/components/statistic';
import { VerticalDivider } from '@app/components/divider.vertical';
import { useGetFlightPromptnessQuery } from '@app/generated/server.gql';

type Props = {
  flightID: FullFlightFragmentFragment['id'];
};

export const PromptnessCompact: React.FC<Props> = ({ flightID }) => {
  const response = useGetFlightPromptnessQuery({
    fetchPolicy: 'cache-first',
    variables: {
      flightID,
    },
  });

  const data = response.data?.flightPromptness;
  const hasData = !isNil(data);
  const { averageDelayTimeMs = 0, onTimePercent = 0 } = data ?? {};

  const getContent = () => {
    if (!onTimePercent && !averageDelayTimeMs) {
      return (
        <Content>
          <InfoText>
            ⚠️ Delay information is not available for this flight.
          </InfoText>
        </Content>
      );
    }

    return (
      <Content>
        <Item
          align="center"
          label="Delay Chance"
          value={hasData ? `${100 - onTimePercent}%` : 'N/A'}
        />
        <VerticalDivider />
        <Item
          align="center"
          label="Delay Average"
          value={
            hasData
              ? `${moment.duration(averageDelayTimeMs).minutes()} min`
              : 'N/A'
          }
        />
      </Content>
    );
  };

  return <Card isLoading={response.loading}>{getContent()}</Card>;
};

const InfoText = withStyled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.textSecondary,
  },
]);

const Item = withStyled(
  Statistic,
  (theme) => [
    theme.presets.centered,
    {
      flexBasis: 1,
      flexGrow: 1,
    },
  ],
  (theme) => ({
    labelStyle: [
      theme.typography.presets.p2,
      {
        color: theme.pallette.textSecondary,
      },
    ],
    valueStyle: [
      theme.typography.presets.h2,
      {
        lineHeight: 50,
      },
    ],
  }),
);

const Content = withStyled(View, () => [
  {
    alignItems: 'center',
    flexDirection: 'row',
  },
]);
