import * as React from 'react';

import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import {
  GetUserFlightsDocument,
  useAddUserFlightMutation,
  useDeleteUserFlightMutation,
  useUserFlightQuery,
} from '@app/generated/server.gql';

import Animated from 'react-native-reanimated';
import { FaIcon } from '../icons.fontawesome';
import { PushNotificationSheet } from '../sheet.push.notification';
import { isNil } from 'lodash';
import { styled } from '@app/lib/styled';
import { toast } from '@baronha/ting';
import { useTheme } from '@app/lib/hooks/use.theme';
import { vibrate } from '@app/lib/haptic.feedback';

type Props = {
  flightID: string;
};

export const SaveFlightButton: React.FC<Props> = ({ flightID }) => {
  const [loading, setLoading] = React.useState(false);
  const [shouldAskNotification, setShouldAskNotification] =
    React.useState(false);

  const userFlightResp = useUserFlightQuery({
    errorPolicy: 'ignore',
    variables: {
      flightID,
    },
  });

  const [add] = useAddUserFlightMutation({
    variables: {
      flightID,
    },
    refetchQueries: [
      {
        query: GetUserFlightsDocument,
      },
    ],
    onCompleted() {
      toast({
        title: 'Flight Added!',
      });
    },
  });
  const [remove] = useDeleteUserFlightMutation({
    variables: {
      flightID,
    },
    refetchQueries: [
      {
        query: GetUserFlightsDocument,
      },
    ],
    onCompleted() {
      toast({
        title: 'Flight Removed!',
      });
    },
  });

  const theme = useTheme();
  const isSaved = !isNil(userFlightResp.data?.userFlight?.id);
  const isLoading = userFlightResp.loading || loading;
  const [label, icon, backgroundColor, color] = isSaved
    ? ['Saved', 'star', theme.pallette.active, theme.pallette.white]
    : ['Save', 'star-o', theme.pallette.grey[100], theme.typography.color];

  const handlePress = async () => {
    vibrate('impactHeavy');
    setLoading(true);
    isSaved ? await remove() : await add();
    setShouldAskNotification(true);
    await userFlightResp.refetch();
    setLoading(false);
  };

  return (
    <>
      <PushNotificationSheet enabled={shouldAskNotification} />
      <Btn
        style={[{ backgroundColor }]}
        disabled={isLoading}
        onPress={handlePress}
      >
        {loading ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <>
            <FaIcon
              type="fa"
              name={icon}
              color={isSaved ? theme.pallette.white : undefined}
            />
            <BtnText style={[{ color }]}>{label}</BtnText>
          </>
        )}
      </Btn>
    </>
  );
};

const Btn = styled(
  Animated.createAnimatedComponent(TouchableOpacity),
  (theme) => [
    theme.presets.centered,
    {
      minWidth: 75,
      flexDirection: 'row',
      gap: theme.space.tiny,
      borderRadius: theme.borderRadius,
      paddingHorizontal: theme.space.small,
      paddingVertical: 4,
    },
  ],
);

const BtnText = styled(Text, (theme) => [theme.typography.presets.p2]);
