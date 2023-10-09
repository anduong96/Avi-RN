import * as React from 'react';

import { FaIcon } from '../icons.fontawesome';
import { LoadingOverlay } from '../loading.overlay';
import Share from 'react-native-share';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { buildFlightLink } from '@app/lib/deep.link';
import { styled } from '@app/lib/styled';
import { tryNice } from 'try-nice';
import { useGetFlightQuery } from '@app/generated/server.gql';
import { vibrate } from '@app/lib/haptic.feedback';

type Props = {
  flightID: string;
};

export const ShareFlightButton: React.FC<Props> = ({ flightID }) => {
  const [loading, setLoading] = React.useState(false);
  const flight = useGetFlightQuery({ variables: { flightID } });

  const buildTitle = (): string => {
    if (!flight.data?.flight) {
      return 'UNKNOWN';
    }

    const { airlineIata, flightNumber, Destination } = flight.data.flight;
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
    <Btn onPress={handlePress} disabled={loading}>
      <LoadingOverlay isLoading={loading} size="small" />
      <FaIcon name="bullhorn" />
      <BtnText>Share</BtnText>
    </Btn>
  );
};

const Btn = styled(TouchableOpacity, (theme) => [
  theme.presets.centered,
  {
    flexDirection: 'row',
    gap: theme.space.tiny,
    backgroundColor: theme.pallette.grey[100],
    borderRadius: theme.borderRadius,
    paddingHorizontal: theme.space.small,
    paddingVertical: 4,
  },
]);

const BtnText = styled(Text, (theme) => [theme.typography.presets.p2]);
