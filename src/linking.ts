import { APP_LINK, DOM_LINK, FLIGHT_URL, WEB_LINK } from './lib/deep.link';

import type { LinkingOptions } from '@react-navigation/native';
import type { MainStackParam } from './stacks';

function buildPath(...parts: string[]) {
  return parts.join('/');
}

export const LINKING_CONFIG: LinkingOptions<MainStackParam> = {
  prefixes: [APP_LINK, WEB_LINK, DOM_LINK],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: 'home',
      Profile: 'profile',
      Settings: 'settings',
      PrivacyPolicies: 'privacy',
      TermsOfService: 'terms',
      FlightSearch: buildPath('flights', 'search'),
      FlightStack: {
        screens: {
          Archived: {
            path: buildPath('flights', 'archived'),
          },
          Flight: {
            path: buildPath(FLIGHT_URL),
          },
          Course: {
            path: buildPath(FLIGHT_URL, 'course'),
          },
          Ratings: {
            path: buildPath(FLIGHT_URL, 'ratings'),
          },
        },
      },
    },
  },
};
