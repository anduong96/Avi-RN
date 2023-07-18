import * as React from 'react';

import { Text, View } from 'react-native';

import moment from 'moment';
import { styled } from '@app/lib/styled';

type Props = {
  value: moment.Moment | null;
  isActive?: boolean;
  disabled?: boolean;
};

export const CalendarDateCell: React.FC<Props> = ({
  value,
  isActive,
  disabled,
}) => {
  if (!value) {
    return null;
  }

  return (
    <Container isActive={isActive} disabled={disabled}>
      <DateText>{value.date()}</DateText>
      {moment().isSame(value, 'day') && <TodayMarker />}
    </Container>
  );
};

const Container = styled<
  { isActive?: boolean; disabled?: boolean },
  typeof View
>(View, (theme, props) => [
  theme.presets.centered,
  {
    width: '100%',
    height: '100%',
    borderWidth: theme.borderWidth,
    borderColor: theme.pallette.transparent,
  },
  props.isActive && {
    borderColor: theme.pallette.active,
    borderRadius: 7,
  },
  props.disabled && {
    opacity: 0.2,
  },
]);

const DateText = styled(Text, (theme) => [
  theme.typography.presets.p2,
  {
    textAlign: 'center',
  },
]);

const TodayMarker = styled(View, (theme) => [
  theme.typography.presets.small,
  {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: theme.pallette.active,
  },
]);
