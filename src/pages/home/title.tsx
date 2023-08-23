import * as React from 'react';

import {
  FlightStatus,
  useGetUserFlightsQuery,
} from '@app/generated/server.gql';
import { Text, View } from 'react-native';

import { size } from 'lodash';
import { styled } from '@app/lib/styled';

export const Title: React.FC = () => {
  const flights = useGetUserFlightsQuery();
  const data = flights.data?.userFlights;
  const count = size(
    data?.filter((entry) => entry.flight.status !== FlightStatus.ARCHIVED),
  );

  return (
    <Container>
      <Meta>
        <TitleText>Flights</TitleText>
        {count > 0 && (
          <View>
            <Tag>
              <TagText>{count}</TagText>
            </Tag>
          </View>
        )}
      </Meta>
    </Container>
  );
};

const Container = styled(View, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    gap: theme.space.small,
  },
]);

const Meta = styled(View, (theme) => [
  {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.space.small,
  },
]);

const Tag = styled(View, (theme) => [
  {
    backgroundColor: theme.pallette.grey[300],
    paddingHorizontal: theme.space.small,
    paddingVertical: 2,
    borderRadius: 50,
    marginTop: 4,
  },
]);

const TagText = styled(Text, (theme) => [
  theme.typography.presets.small,
  {
    color: theme.typography.color,
    fontWeight: 'bold',
  },
]);

const TitleText = styled(Text, (theme) => [
  theme.typography.presets.h2,
  {
    color: theme.typography.color,
  },
]);
