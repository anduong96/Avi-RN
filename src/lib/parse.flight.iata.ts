const regex = new RegExp(
  '^([A-Za-z]{2}|[A-Za-z]{3}|[A-Za-z][0-9]|[0-9][A-Za-z])([0-9]+[A-Za-z]?)$',
);

/**
 * The function `parseFlightIata` takes in a string representing a flight IATA code and returns an
 * object with the IATA code and flight number if they can be extracted from the input string,
 * otherwise it returns null.
 * @param {string} iataString - The `iataString` parameter is a string that represents a flight code in
 * the format "IATA-FlightNumber". The IATA code is a three-letter code that represents the airline,
 * and the flight number is a numeric value that represents the specific flight.
 * @returns The function `parseFlightIata` returns an object with properties `iata` and `flightNumber`
 * if both values are present in the `iataString`. If either `iata` or `flightNumber` is missing, the
 * function returns `null`.
 */
export function parseFlightIata(iataString: string) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, iata, flightNumber] = iataString.match(regex) ?? [];
  if (iata && flightNumber) {
    return {
      flightNumber,
      iata,
    };
  }

  return null;
}
