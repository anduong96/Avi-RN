import * as React from 'react';

import { Button } from '@app/components/button';
import type { FlightSearchStackParams } from '@app/stacks/flight.search.stack';
import type { MainStackParam } from '@app/stacks';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types';
import { alert } from '@baronha/ting';
import { flightSearchState } from './state';
import { size } from 'lodash';
import { tryNice } from 'try-nice';
import { useFindFlightsLazyQuery } from '@app/generated/server.gql';
import { useNavigation } from '@react-navigation/native';
import { vibrate } from '@app/lib/haptic.feedback';

type Navigation = NativeStackNavigationProp<FlightSearchStackParams, 'Search'>;
type ParentNavigation = NativeStackNavigationProp<MainStackParam, 'Home'>;

//TODO: error state & loading state
export const NextBtn: React.FC = () => {
  const navigation = useNavigation<Navigation>();
  const airlineIata = flightSearchState.useSelect((s) => s.airlineIata);
  const flightNumber = flightSearchState.useSelect((s) => s.flightNumber);
  const departureDate = flightSearchState.useSelect((s) => s.departureDate);
  const isDisabled = !(airlineIata && flightNumber && departureDate);
  const [getFlight, { loading }] = useFindFlightsLazyQuery({
    onError(error) {
      alert({
        title: 'Error!',
        preset: 'error',
        haptic: 'error',
        message: error.message,
      });
    },
  });

  const handleSearchFlight = async () => {
    if (isDisabled) {
      return;
    }

    vibrate('impactHeavy');
    const [response] = await tryNice(() =>
      getFlight({
        variables: {
          airlineIata,
          flightNumber,
          departureDate,
        },
      }),
    );

    const result = response?.data?.flights;
    if (!result) {
      return;
    }

    if (size(result) > 1) {
      navigation.push('List', {
        airlineIata,
        flightNumber,
        departureDate: departureDate.toISOString(),
      });
    } else {
      const parent = navigation.getParent() as ParentNavigation;
      parent.push('FlightStack', {
        screen: 'Flight',
        params: {
          flightID: result[0].id,
          isFromSearch: true,
        },
      });
    }
  };

  return (
    <Button
      shadow
      size="small"
      disabled={isDisabled || loading}
      onPress={handleSearchFlight}
      isLoading={loading}
    >
      Next
    </Button>
  );
};
