import * as React from 'react';
import { ScrollView, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';

import type { ScrollViewProps, ViewProps } from 'react-native';

import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';

import { ENV } from '@app/env';
import { logger } from '@app/lib/logger';
import { withStyled } from '@app/lib/styled';
import { Group } from '@app/components/group';
import { DOT_SEPARATOR } from '@app/constants';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { Typography } from '@app/components/typography';
import { FaIcon } from '@app/components/icons.fontawesome';
import { SpaceVertical } from '@app/components/space.vertical';
import { VerticalDivider } from '@app/components/divider.vertical';
import { SaveFlightButton } from '@app/components/button.save.flight';
import { HorizontalDivider } from '@app/components/divider.horizontal';
import { BlurredBackground } from '@app/components/blurred/background';
import { AirlineLogoAvatar } from '@app/components/airline.logo.avatar';
import { ShareFlightButton } from '@app/components/button.share.flight';
import { FlightArrivalIcon } from '@app/components/icon.flight.arrival';
import { AlertFlightButton } from '@app/components/button.alerts.flight';
import { FlightDepartureIcon } from '@app/components/icon.flight.departure';
import { DebugNotificationFlightBtn } from '@app/components/button.debug.notification.flight';
import {
  transformFlightData,
  useFlightStatusColor,
} from '@app/lib/transformers/transform.flight.data';

import { TsaCard } from './tsa';
import { TravelMap } from './travel.map';
import { ProgressBar } from './progress.bar';
import { AircraftCard } from './aircraft.card';
import { EmissionCard } from './emission.card';
import { useFlight, useFlightID } from './context';
import { PromptnessCompact } from './promptness.compact';
import { useSectionColor } from './hooks/use.section.color';
import { FlightDistanceCard } from './flight.distance.card';
import { FlightDurationCard } from './flight.duration.card';
import { FlightSection, FlightSectionEnum } from './constants';

export const FlightContent: React.FC = () => {
  const theme = useTheme();
  const flight = useFlight();
  const flightID = useFlightID();
  const data = transformFlightData(flight);
  const container = React.useRef<ScrollView>(null);
  const scrollPositionY = useSharedValue(0);
  const arrivalColor = useFlightStatusColor(data?.destination.status);
  const departureColor = useFlightStatusColor(data?.origin.status);
  const metaSection = React.useRef<View>(null);
  const arrivalSection = React.useRef<View>(null);
  const departureSection = React.useRef<View>(null);
  const inFlightSection = React.useRef<View>(null);
  const arrivalSectionY = useSharedValue(0);
  const departureSectionY = useSharedValue(0);
  const inFlightSectionY = useSharedValue(0);
  const metaSectionY = useSharedValue(0);
  const metaSectionHeight = React.useRef(0);
  const getSectionColor = useSectionColor();
  const metaMarginHorizontal = useSharedValue(theme.space.medium);
  const metaBorderRadius = useSharedValue(theme.borderRadius);

  const scrollToY = (y: number) => {
    logger.debug('Scrolling to y=%s', y);

    container.current?.scrollTo({
      animated: true,
      y: y,
    });
  };

  const handleScroll: ScrollViewProps['onScroll'] = (event) => {
    const y = event.nativeEvent.contentOffset.y;
    scrollPositionY.value = y;
    metaMarginHorizontal.value = interpolate(
      y,
      [0, metaSectionY.value - 30, metaSectionY.value],
      [theme.space.medium, theme.space.tiny, 0],
      Extrapolate.CLAMP,
    );
    metaBorderRadius.value = interpolate(
      y,
      [0, metaSectionY.value],
      [theme.borderRadius, 0],
      Extrapolate.CLAMP,
    );
  };

  const scrollToSection = (section: FlightSectionEnum) => {
    const y =
      section === FlightSectionEnum.DEPARTURE
        ? departureSectionY.value
        : section === FlightSectionEnum.IN_FLIGHT
          ? inFlightSectionY.value
          : section === FlightSectionEnum.ARRIVAL
            ? arrivalSectionY.value
            : undefined;

    logger.debug('Scrolling to section=%s y=%s', section, y);

    if (y) {
      vibrate('impactLight');
      scrollToY(Math.max(0, y - metaSectionHeight.current));
    }
  };

  const handleSectionLayout = (
    section: FlightSectionEnum,
  ): ViewProps['onLayout'] => {
    return () => {
      const [target, targetY] =
        section === FlightSectionEnum.DEPARTURE
          ? [departureSection, departureSectionY]
          : section === FlightSectionEnum.IN_FLIGHT
            ? [inFlightSection, inFlightSectionY]
            : section === FlightSectionEnum.ARRIVAL
              ? [arrivalSection, arrivalSectionY]
              : section === FlightSectionEnum.META
                ? [metaSection, metaSectionY]
                : [null, null];

      if (target?.current && targetY && container.current) {
        target.current.measureLayout(
          container.current.getInnerViewNode(),
          (_x, y) => {
            targetY.value = y;

            if (section === FlightSectionEnum.META) {
              metaSectionHeight.current = y;
            }
          },
        );
      }
    };
  };

  return (
    <Group>
      <Container
        onScroll={handleScroll}
        ref={container}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <TravelMap height={250} />
        <Group>
          <Animated.View
            onLayout={handleSectionLayout(FlightSectionEnum.META)}
            ref={metaSection}
            style={[
              {
                borderRadius: metaBorderRadius,
                margin: metaMarginHorizontal,
                overflow: 'hidden',
                padding: theme.space.medium,
              },
            ]}
          >
            <BlurredBackground blurType="dark" />
            <Group
              direction="row"
              gap="small"
              horizontalAlign="center"
              verticalAlign="center"
            >
              <Group direction="row" gap="tiny" verticalAlign="center">
                <AirlineLogoAvatar
                  airlineIata={flight.airlineIata}
                  size={theme.typography.presets.h2.fontSize}
                />
                <Typography isBold type="p1">
                  {flight.airlineIata}
                  {` `}
                  {flight.flightNumber}
                </Typography>
              </Group>
              <Typography isBold type="p1">
                {DOT_SEPARATOR}
              </Typography>
              <Typography isBold type="p1">
                {data.origin.time.format('MMM D, YYYY')}
              </Typography>
            </Group>
          </Animated.View>
        </Group>
        <Group gap="large" paddingVertical="large">
          {/* -------------------------------------------------------------------------- */
          /*                           Flight Overview Section                          */
          /* -------------------------------------------------------------------------- */}
          <Group direction="row" paddingHorizontal="medium">
            <Group horizontalAlign="left">
              <Typography type="massive">{flight.Origin.iata}</Typography>
              <Typography color="secondary" type="p1">
                {flight.Origin.cityName || flight.Origin.cityCode}
              </Typography>
              <SpaceVertical />
              <Group direction="row" gap={'small'} isCentered>
                <FlightDepartureIcon color={departureColor} />
                <Typography color={departureColor} isBold type="h2">
                  {data.origin.time.format('h:mm A')}
                </Typography>
              </Group>
            </Group>
            <Group flexGrow={1} horizontalAlign="center">
              <SpaceVertical
                size={theme.typography.presets.massive.fontSize / 2}
              />
              <FaIcon name="arrow-right" />
            </Group>
            <Group horizontalAlign="right">
              <Typography type="massive">{flight.Destination.iata}</Typography>
              <Typography color="secondary" type="p1">
                {flight.Destination.cityName || flight.Destination.cityCode}
              </Typography>
              <SpaceVertical />
              <Group direction="row" gap={'small'} isCentered>
                <Typography color={arrivalColor} isBold type="h2">
                  {data.destination.time.format('h:mm A')}
                </Typography>
                <FlightArrivalIcon color={arrivalColor} />
              </Group>
            </Group>
          </Group>
          <HorizontalDivider size="medium" />
          {/* -------------------------------------------------------------------------- */
          /*                                 Action Section                              */
          /* -------------------------------------------------------------------------- */}
          <ScrollView
            contentContainerStyle={{ paddingRight: WINDOW_WIDTH / 3 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <Group
              direction="row"
              gap="small"
              paddingHorizontal="medium"
              verticalAlign="center"
            >
              <SaveFlightButton flightID={flightID} />
              <VerticalDivider />
              <AlertFlightButton flightID={flightID} />
              <ShareFlightButton flightID={flightID} />
              {ENV.APP_ENV !== 'production' && (
                <>
                  <VerticalDivider />
                  <DebugNotificationFlightBtn flightID={flightID} />
                </>
              )}
            </Group>
          </ScrollView>
          <HorizontalDivider size="medium" />
          <Group gap="xLarge">
            {/* -------------------------------------------------------------------------- */
            /*                              Departure Section                             */
            /* -------------------------------------------------------------------------- */}
            <View
              collapsable={false}
              onLayout={handleSectionLayout(FlightSectionEnum.DEPARTURE)}
              ref={departureSection}
            >
              <Group gap="medium">
                <Group
                  direction="row"
                  gap="medium"
                  paddingHorizontal="medium"
                  verticalAlign="center"
                >
                  <FaIcon
                    color={getSectionColor(FlightSectionEnum.DEPARTURE)}
                    name={FlightSection[FlightSectionEnum.DEPARTURE].icon}
                    size={15}
                  />
                  <Typography isBold type="h1">
                    {FlightSection[FlightSectionEnum.DEPARTURE].label}
                  </Typography>
                </Group>
                <Group paddingHorizontal="medium">
                  <PromptnessCompact />
                </Group>
                <Group paddingHorizontal="medium">
                  <TsaCard />
                </Group>
              </Group>
            </View>
            {/* -------------------------------------------------------------------------- */
            /*                              In-Flight Section                             */
            /* -------------------------------------------------------------------------- */}
            <View
              collapsable={false}
              onLayout={handleSectionLayout(FlightSectionEnum.IN_FLIGHT)}
              ref={inFlightSection}
            >
              <Group gap="medium">
                <Group
                  direction="row"
                  gap="medium"
                  paddingHorizontal="medium"
                  verticalAlign="center"
                >
                  <FaIcon
                    color={getSectionColor(FlightSectionEnum.IN_FLIGHT)}
                    name={FlightSection[FlightSectionEnum.IN_FLIGHT].icon}
                    size={15}
                  />
                  <Typography isBold type="h1">
                    {FlightSection[FlightSectionEnum.IN_FLIGHT].label}
                  </Typography>
                </Group>
                <Group direction="row" gap="tiny" paddingHorizontal="medium">
                  <Group flexBasis={1} flexGrow={1} height={'100%'}>
                    <FlightDurationCard />
                  </Group>
                  <Group flexBasis={1} flexGrow={1} height={'100%'}>
                    <FlightDistanceCard />
                  </Group>
                </Group>
                <Group paddingHorizontal="medium">
                  <AircraftCard />
                </Group>
                <Group paddingHorizontal="medium">
                  <EmissionCard />
                </Group>
              </Group>
            </View>
            {/* -------------------------------------------------------------------------- */
            /*                              Arrival Section                              */
            /* -------------------------------------------------------------------------- */}
            <View
              collapsable={false}
              onLayout={handleSectionLayout(FlightSectionEnum.ARRIVAL)}
              ref={arrivalSection}
            >
              <Group gap="medium">
                <Group
                  direction="row"
                  gap="medium"
                  paddingHorizontal="medium"
                  verticalAlign="center"
                >
                  <FaIcon
                    color={getSectionColor(FlightSectionEnum.ARRIVAL)}
                    name={FlightSection[FlightSectionEnum.ARRIVAL].icon}
                    size={15}
                  />
                  <Typography isBold type="h1">
                    {FlightSection[FlightSectionEnum.ARRIVAL].label}
                  </Typography>
                </Group>
              </Group>
            </View>
          </Group>
        </Group>
      </Container>
      <ProgressBar
        onScrollY={scrollToY}
        onSectionPress={scrollToSection}
        scrollY={scrollPositionY}
      />
    </Group>
  );
};

const Container = withStyled(ScrollView, undefined, (theme) => ({
  contentContainerStyle: {
    flexGrow: 1,
    gap: theme.space.small,
    paddingBottom: WINDOW_HEIGHT * 0.3,
  },
  showsVerticalScrollIndicator: false,
}));
