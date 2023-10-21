import * as React from 'react';
import FastImage from 'react-native-fast-image';
import { type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';
import { useAirlinesQuery } from '@app/generated/server.gql';
import { useIsDarkMode } from '@app/lib/hooks/use.color.scheme';

type Props = {
  airlineIata: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export const AirlineLogoAvatar: React.FC<Props> = ({
  airlineIata,
  size = 50,
  style,
}) => {
  const isDark = useIsDarkMode();
  const request = useAirlinesQuery();
  const airlines = request.data?.airlines;
  const isVisible = useSharedValue(false);
  const match = React.useMemo(
    () => airlines?.find((airline) => airline.iata === airlineIata),
    [airlines, airlineIata],
  );
  const containerStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isVisible.value ? 1 : 0),
  }));

  const handleLoad = () => {
    isVisible.value = true;
  };

  return (
    <Container size={size} style={[style, containerStyle]}>
      <Logo
        defaultSource={
          isDark
            ? require('@app/assets/airline.png')
            : require('@app/assets/airline-dark.png')
        }
        onError={handleLoad}
        onLoad={handleLoad}
        resizeMode={FastImage.resizeMode.contain}
        source={{
          priority: FastImage.priority.high,
          uri: match?.logoCompactImageURL,
        }}
      />
    </Container>
  );
};

const Container = withStyled<
  Required<Pick<Props, 'size'>>,
  typeof Animated.View
>(Animated.View, (theme, props) => [
  theme.presets.centered,
  {
    aspectRatio: 1,
    borderRadius: props.size,
    height: props.size,
    overflow: 'hidden',
    padding: props.size / 10,
  },
]);

const Logo = withStyled(FastImage, () => ({
  height: '100%',
  width: '100%',
}));
