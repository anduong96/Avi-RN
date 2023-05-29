import * as React from 'react';

import { AirlineFormItem } from './airline';
import { DepartureDateFormItem } from './departure.date';
import { DisplayText } from './styles';
import { FlightNumberFormItem } from './flight.number';
import { View } from 'react-native';
import { styled } from '@app/lib/styled';

export const FlightSearchForm: React.FC = () => {
  return (
    <Container>
      <AirlineFormItem />
      <FlightNumberFormItem />
      <DisplayText hasValue>on</DisplayText>
      <DepartureDateFormItem />
    </Container>
  );
};

const Container = styled(View, (theme) => [
  {
    flexDirection: 'row',
    gap: theme.space.small,
    flexWrap: 'wrap',
  },
]);
