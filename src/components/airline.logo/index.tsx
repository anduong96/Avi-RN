import * as React from 'react';

import { Container, Logo } from './styles';
import type { StyleProp, ViewStyle } from 'react-native';
import { Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import { useAirlineQuery } from '@app/generated/server.gql';

type Props = {
  iata: string;
  type?: 'full' | 'compact';
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  withName?: boolean;
};

export const AirlineLogo: React.FC<Props> = ({
  iata,
  style,
  width = 200,
  height = 30,
  type = 'full',
}) => {
  const [hasError, setHasError] = React.useState(false);
  const [ratio, setRatio] = React.useState(-1);
  const query = useAirlineQuery({
    initialFetchPolicy: 'cache-first',
    skip: !iata,
    variables: {
      iata,
    },
  });
  const airline = query.data?.airline;
  const [uri] =
    type === 'full' && !hasError
      ? [airline?.logoFullImageURL, airline?.logoFullImageType]
      : [airline?.logoCompactImageURL, airline?.logoCompactImageType];

  if (!airline && !query.loading) {
    return <Text style={[{ fontSize: height }]}>{iata}</Text>;
  } else if (!airline && query.loading) {
    return <View style={{ height }} />;
  }

  return (
    <Container
      style={[
        style,
        { height, maxWidth: width, maxHeight: height },
        ratio === -1 ? { opacity: 0 } : { aspectRatio: ratio },
      ]}
    >
      <Logo
        source={{ uri, priority: FastImage.priority.high }}
        resizeMode={FastImage.resizeMode.contain}
        onError={() => setHasError(true)}
        onLoad={(e) => setRatio(e.nativeEvent.width / e.nativeEvent.height)}
      />
    </Container>
  );
};
