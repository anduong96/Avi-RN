import * as React from 'react';

import { FLIGHT_SEARCH_STATE_STEP, flightSearchState } from '../state';
import { TextInput, TouchableOpacity } from 'react-native';

import { DisplayText } from './styles';
import { isNil } from 'lodash';
import { styled } from '@app/lib/styled';
import { useIsFocused } from '../hooks/use.is.focused';
import { vibrate } from '@app/lib/haptic.feedback';

export const FlightNumberFormItem: React.FC = () => {
  const input = React.useRef<TextInput>();
  const isFocused = useIsFocused(FLIGHT_SEARCH_STATE_STEP.FLIGHT_NUMBER);
  const value = flightSearchState.useSelect((s) => s.flightNumber);
  const isDisabled = flightSearchState.useSelect((s) => isNil(s.airlineIata));

  const handlePress = () => {
    vibrate('impactMedium');
    flightSearchState.actions.setStep(FLIGHT_SEARCH_STATE_STEP.FLIGHT_NUMBER);
  };

  React.useEffect(() => {
    if (isFocused && input.current) {
      input.current.focus();
    }
  }, [isFocused]);

  if (isFocused) {
    return (
      <Container>
        <Input
          maxLength={5}
          ref={input}
          value={value}
          autoCorrect={false}
          placeholder="flight number"
          keyboardType="number-pad"
          autoCapitalize="none"
          onChangeText={(flightNumber) =>
            flightSearchState.actions.setState({
              flightNumber,
            })
          }
        />
      </Container>
    );
  } else if (!value) {
    return (
      <Container onPress={handlePress} disabled={isDisabled}>
        <DisplayText isFocused={isFocused}>flight number</DisplayText>
      </Container>
    );
  }

  return (
    <Container onPress={handlePress} disabled={isDisabled}>
      <DisplayText hasValue isFocused={isFocused}>
        {value}
      </DisplayText>
    </Container>
  );
};

const Input = styled(TextInput, (theme) => [
  {
    minWidth: 75,
    fontSize: theme.typography.presets.massive.fontSize,
    color: theme.pallette.active,
  },
]);

const Container = styled(TouchableOpacity, (theme) => [
  {
    backgroundColor: theme.pallette.grey[100],
    borderRadius: theme.borderRadius,
    paddingHorizontal: theme.space.small,
  },
]);
