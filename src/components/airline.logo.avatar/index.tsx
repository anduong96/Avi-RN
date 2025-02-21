import * as React from 'react';
import FastImage from 'react-native-fast-image';
import { Image, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { withStyled } from '@app/lib/styled';
import { useTheme } from '@app/lib/hooks/use.theme';
import { useAirlinesQuery } from '@app/generated/server.gql';

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
  const theme = useTheme();
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
  const hasSource = !!match?.logoCompactImageURL;
  const fallback = theme.isDark
    ? require('@app/assets/airline.png')
    : require('@app/assets/airline-dark.png');

  const handleLoad = () => {
    isVisible.value = true;
  };

  return (
    <Container
      hasSource={hasSource}
      size={size}
      style={[style, containerStyle]}
    >
      {hasSource ? (
        <Logo
          fallback={fallback}
          onError={handleLoad}
          onLoad={handleLoad}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            priority: FastImage.priority.high,
            uri: match!.logoCompactImageURL!,
          }}
        />
      ) : (
        <FallbackLogo
          onError={handleLoad}
          onLoad={handleLoad}
          resizeMode={FastImage.resizeMode.contain}
          source={fallback}
        />
      )}
    </Container>
  );
};

const Container = withStyled<
  Required<Pick<Props, 'size'> & { hasSource: boolean }>,
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
  !props.hasSource && {
    backgroundColor: theme.pallette.grey[50],
    padding: props.size / 5,
  },
]);

const Logo = withStyled(FastImage, () => ({
  height: '100%',
  width: '100%',
}));

const FallbackLogo = withStyled(Image, () => ({
  height: '100%',
  width: '100%',
}));
