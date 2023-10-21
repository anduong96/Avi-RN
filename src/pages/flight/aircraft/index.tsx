import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Animated, { FadeIn } from 'react-native-reanimated';

import moment from 'moment';
import tinycolor from 'tinycolor2';

import { withStyled } from '@app/lib/styled';
import { Statistic } from '@app/components/statistic';
import { useAircraftQuery } from '@app/generated/server.gql';
import { LoadingOverlay } from '@app/components/loading.overlay';

type Props = {
  tailNumber: string;
};

export const AircraftCard: React.FC<Props> = ({ tailNumber }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const response = useAircraftQuery({
    variables: {
      tailNumber,
    },
  });

  const aircraft = response.data?.aircraft;
  const isLoading = response.loading || !imageLoaded;

  if (!aircraft) {
    return null;
  }

  return (
    <Container entering={FadeIn}>
      <Content>
        <LoadingOverlay isLoading={isLoading} />
        {aircraft && (
          <>
            <Image
              onLoad={() => setImageLoaded(true)}
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: aircraft.imageURL! }}
            />
            <Meta>
              <StatItem
                align="center"
                label="Tail Number"
                value={aircraft.tailNumber}
              />
              <StatItem align="center" label="Model" value={aircraft.model} />
              <StatItem
                align="center"
                label="Age"
                value={moment
                  .duration(moment().diff(aircraft.firstFlight))
                  .humanize()}
              />
            </Meta>
          </>
        )}
      </Content>
    </Container>
  );
};

const Container = withStyled(Animated.View, (theme) => [
  {
    backgroundColor: theme.pallette.background,
    borderRadius: theme.borderRadius,
    height: 200,
  },
]);

const Content = withStyled(View, (theme) => [
  {
    borderRadius: theme.borderRadius,
    flexGrow: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
]);

const Meta = withStyled(View, (theme) => [
  {
    alignItems: 'flex-start',
    backgroundColor: tinycolor(theme.pallette.card).setAlpha(0.8).toRgbString(),
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.space.medium,
    paddingVertical: theme.space.small,
  },
]);

const Image = withStyled(FastImage, (theme) => [
  StyleSheet.absoluteFillObject,
  {
    borderRadius: theme.borderRadius,
  },
]);

const StatItem = withStyled(
  Statistic,
  (theme) => [
    theme.presets.centered,
    {
      flexBasis: 1,
      flexGrow: 1,
      flexShrink: 1,
    },
  ],
  (theme) => ({
    valueStyle: [theme.typography.presets.p2],
  }),
);
