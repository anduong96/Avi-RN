import * as React from 'react';
import FastImage from 'react-native-fast-image';

import moment from 'moment';
import { startCase } from 'lodash';

import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { useAirportWeatherQuery } from '@app/generated/server.gql';
import { useRainConverter } from '@app/lib/weather/hooks/use.rain.converter';
import { useWindSpeedConverter } from '@app/lib/weather/hooks/use.wind.speed.converter';
import { useTemperatureConverter } from '@app/lib/weather/hooks/use.temperature.convert';

import { useFlight } from './context';
import {
  InnerTile,
  InnerTileLabel,
  InnerTileValue,
  SectionTile,
  TileLabel,
} from './styles';

type Props = {
  type: 'arrival' | 'departure';
};

export const AirportWeatherCard: React.FC<Props> = ({ type }) => {
  const flight = useFlight();
  const rainConverter = useRainConverter();
  const windSpeedConverter = useWindSpeedConverter();
  const temperatureConverter = useTemperatureConverter();
  const isDeparture = type === 'departure';
  const [airport, utcOffset, time] = isDeparture
    ? [flight.Origin, flight.originUtcHourOffset, flight.estimatedGateDeparture]
    : [
        flight.Destination,
        flight.destinationUtcHourOffset,
        flight.estimatedGateArrival,
      ];

  const adjustedTime = moment(time).utcOffset(utcOffset);
  const weather = useAirportWeatherQuery({
    errorPolicy: 'ignore',
    pollInterval: moment.duration({ minutes: 60 }).as('ms'),
    variables: {
      airportIata: airport.iata!,
      date: adjustedTime.date(),
      hour: adjustedTime.hour(),
      month: adjustedTime.month(),
      year: adjustedTime.year(),
    },
  });

  const airportWeather = weather.data?.airportWeather;
  const windSpeed = airportWeather?.windSpeedMeterPerSecond;
  const rainAmount = airportWeather?.precipitationAmountMillimeter;
  const temperature = airportWeather?.airTemperatureCelsius;

  if (!airportWeather) {
    return null;
  }

  return (
    <SectionTile gap={'large'} style={{ minHeight: 100 }}>
      <LoadingOverlay isLoading={weather.loading} />
      <TileLabel>{startCase(type)} weather</TileLabel>
      <Group width={'100%'}>
        <Group
          direction="row"
          gap="large"
          horizontalAlign="center"
          paddingVertical={'medium'}
          verticalAlign="center"
        >
          <FastImage
            fallback={require('@app/assets/airline.png')}
            resizeMode="contain"
            source={{ uri: airportWeather.iconURL }}
            style={{ aspectRatio: 1, height: 64 }}
          />
          <Group direction="row" horizontalAlign="left" verticalAlign="top">
            <Typography isBold type="h0">
              {temperatureConverter(temperature).value}
            </Typography>
            <Typography type="h2">
              {temperatureConverter(temperature).unit}
            </Typography>
          </Group>
        </Group>
        <Group>
          <Group direction="row" gap="small" marginTop={'medium'}>
            <InnerTile flexBasis={1} flexGrow={1}>
              <InnerTileLabel>Wind Speed</InnerTileLabel>
              <InnerTileValue>
                {windSpeed ? windSpeedConverter(windSpeed).label : 'None'}
              </InnerTileValue>
            </InnerTile>
            <InnerTile flexBasis={1} flexGrow={1}>
              <InnerTileLabel>Rain</InnerTileLabel>
              <InnerTileValue>
                {rainAmount ? rainConverter(rainAmount).label : 'None'}
              </InnerTileValue>
            </InnerTile>
          </Group>
        </Group>
      </Group>
    </SectionTile>
  );
};
