import * as React from 'react';
import { Dimensions } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import Lottie from 'lottie-react-native';

import { format } from '@app/lib/format';
import { Group } from '@app/components/group';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';

function calculateRotationAngle(width: number, height: number): number {
  const angleRad = Math.atan2(height, width);
  const angleDeg = angleRad * (180 / Math.PI);
  return 125 + angleDeg;
}

export const EmptyFlights: React.FC = () => {
  const theme = useTheme();
  const rotation = format(
    '%sdeg',
    calculateRotationAngle(
      Dimensions.get('screen').width,
      Dimensions.get('screen').height,
    ),
  );

  return (
    <Group
      flexGrow={1}
      gap={'large'}
      horizontalAlign="right"
      paddingHorizontal={'medium'}
      style={{ backgroundColor: 'transparent' }}
      verticalAlign="center"
    >
      <Lottie
        autoPlay
        colorFilters={[{ color: theme.pallette.text, keypath: 'Line' }]}
        loop={false}
        resizeMode="contain"
        source={require('./lottie.arrow.json')}
        speed={0.7}
        style={{
          aspectRatio: 1,
          transform: [
            {
              rotate: rotation,
            },
          ],
          width: 300,
        }}
      />
      <Animated.View entering={FadeInDown}>
        <Typography isBoldest textAlign="right" type="p1">
          Start here!
        </Typography>
      </Animated.View>
    </Group>
  );
};
