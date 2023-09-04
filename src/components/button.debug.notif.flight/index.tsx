import * as React from 'react';

import { ActivityIndicator, Text } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { styled } from '@app/lib/styled';
import { toast } from '@baronha/ting';
import { useDebugFlightNoficationMutation } from '@app/generated/server.gql';

type Props = {
  flightID: string;
};

export const DebugNoficationFlightBtn: React.FC<Props> = ({ flightID }) => {
  const [send, { loading }] = useDebugFlightNoficationMutation({
    variables: {
      flightID,
      data: {
        url: `flywithavi://flights/${flightID}`,
      },
    },
    onCompleted(data) {
      toast({
        title: `Sent ${data.debug_sendFlightNotification}`,
        preset: 'done',
        position: 'top',
      });
    },
    onError(error) {
      toast({
        title: error.message,
        preset: 'error',
        position: 'top',
      });
    },
  });

  return (
    <Btn onPress={() => send()} disabled={loading}>
      {loading ? (
        <ActivityIndicator size={'small'} />
      ) : (
        <BtnText>[DEBUG] Send Notification</BtnText>
      )}
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
