import * as React from 'react';

import { useFlightSearchState } from '../state';
import { FlightsResultSet } from './flights.result.set';
import { AirportResultSet } from './airport.result.set';
import { AirlineResultSet } from './airline.result.set';
import { TextSearchResultSet } from './text.search.result.set';
import { FlightNumberResultSet } from './flight.number.result.set';
import { DepartureDateResultSet } from './departure.date.result.set';
import { FlightsWithAirportResultSet } from './flights.with.airport.result.set';

export const ResultSet: React.FC = () => {
  const focusedInput = useFlightSearchState((s) => s.focusInput);
  const hasAirports = useFlightSearchState(
    (s) => s.hasValue('originIata') && s.hasValue('destinationIata'),
  );
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
    return <AirlineResultSet />;
  } else if (focusedInput === 'flightNumber') {
    return <FlightNumberResultSet />;
  } else if (
    focusedInput === 'destinationIata' ||
    focusedInput === 'originIata'
  ) {
    return <AirportResultSet />;
  }

  if (hasAirlineIata && hasFlightNumber && hasDepartureDate) {
    return <FlightsResultSet />;
  } else if (hasAirlineIata && hasDepartureDate && hasAirports) {
    return <FlightsWithAirportResultSet />;
  }

  return null;
};
