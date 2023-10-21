import * as React from 'react';
import { ScrollView } from 'react-native';

import type { Flight } from '@app/generated/server.gql';

import { ENV } from '@app/env';
import { withStyled } from '@app/lib/styled';
import { VerticalDivider } from '@app/components/divider.vertical';
import { SaveFlightButton } from '@app/components/button.save.flight';
import { ShareFlightButton } from '@app/components/button.share.flight';
import { AlertFlightButton } from '@app/components/button.alerts.flight';
import { DebugNotificationFlightBtn } from '@app/components/button.debug.notif.flight';

type Props = {
  flightID: Flight['id'];
};

export const FlightActions: React.FC<Props> = ({ flightID }) => {
  return (
    <Container>
      <SaveFlightButton flightID={flightID} />
      <VerticalDivider />
      <AlertFlightButton flightID={flightID} />
      <ShareFlightButton flightID={flightID} />
      {ENV.APP_ENV !== 'production' && (
        <>
          <VerticalDivider />
          <DebugNotificationFlightBtn flightID={flightID} />
        </>
      )}
    </Container>
  );
};

const Container = withStyled(ScrollView, undefined, (theme) => ({
  contentContainerStyle: {
    alignItems: 'center' as const,
    gap: theme.space.small,
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.small,
  },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
}));
