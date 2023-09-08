import * as React from 'react';

import { Text, View } from 'react-native';

import type { FullFlightFragmentFragment } from '@app/generated/server.gql';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { VerticalDivider } from '@app/components/divider.vertical';
import { isNil } from 'lodash';
import moment from 'moment';
import { styled } from '@app/lib/styled';
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
  const { onTimePercent = 0, averageDelayTimeMs = 0 } = data ?? {};

  return (
    <Container>
      <LoadingOverlay isLoading={response.loading} />
      <Content>
        <Item>
          <ItemTitle>Delay Chance</ItemTitle>
          <ItemValue>
            {hasData ? `${100 - onTimePercent}%` : 'Unavailable'}
          </ItemValue>
        </Item>
        <VerticalDivider />
        <Item>
          <ItemTitle>Delay Average</ItemTitle>
          <ItemValue>
            {hasData
              ? `${moment.duration(averageDelayTimeMs).minutes()} min`
              : 'Unavailable'}
          </ItemValue>
        </Item>
      </Content>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  theme.presets.shadows[100],
  theme.presets.centered,
  {
    padding: theme.space.medium,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.pallette.background,
    gap: theme.space.medium,
  },
]);

const Item = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexGrow: 1,
    flexBasis: 1,
    gap: theme.space.small,
  },
]);

const ItemTitle = styled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    color: theme.pallette.grey[700],
  },
]);

const ItemValue = styled(Text, (theme) => [
  theme.typography.presets.h1,
  {
    color: theme.typography.color,
  },
]);

const Content = styled(View, () => [
  {
    flexDirection: 'row',
    alignItems: 'center',
  },
]);
