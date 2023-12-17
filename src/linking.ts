import type { LinkingOptions } from '@react-navigation/native';

import type { MainStackParams } from './navigation';

import {
  AIRPORT_URL,
  APP_LINK,
  DOM_LINK,
  FLIGHT_URL,
  WEB_LINK,
} from './lib/deep.link';

function buildPath(...parts: string[]) {
  return parts.join('/');
}

export const LINKING_CONFIG: LinkingOptions<MainStackParams> = {
  config: {
    initialRouteName: 'Home',
    screens: {
      AirportStack: {
        screens: {
          Weather: {
            path: buildPath(
              AIRPORT_URL,
              'weather',
              ':year',
              ':month',
              ':date',
              ':hour',
            ),
          },
        },
      },
      Core: buildPath('c', ':slug'),
      FlightSearch: buildPath('flights', 'search'),
      FlightStack: {
        screens: {
          Course: {
            path: buildPath(FLIGHT_URL, 'course'),
          },
          Flight: {
            path: buildPath(FLIGHT_URL),
          },
          Ratings: {
            path: buildPath(FLIGHT_URL, 'ratings'),
          },
        },
      },
      FlightsArchive: {
        path: buildPath('flights', 'archived'),
      },
      Home: 'home',
      Marketing: buildPath('m', ':slug'),
      PrivacyPolicies: 'privacy',
      Profile: 'profile',
      TermsOfService: 'terms',
    },
  },
  prefixes: [APP_LINK, WEB_LINK, DOM_LINK],
};
