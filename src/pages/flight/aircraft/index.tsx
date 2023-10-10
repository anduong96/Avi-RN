import { LoadingOverlay } from '@app/components/loading.overlay';
import { Statistic } from '@app/components/statistic';
import { useAircraftQuery } from '@app/generated/server.gql';
import { styled } from '@app/lib/styled';
import { BlurView } from '@react-native-community/blur';
import moment from 'moment';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { FadeIn } from 'react-native-reanimated';

type Props = {
  tailNumber: string;
};

export const AircraftCard: React.FC<Props> = ({ tailNumber }) => {
  const response = useAircraftQuery({
    variables: {
      tailNumber,
    },
  });

  const aircraft = response.data?.aircraft;

  if (!aircraft) {
    return null;
  }

  return (
    <Container entering={FadeIn}>
      <LoadingOverlay isDark isLoading={response.loading} />
      {aircraft && (
        <>
          <Image
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: aircraft.imageURL! }}
          />
          <Meta blurType="xlight">
            <StatItem label="Tail Number" value={aircraft.tailNumber} />
            <StatItem label="Model" value={aircraft.model} />
            <StatItem
              label="Age"
              value={moment
                .duration(moment().diff(aircraft.firstFlight))
                .humanize()}
            />
          </Meta>
        </>
      )}
    </Container>
  );
};

const Container = styled(Animated.View, (theme) => [
  theme.presets.shadows[100],
  {
    borderRadius: theme.borderRadius,
    height: 200,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    backgroundColor: theme.pallette.background,
  },
]);

const Meta = styled(Animated.createAnimatedComponent(BlurView), (theme) => [
  {
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.small,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
]);

const Image = styled(FastImage, (theme) => [
  StyleSheet.absoluteFillObject,
  {
    borderRadius: theme.borderRadius,
  },
]);

const StatItem = styled(
  Statistic,
  () => [
    {
      flexBasis: 1,
      flexGrow: 1,
    },
  ],
  (theme) => ({
    labelStyle: [
      {
        color: theme.pallette.grey[700],
      },
    ],
    valueStyle: [theme.typography.presets.p2],
  }),
);
