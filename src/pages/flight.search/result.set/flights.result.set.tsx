import * as React from 'react';
import { Text, View } from 'react-native';
import { useValue } from '../state/use.value';
import moment from 'moment';

export const FlightsResultSet: React.FC = () => {
  const airlineIata = useValue('airlineIata')!;
  const flightNumber = useValue('flightNumber')!;
  const departureDate = useValue('departureDate')!;

  return (
    <View>
      <Text>
        {airlineIata}
        {flightNumber} on {moment(departureDate).format('L')}
      </Text>
    </View>
  );
};
