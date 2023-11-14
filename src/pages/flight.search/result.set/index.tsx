import * as React from 'react';

import { useFlightSearchState } from '../state';
import { FlightsResultSet } from './flights.result.set';
import { TextSearchResultSet } from './text.search.result.set';
import { FlightNumberResultSet } from './flight.number.result.set';
import { DepartureDateResultSet } from './departure.date.result.set';

export const ResultSet: React.FC = () => {
  const focusedInput = useFlightSearchState((s) => s.focusInput);
  const hasAirlineIata = useFlightSearchState((s) => s.hasValue('airlineIata'));
  const hasFlightNumber = useFlightSearchState((s) =>
    s.hasValue('flightNumber'),
  );
  const hasDepartureDate = useFlightSearchState((s) =>
    s.hasValue('departureDate'),
  );

  if (focusedInput === 'departureDate') {
    return <DepartureDateResultSet />;
  } else if (focusedInput === 'textSearch') {
    return <TextSearchResultSet />;
  } else if (focusedInput === 'airlineIata') {
    return <TextSearchResultSet />;
  } else if (focusedInput === 'flightNumber') {
    return <FlightNumberResultSet />;
  }

  if (hasAirlineIata && hasFlightNumber && hasDepartureDate) {
    return <FlightsResultSet />;
  }

  return null;
};
