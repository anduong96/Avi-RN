import * as React from 'react';

import { FLIGHT_SEARCH_STATE_STEP, flightSearchState } from '../../state';

import { AirlineSheetSelector } from './selector';
import { DisplayText } from '../styles';
import FastImage from 'react-native-fast-image';
import { Portal } from '@gorhom/portal';
import { TouchableOpacity } from 'react-native';
import { styled } from '@app/lib/styled';
import { useAirlineQuery } from '@app/generated/server.gql';
import { useIsFocused } from '../../hooks/use.is.focused';
import { vibrate } from '@app/lib/haptic.feedback';

export const AirlineFormItem: React.FC = () => {
  const isFocused = useIsFocused(FLIGHT_SEARCH_STATE_STEP.AIRLINE);
  const value = flightSearchState.useSelect((s) => s.airlineIata);
  const response = useAirlineQuery({
    skip: !value,
    variables: {
      iata: value!,
    },
  });

  const handlePress = () => {
    vibrate('impactMedium');
    flightSearchState.actions.setStep(FLIGHT_SEARCH_STATE_STEP.AIRLINE);
  };

  return (
    <Container onPress={handlePress}>
      {value ? (
        <>
          <Image
            resizeMode="contain"
            source={{ uri: response.data?.airline.logoCompactImageURL }}
          />
          <DisplayText hasValue isFocused={isFocused}>
            {value}
          </DisplayText>
        </>
      ) : (
        <DisplayText isFocused={isFocused}>Airline</DisplayText>
      )}
      <Portal hostName="FlightSearch">
        {isFocused && <AirlineSheetSelector />}
      </Portal>
    </Container>
  );
};

const Container = styled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    gap: theme.space.small,
    flexDirection: 'row',
    backgroundColor: theme.pallette.grey[100],
    paddingHorizontal: theme.space.small,
    borderRadius: theme.borderRadius,
  },
]);

const Image = styled(FastImage, (theme) => [
  theme.presets.shadows[200],
  {
    width: 30,
    height: undefined,
    aspectRatio: 1,
    padding: 1,
    borderRadius: 10,
  },
]);
