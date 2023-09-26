import * as React from 'react';

import type { StyleProp, ViewStyle } from 'react-native';
import { Text, View } from 'react-native';
import { styled } from '@app/lib/styled';
import FastImage from 'react-native-fast-image';

type Props = {
  iata: string;
  uri: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export const AirlineLogoAvatar: React.FC<Props> = ({
  iata,
  uri,
  style,
  size = 50,
}) => {
  const [hasError, setHasError] = React.useState(false);

  return (
    <Container style={[style]} size={size}>
      {hasError && <Name>{iata}</Name>}
      {!hasError && (
        <Logo
          source={{ uri, priority: FastImage.priority.high }}
          resizeMode={FastImage.resizeMode.contain}
          onError={() => setHasError(true)}
        />
      )}
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

const Name = styled(Text, (theme) => ({
  color: theme.pallette.grey[400],
  fontSize: theme.typography.presets.small.fontSize,
  fontWeight: '900',
}));
