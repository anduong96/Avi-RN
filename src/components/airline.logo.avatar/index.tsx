import * as React from 'react';

import { useAirlinesQuery } from '@app/generated/server.gql';
import { styled } from '@app/lib/styled';
import type { StyleProp, ViewStyle } from 'react-native';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  airlineIata: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export const AirlineLogoAvatar: React.FC<Props> = ({
  airlineIata,
  style,
  size = 50,
}) => {
  const request = useAirlinesQuery();
  const airlines = request.data?.airlines;
  const match = React.useMemo(
    () => airlines?.find((airline) => airline.iata === airlineIata),
    [airlines, airlineIata],
  );

  return (
    <Container style={[style]} size={size}>
      <Logo
        defaultSource={require('@app/assets/airline.png')}
        resizeMode={FastImage.resizeMode.contain}
        source={{
          uri: match?.logoCompactImageURL,
          priority: FastImage.priority.high,
        }}
      />
    </Container>
  );
};

const Container = styled<Required<Pick<Props, 'size'>>, typeof View>(
  View,
  (theme, props) => [
    theme.presets.centered,
    {
      backgroundColor: theme.pallette.grey[50],
      overflow: 'hidden',
      padding: props.size / 10,
      height: props.size,
      aspectRatio: 1,
      borderRadius: props.size,
    },
  ],
);

const Logo = styled(FastImage, () => ({
  width: '100%',
  height: '100%',
}));
