import * as React from 'react';
import FastImage from 'react-native-fast-image';

import moment from 'moment';

import { DEGREE } from '@app/constants';
import { format } from '@app/lib/format';
import { List } from '@app/components/list';
import { Group } from '@app/components/group';
import { Typography } from '@app/components/typography';
import { LoadingOverlay } from '@app/components/loading.overlay';
import { useAirportWeatherQuery } from '@app/generated/server.gql';
import { useGetTemperatureDisplay } from '@app/lib/hooks/use.measurement.display';

import { useFlight } from './context';
import { SectionTile, TileLabel } from './styles';

type Props = {
  type: 'arrival' | 'departure';
};

export const AirportWeatherCard: React.FC<Props> = ({ type }) => {
  const flight = useFlight();
  const getTemperature = useGetTemperatureDisplay('celsius');
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

  return (
    <SectionTile style={{ minHeight: 100 }}>
      <LoadingOverlay isLoading={weather.loading} />
      <TileLabel>{airport.name} Weather at Departure</TileLabel>
      {weather.data?.airportWeather ? (
        <Group direction="row">
          <Group>
            <List
              data={[
                [
                  'Temp',
                  getTemperature(
                    weather.data.airportWeather.airTemperatureCelsius,
                  ),
                ],
                [
                  'Wind Speed',
                  weather.data.airportWeather.windSpeedMeterPerSecond,
                  'm/s',
                ],
                [
                  'Wind Direction',
                  format(
                    '%s%s',
                    weather.data.airportWeather.windFromDirectionDegrees,
                    DEGREE,
                  ),
                ],
              ]}
              renderItem={([label, value]) => {
                return (
                  <Group
                    direction="row"
                    style={{ justifyContent: 'space-between' }}
                    verticalAlign="center"
                  >
                    <Typography type="p1">{label}</Typography>
                    <Typography type="p1">{value}</Typography>
                  </Group>
                );
              }}
            />
          </Group>
          <Group gap="small">
            <FastImage
              source={{
                uri: weather.data.airportWeather.iconURL,
              }}
            />
          </Group>
        </Group>
      ) : (
        <Typography type="h1">Unavailable at this moment</Typography>
      )}
    </SectionTile>
  );
};
