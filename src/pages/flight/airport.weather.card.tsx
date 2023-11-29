import * as React from 'react';
import FastImage from 'react-native-fast-image';

import moment from 'moment';
import Qty from 'js-quantities';

import { format } from '@app/lib/format';
import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';
import { CELSIUS, DEGREE, FAHRENHEIT } from '@app/constants';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { useAirportWeatherQuery } from '@app/generated/server.gql';
import { celsiusToFahrenheit } from '@app/lib/celsius.to.fahrenheit';
import { useIsAmericanSystem } from '@app/lib/hooks/use.measurement.system';

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
  const isAmericanSystem = useIsAmericanSystem();
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
  const [windSpeedMeasurement, rainMeasurement] = isAmericanSystem
    ? ['mi/h', 'in']
    : ['m/s', 'mm'];

  if (!airportWeather) {
    return null;
  }

  return (
    <SectionTile style={{ minHeight: 100 }}>
      <LoadingOverlay isLoading={weather.loading} />
      <TileLabel>{airport.cityName} weather</TileLabel>
      <Group gap="medium" style={{ width: '100%' }}>
        <Group
          direction="row"
          gap="large"
          horizontalAlign="center"
          verticalAlign="center"
        >
          <FastImage
            resizeMode="contain"
            source={{ uri: airportWeather.iconURL }}
            style={{ aspectRatio: 1, width: 120 }}
          />
          <Group direction="row" horizontalAlign="left" verticalAlign="top">
            <Typography isBold type="massive">
              {isAmericanSystem && temperature
                ? celsiusToFahrenheit(temperature)
                : temperature}
            </Typography>
            <Typography type="h2">
              {DEGREE}
              {isAmericanSystem ? CELSIUS : FAHRENHEIT}
            </Typography>
          </Group>
        </Group>
        <Group direction="row" gap="medium">
          <InnerTile flexBasis={1} flexGrow={1}>
            <InnerTileLabel>Wind Speed</InnerTileLabel>
            <InnerTileValue>
              {Math.round(
                Qty.swiftConverter('m/s', windSpeedMeasurement)(windSpeed!),
              )}{' '}
              {windSpeedMeasurement}
            </InnerTileValue>
          </InnerTile>
          <InnerTile flexBasis={1} flexGrow={1}>
            <InnerTileLabel>Rain</InnerTileLabel>
            <InnerTileValue>
              {rainAmount
                ? format(
                    '%s%s',
                    Math.round(
                      Qty.swiftConverter('mm', rainMeasurement)(rainAmount),
                    ),
                    rainMeasurement,
                  )
                : 'None'}
            </InnerTileValue>
          </InnerTile>
        </Group>
      </Group>
    </SectionTile>
  );
};
