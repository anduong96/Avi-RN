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
      FlightStack: {
        screens: {
          Flight: {
            path: 'flights/:flightID',
          },
        },
      },
    },
  },
};
