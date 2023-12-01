export const APP_LINK = 'flywithavi://' as const;
export const WEB_LINK = 'https://flywithavi.com' as const;
export const DOM_LINK = 'https://*.flywithavi.com' as const;

export const FLIGHT_URL = 'flights/:flightID';
export const AIRPORT_URL = 'airport/:airportIata';

export function buildFlightLink(flightID: string) {
  return APP_LINK + FLIGHT_URL.replace(':flightID', flightID);
}
