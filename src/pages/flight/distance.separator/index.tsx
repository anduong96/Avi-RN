import * as React from 'react';
import { Text, View } from 'react-native';

import moment from 'moment';
import { isNil } from 'lodash';

import { withStyled } from '@app/lib/styled';
import { DOT_SEPARATOR } from '@app/constants';
import { formatDuration } from '@app/lib/format.duration';
import { DividerDashed } from '@app/components/divider.dashed';
import { useMeasurementDisplay } from '@app/lib/hooks/use.measurement.display';

import { useFlight } from '../hooks/use.flight';

export const FlightPageDistanceSeparator: React.FC = () => {
  const flight = useFlight(true);
  const { estimatedGateArrival, estimatedGateDeparture, totalDistanceKm } =
    flight;

  const distance = useMeasurementDisplay('km', totalDistanceKm);
  const diff = moment(estimatedGateArrival).diff(estimatedGateDeparture);
  const durationText = formatDuration(diff);

  return (
    <Container>
      <Divider />
      <Content>
        <TextContainer>
          <StyledText>{durationText}</StyledText>
          {!isNil(distance) && (
            <>
              <StyledText>{DOT_SEPARATOR}</StyledText>
              <StyledText>{distance}</StyledText>
            </>
          )}
        </TextContainer>
      </Content>
    </Container>
  );
};

const Container = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    paddingVertical: theme.space.small,
  },
]);

const Content = withStyled(View, (theme) => [theme.presets.centered]);

const Divider = withStyled(DividerDashed, () => [
  {
    alignSelf: 'center',
    position: 'absolute',
    width: '100%',
  },
]);

const TextContainer = withStyled(View, (theme) => [
  theme.presets.centered,
  {
    backgroundColor: theme.pallette.borderColor,
    borderRadius: theme.borderRadius,
    flexDirection: 'row',
    paddingHorizontal: theme.space.medium,
    paddingVertical: 2,
  },
]);

const StyledText = withStyled(Text, (theme) => [
  theme.typography.presets.p1,
  {
    fontWeight: 'bold',
  },
]);
