import type { LinkingOptions } from '@react-navigation/native';

import type { MainStackParam } from './navigation';

import { APP_LINK, DOM_LINK, FLIGHT_URL, WEB_LINK } from './lib/deep.link';

function buildPath(...parts: string[]) {
  return parts.join('/');
}

export const LINKING_CONFIG: LinkingOptions<MainStackParam> = {
  config: {
    initialRouteName: 'Home',
    screens: {
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
      PrivacyPolicies: 'privacy',
      Profile: 'profile',
      Settings: 'settings',
      TermsOfService: 'terms',
    },
  },
  prefixes: [APP_LINK, WEB_LINK, DOM_LINK],
};
