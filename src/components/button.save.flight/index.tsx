import * as React from 'react';

import {
  GetUserActiveFlightsDocument,
  UserHasFlightsDocument,
  useAddUserFlightMutation,
  useDeleteUserFlightMutation,
  useUserFlightQuery,
} from '@app/generated/server.gql';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { styled } from '@app/lib/styled';
import * as ting from '@baronha/ting';
import { isNil } from 'lodash';
import { FaIcon } from '../icons.fontawesome';

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
      ting.toast({
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
      ting.toast({
        title: 'Flight Removed!',
      });
    },
  });

  const theme = useTheme();
  const isSaved = !isNil(userFlightResp.data?.userFlight?.id);
  const isLoading = userFlightResp.loading || loading;
  const [label, backgroundColor, color] = isSaved
    ? ['Saved', theme.pallette.active, theme.pallette.white]
    : ['Save', theme.pallette.grey[100], theme.typography.color];

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
        isSaved={isSaved}
        backgroundColor={backgroundColor}
        disabled={isLoading}
        onPress={handlePress}
      >
        {loading ? (
          <ActivityIndicator size="small" color={color} />
        ) : (
          <>
            <FaIcon name="bookmark" solid={isSaved} color={color} />
            <BtnText style={[{ color }]}>{label}</BtnText>
          </>
        )}
      </Btn>
    </>
  );
};

const Btn = styled<
  {
    isSaved: boolean;
    backgroundColor: string;
  },
  typeof TouchableOpacity
>(TouchableOpacity, (theme, props) => [
  theme.presets.centered,
  theme.presets.shadows[100],
  {
    minWidth: 75,
    flexDirection: 'row',
    gap: theme.space.tiny,
    borderRadius: theme.borderRadius,
    paddingHorizontal: theme.space.small,
    paddingVertical: 4,
    shadowOpacity: props.isSaved ? 0.3 : 0,
    backgroundColor: props.backgroundColor,
    shadowColor: props.backgroundColor,
  },
]);

const BtnText = styled(Text, (theme) => [theme.typography.presets.p2]);
