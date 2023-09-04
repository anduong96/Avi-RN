import type { LinkingOptions } from '@react-navigation/native';
import type { MainStackParam } from './stacks';

export const LINKING_CONFIG: LinkingOptions<MainStackParam> = {
  prefixes: [
    'flywithavi://',
    'https://flywithavi.com',
    'https://*.flywithavi.com',
  ],
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
            path: 'flights/:flightID',
          },
        },
      },
    },
  },
};
