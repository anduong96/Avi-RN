import * as React from 'react';

import { useHasValue } from '../state/use.has.value';
import { FlightsResultSet } from './flights.result.set';
import { useFocusedInput } from '../state/use.focused.input';
import { TextSearchResultSet } from './text.search.result.set';
import { FlightNumberResultSet } from './flight.number.result.set';
import { DepartureDateResultSet } from './departure.date.result.set';

export const ResultSet: React.FC = () => {
  const hasTextSearch = useHasValue('textSearch');
  const hasAirlineIata = useHasValue('airlineIata');
  const hasFlightNumber = useHasValue('flightNumber');
  const hasDepartureDate = useHasValue('departureDate');
  const focusedInput = useFocusedInput();

  if (focusedInput === 'departureDate') {
    return <DepartureDateResultSet />;
  }

  if (!hasTextSearch && hasAirlineIata && hasFlightNumber && hasDepartureDate) {
    return <FlightsResultSet />;
  }

  if (!hasTextSearch) {
    return null;
  } else if (focusedInput === 'textSearch') {
    return <TextSearchResultSet />;
  } else if (focusedInput === 'airlineIata') {
    return <TextSearchResultSet />;
  } else if (focusedInput === 'flightNumber') {
    return <FlightNumberResultSet />;
  }

  return null;
};
