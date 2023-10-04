import * as React from 'react';

import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import {
  GetUserActiveFlightsDocument,
  UserHasFlightsDocument,
  useAddUserFlightMutation,
  useDeleteUserFlightMutation,
  useUserFlightQuery,
} from '@app/generated/server.gql';

import Animated from 'react-native-reanimated';
import { FaIcon } from '../icons.fontawesome';
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
      { query: GetUserActiveFlightsDocument },
      { query: UserHasFlightsDocument },
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
      { query: GetUserActiveFlightsDocument },
      { query: UserHasFlightsDocument },
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
    await userFlightResp.refetch();
    setLoading(false);
  };

  return (
    <>
      <Btn
        style={[
          {
            backgroundColor,
            shadowOpacity: isSaved ? 0.3 : 0,
            shadowColor: backgroundColor,
          },
        ]}
        disabled={isLoading}
        onPress={handlePress}
      >
        {loading ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <>
            <FaIcon type="fa" name={icon} color={color} />
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
    theme.presets.shadows[100],
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
