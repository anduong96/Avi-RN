import * as React from 'react';
import Share from 'react-native-share';

import { tryNice } from 'try-nice';

import { vibrate } from '@app/lib/haptic.feedback';
import { buildFlightLink } from '@app/lib/deep.link';
import { useFlightQuery } from '@app/generated/server.gql';

import { Button } from '../button';

type Props = {
  flightID: string;
};

export const ShareFlightButton: React.FC<Props> = ({ flightID }) => {
  const [loading, setLoading] = React.useState(false);
  const flight = useFlightQuery({ variables: { flightID } });

  const buildTitle = (): string => {
    if (!flight.data?.flight) {
      return 'UNKNOWN';
    }

    const { Destination, airlineIata, flightNumber } = flight.data.flight;
    const flightCode = `${airlineIata}${flightNumber}`;
    const destinationName = Destination.cityName || Destination.countryCode;
    const title = `${flightCode} to ${destinationName}`;
    return title;
  };

  const handlePress = async () => {
    vibrate('effectClick');
    setLoading(true);
    await tryNice(() =>
      Share.open({
        title: buildTitle(),
        url: buildFlightLink(flightID),
      }),
    );
    setLoading(false);
  };

  return (
    <Button
      disabled={loading}
      icon="bullhorn"
      isLoading={loading}
      onPress={handlePress}
    >
      Share
    </Button>
  );
};
