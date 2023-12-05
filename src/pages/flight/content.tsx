import * as React from 'react';
import { ScrollView, View } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useSharedValue,
} from 'react-native-reanimated';

import type { ScrollViewProps, ViewProps } from 'react-native';

import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';

import { FILLER } from '@app/constants';
import { logger } from '@app/lib/logger';
import { Card } from '@app/components/card';
import { withStyled } from '@app/lib/styled';
import { Group } from '@app/components/group';
import { vibrate } from '@app/lib/haptic.feedback';
import { useTheme } from '@app/lib/hooks/use.theme';
import { VerticalDivider } from '@app/components/divider.vertical';
import { SaveFlightButton } from '@app/components/button.save.flight';
import { HorizontalDivider } from '@app/components/divider.horizontal';
import { BlurredBackground } from '@app/components/blurred/background';
import { AlertFlightButton } from '@app/components/button.alerts.flight';

import { Meta } from './meta';
import { TsaCard } from './tsa';
import { Header } from './header';
import { TravelMap } from './travel.map';
import { ProgressBar } from './progress.bar';
import { AirportCard } from './airport.card';
import { AircraftCard } from './aircraft.card';
import { EmissionCard } from './emission.card';
import { FlightSectionEnum } from './constants';
import { GateTimeCard } from './gate.time.card';
import { SectionHeader } from './section.header';
import { useFlight, useFlightID } from './context';
import { PromptnessCompact } from './promptness.compact';
import { TimezoneChangeCard } from './timezone.change.card';
import { AirportWeatherCard } from './airport.weather.card';
import { useFlightDuration } from './hooks/use.flight.duration';
import { useFlightDistance } from './hooks/use.flight.distance';
import { Section, SectionTile, TileLabel, TileValue } from './styles';

export const FlightContent: React.FC = () => {
  const flight = useFlight();
  const theme = useTheme();
  const flightID = useFlightID();
  const flightDuration = useFlightDuration();
  const flightDistance = useFlightDistance();
  const container = React.useRef<ScrollView>(null);
  const scrollPositionY = useSharedValue(0);
  const metaSection = React.useRef<View>(null);
  const arrivalSection = React.useRef<View>(null);
  const departureSection = React.useRef<View>(null);
  const inFlightSection = React.useRef<View>(null);
  const arrivalSectionY = useSharedValue(0);
  const departureSectionY = useSharedValue(0);
  const inFlightSectionY = useSharedValue(0);
  const metaSectionY = useSharedValue(0);
  const metaSectionHeight = React.useRef(0);
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
                borderRadius: theme.borderRadius,
                margin: theme.space.medium,
                overflow: 'hidden',
                padding: theme.space.medium,
              },
              {
                borderRadius: metaBorderRadius,
                margin: metaMarginHorizontal,
              },
            ]}
          >
            <BlurredBackground blurType="dark" />
            <Meta />
          </Animated.View>
        </Group>
        <Group gap="large" paddingVertical="large">
          {/* -------------------------------------------------------------------------- */
          /*                           Flight Overview Section                          */
          /* -------------------------------------------------------------------------- */}
          <Group direction="row" paddingHorizontal="medium">
            <Header />
          </Group>
          <HorizontalDivider size="medium" />
          {/* -------------------------------------------------------------------------- */
          /*                                 Action Section                              */
          /* -------------------------------------------------------------------------- */}

          <Group
            direction="row"
            gap="small"
            horizontalAlign="center"
            paddingHorizontal="medium"
            verticalAlign="center"
            width="100%"
          >
            <SaveFlightButton flightID={flightID} />
            <VerticalDivider />
            <AlertFlightButton flightID={flightID} />
          </Group>
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
              <Card
                gap="medium"
                title={<SectionHeader section={FlightSectionEnum.DEPARTURE} />}
                type="transparent"
              >
                <Section>
                  <AirportCard type="departure" />
                </Section>
                <Section direction="row" gap="tiny">
                  <SectionTile>
                    <TileLabel>Terminal</TileLabel>
                    <TileValue>{flight.originTerminal ?? FILLER}</TileValue>
                  </SectionTile>
                  <SectionTile>
                    <TileLabel>Gate</TileLabel>
                    <TileValue>{flight.originGate ?? FILLER}</TileValue>
                  </SectionTile>
                </Section>
                <Section>
                  <GateTimeCard type="departure" />
                </Section>
                <Section>
                  <PromptnessCompact />
                </Section>
                <Section>
                  <TsaCard />
                </Section>
                <Section>
                  <AirportWeatherCard type="departure" />
                </Section>
              </Card>
            </View>
            {/* -------------------------------------------------------------------------- */
            /*                              In-Flight Section                             */
            /* -------------------------------------------------------------------------- */}
            <View
              collapsable={false}
              onLayout={handleSectionLayout(FlightSectionEnum.IN_FLIGHT)}
              ref={inFlightSection}
            >
              <Card
                gap="medium"
                title={<SectionHeader section={FlightSectionEnum.IN_FLIGHT} />}
                type="transparent"
              >
                <Section direction="row" gap="tiny">
                  <SectionTile>
                    <TileLabel>Duration</TileLabel>
                    <TileValue>{flightDuration}</TileValue>
                  </SectionTile>
                  <SectionTile>
                    <TileLabel>Distance</TileLabel>
                    <TileValue>{flightDistance}</TileValue>
                  </SectionTile>
                </Section>
                <Section>
                  <AircraftCard />
                </Section>
                <Section>
                  <EmissionCard />
                </Section>
              </Card>
            </View>
            {/* -------------------------------------------------------------------------- */
            /*                              Arrival Section                              */
            /* -------------------------------------------------------------------------- */}
            <View
              collapsable={false}
              onLayout={handleSectionLayout(FlightSectionEnum.ARRIVAL)}
              ref={arrivalSection}
            >
              <Card
                gap="medium"
                title={<SectionHeader section={FlightSectionEnum.ARRIVAL} />}
                type="transparent"
              >
                <Section>
                  <AirportCard type="arrival" />
                </Section>
                <Section direction="row" gap="tiny">
                  <SectionTile>
                    <TileLabel>Terminal</TileLabel>
                    <TileValue>
                      {flight.destinationTerminal ?? FILLER}
                    </TileValue>
                  </SectionTile>
                  <SectionTile>
                    <TileLabel>Gate</TileLabel>
                    <TileValue>{flight.destinationGate ?? FILLER}</TileValue>
                  </SectionTile>
                  <SectionTile>
                    <TileLabel>Baggage</TileLabel>
                    <TileValue>
                      {flight.destinationBaggageClaim ?? FILLER}
                    </TileValue>
                  </SectionTile>
                </Section>
                <Section>
                  <GateTimeCard type="arrival" />
                </Section>
                <Section>
                  <TimezoneChangeCard />
                </Section>
                <Section>
                  <AirportWeatherCard type="arrival" />
                </Section>
              </Card>
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
