import type { AirportWeather } from '@app/generated/server.gql';

import { formatRelativeDay } from '@app/lib/format.date';

export function getWeatherKey(
  entry: Pick<AirportWeather, 'date' | 'month' | 'year'>,
) {
  return formatRelativeDay({
    date: entry.date,
    month: entry.month,
    year: entry.year,
  });
}
