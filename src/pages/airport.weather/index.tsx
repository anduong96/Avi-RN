import type { RouteProp } from '@react-navigation/native';

import * as React from 'react';
import FastImage from 'react-native-fast-image';
import { FlatList, ScrollView, View } from 'react-native';

import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { groupBy, isNil, orderBy, size } from 'lodash';

import type { AirportStackParams } from '@app/navigation/airport.stack';

import { format } from '@app/lib/format';
import { logger } from '@app/lib/logger';
import { Card } from '@app/components/card';
import { List } from '@app/components/list';
import { withStyled } from '@app/lib/styled';
import { Group } from '@app/components/group';
import { getMaxMin } from '@app/lib/get.max.min';
import { useTheme } from '@app/lib/hooks/use.theme';
import { CloseBtn } from '@app/components/btn.close';
import { Typography } from '@app/components/typography';
import { PageHeader } from '@app/components/page.header';
import { useExitPage } from '@app/lib/hooks/use.exit.page';
import { PageContainer } from '@app/components/page.container';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { useTemperatureConverter } from '@app/lib/weather/hooks/use.temperature.convert';
import {
  useAirportQuery,
  useAirportWeatherDayQuery,
} from '@app/generated/server.gql';

import { getWeatherKey } from './get.weather.key';

export const AirportWeatherPage: React.FC = () => {
  const route = useRoute<RouteProp<AirportStackParams, 'Weather'>>();
  const exit = useExitPage();
  const theme = useTheme();
  const airportIata = route.params.airportIata;
  const hourList = React.useRef<FlatList>(null);
  const getTemperature = useTemperatureConverter();
  const { date, hour, month, year } = route.params;
  const weather = useAirportWeatherDayQuery({
    variables: {
      airportIata,
      date,
      month,
      year,
    },
  });
  const airport = useAirportQuery({
    variables: {
      airportIata,
    },
  });
  const data = weather.data?.airportWeatherDay;
  const todayKey = getWeatherKey(route.params);
  const weatherDays = groupBy(data, getWeatherKey);
  const sameDayWeather = weatherDays[todayKey];
  const orderedSameDayWeather = orderBy(
    sameDayWeather,
    (entry) => entry.hour,
    'asc',
  );

  React.useEffect(() => {
    if (sameDayWeather && hourList.current && !isNil(hour)) {
      setTimeout(() => {
        const sorted = orderBy(sameDayWeather, (entry) => entry.hour, 'asc');
        const hourIndex = sorted.findIndex((entry) => entry.hour === hour);

        logger.debug('Scrolling to hour=%s index=%s', hour, hourIndex);
        hourList.current?.scrollToIndex({
          animated: true,
          index: Math.max(0, hourIndex - 1),
        });
      }, 100);
    }
  }, [hourList, sameDayWeather, hour]);

  return (
    <PageContainer>
      <PageHeader
        rightActions={<CloseBtn onPress={exit} />}
        title={format("%s's Weather", airport.data?.airport?.name ?? '...')}
      />
      <Group flexGrow={1} padding={theme.pagePadding}>
        <LoadingOverlay
          backgroundColor={theme.pallette.background}
          isLoading={weather.loading}
        />
        <ScrollView contentContainerStyle={{ gap: theme.space.large }}>
          <Card title="Day forecast">
            <FlatList
              data={orderedSameDayWeather}
              horizontal
              keyExtractor={(entry) => entry.hour.toString()}
              onScrollToIndexFailed={() => {
                logger.debug('ScrollToIndexFailed');
                hourList.current?.scrollToIndex({
                  animated: false,
                  index: 0,
                });
              }}
              ref={hourList}
              renderItem={(entry: {
                item: (typeof sameDayWeather)[number];
              }) => {
                const isActive = entry.item.hour === hour;
                const tempC = entry.item.airTemperatureCelsius;
                const temperature = getTemperature(tempC);
                const color = isActive
                  ? theme.pallette.active
                  : theme.pallette.text;

                return (
                  <Group
                    gap={'large'}
                    horizontalAlign="center"
                    padding={'medium'}
                  >
                    <Typography color={color} isBold={isActive} type="p1">
                      {moment().set({ hour: entry.item.hour }).format('h A')}
                    </Typography>
                    <HourWeatherImage source={{ uri: entry.item.iconURL }} />
                    <Group>
                      <Typography color={color} isBold={isActive} type="p1">
                        {temperature.label}
                      </Typography>
                    </Group>
                  </Group>
                );
              }}
              showsHorizontalScrollIndicator={false}
            />
          </Card>
          <Card
            padding={'medium'}
            title={format('%s-Days forecast', size(weatherDays))}
          >
            <List
              data={Object.entries(weatherDays)}
              gap={theme.space.medium}
              keyExtractor={(entry) => entry[0]}
              renderItem={([label, hours]) => {
                const mid = Math.floor(hours.length / 2);
                const midIconUrl = hours[mid].iconURL;
                const values = getMaxMin(
                  hours,
                  (entry) => entry.airTemperatureCelsius,
                );
                const maxTemp = getTemperature(values.max);
                const minTemp = getTemperature(values.min);

                return (
                  <Group direction="row" gap="large" verticalAlign="center">
                    <Day>
                      <Typography isBold type="p1">
                        {label}
                      </Typography>
                    </Day>
                    <DayWeatherImage source={{ uri: midIconUrl }} />
                    <Temperature>
                      <Typography color="secondary">{minTemp.label}</Typography>
                      <Typography>{maxTemp.label}</Typography>
                    </Temperature>
                  </Group>
                );
              }}
            />
          </Card>
        </ScrollView>
      </Group>
    </PageContainer>
  );
};

const HourWeatherImage = withStyled(FastImage, () => ({
  aspectRatio: 1,
  flexGrow: 1,
  height: 50,
}));

const DayWeatherImage = withStyled(FastImage, () => ({
  aspectRatio: 1,
  height: 35,
}));

const Day = withStyled(View, () => [
  {
    flexBasis: 1,
    flexGrow: 1,
  },
]);

const Temperature = withStyled(View, {
  flexBasis: 2,
  flexDirection: 'row',
  flexGrow: 2,
  justifyContent: 'space-between',
});
