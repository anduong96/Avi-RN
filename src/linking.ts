import { APP_LINK, DOM_LINK, FLIGHT_URL, WEB_LINK } from './lib/deep.link';

import type { LinkingOptions } from '@react-navigation/native';
import type { MainStackParam } from './stacks';

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
      FlightSearchStack: {
        screens: {
          Search: {
            path: 'flights/search',
          },
        },
      },
      FlightStack: {
        screens: {
          Archived: {
            path: 'flights/archived',
          },
          Flight: {
            path: FLIGHT_URL,
          },
        },
      },
    },
  },
};
