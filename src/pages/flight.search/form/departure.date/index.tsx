import * as React from 'react';

import { FLIGHT_SEARCH_STATE_STEP, flightSearchState } from '../../state';

import { Calendar } from './calendar';
import { DisplayText } from '../styles';
import { FlightSearchSheet } from '../../sheet';
import { Portal } from '@gorhom/portal';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import { styled } from '@app/lib/styled';
import { useIsFocused } from '../../hooks/use.is.focused';
import { vibrate } from '@app/lib/haptic.feedback';

export const DepartureDateFormItem: React.FC = () => {
  const isFocused = useIsFocused(FLIGHT_SEARCH_STATE_STEP.DEPARTURE_DATE);
  const snapPoints = React.useMemo(() => [450], []);
  const value = flightSearchState.useSelect((s) => s.departureDate);
  const isDisabled = flightSearchState.useSelect(
    (s) => !s.airlineIata || !s.flightNumber,
  );

  const handlePress = () => {
    vibrate('impactMedium');
    flightSearchState.actions.setStep(FLIGHT_SEARCH_STATE_STEP.DEPARTURE_DATE);
  };

  return (
    <Container onPress={handlePress} disabled={isDisabled}>
      <DisplayText isFocused={isFocused} hasValue={Boolean(value)}>
        {value ? moment(value).format('ll') : 'departure date'}
      </DisplayText>
      <Portal hostName="FlightSearch">
        {isFocused && (
          <FlightSearchSheet snapPoints={snapPoints} index={0}>
            <Calendar />
          </FlightSearchSheet>
        )}
      </Portal>
    </Container>
  );
};

const Container = styled(TouchableOpacity, (theme) => [
  {
    backgroundColor: theme.pallette.grey[100],
    borderRadius: theme.borderRadius,
    paddingHorizontal: theme.space.small,
  },
]);
