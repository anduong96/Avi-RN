import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type Aircraft = {
  __typename?: 'Aircraft';
  AircraftPositions: Array<AircraftPosition>;
  airlineIata: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  firstFlight: Scalars['DateTimeISO']['output'];
  iata?: Maybe<Scalars['String']['output']>;
  icao: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  imageURL?: Maybe<Scalars['String']['output']>;
  model: Scalars['String']['output'];
  tailNumber: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type AircraftPosition = {
  __typename?: 'AircraftPosition';
  aircraftID: Scalars['Int']['output'];
  airlineIata: Scalars['String']['output'];
  altitude?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  destinationIata: Scalars['String']['output'];
  flightDate: Scalars['Int']['output'];
  flightMonth: Scalars['Int']['output'];
  flightNumber: Scalars['String']['output'];
  flightYear: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  latitude?: Maybe<Scalars['Int']['output']>;
  longitude?: Maybe<Scalars['Int']['output']>;
  originIata: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type Airline = {
  __typename?: 'Airline';
  iata: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  isLowCost: Scalars['Boolean']['output'];
  logoCompactImageType: ImageType;
  logoCompactImageURL: Scalars['String']['output'];
  logoFullImageType: ImageType;
  logoFullImageURL: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Airport = {
  __typename?: 'Airport';
  cityCode: Scalars['String']['output'];
  cityName: Scalars['String']['output'];
  countryCode: Scalars['String']['output'];
  countyName?: Maybe<Scalars['String']['output']>;
  elevation?: Maybe<Scalars['Int']['output']>;
  iata: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  latitude: Scalars['Int']['output'];
  longitude: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  state?: Maybe<Scalars['String']['output']>;
  timezone: Scalars['String']['output'];
};

export type Flight = {
  __typename?: 'Flight';
  Airline: Airline;
  Destination: Airport;
  Origin: Airport;
  actualGateArrival?: Maybe<Scalars['DateTimeISO']['output']>;
  actualGateDeparture?: Maybe<Scalars['DateTimeISO']['output']>;
  aircraftTailNumber?: Maybe<Scalars['String']['output']>;
  airlineIata: Scalars['String']['output'];
  destinationBaggageClaim?: Maybe<Scalars['String']['output']>;
  destinationGate?: Maybe<Scalars['String']['output']>;
  destinationIata: Scalars['String']['output'];
  destinationTerminal?: Maybe<Scalars['String']['output']>;
  estimatedGateArrival: Scalars['DateTimeISO']['output'];
  estimatedGateDeparture: Scalars['DateTimeISO']['output'];
  flightDate: Scalars['Int']['output'];
  flightMonth: Scalars['Int']['output'];
  flightNumber: Scalars['String']['output'];
  flightYear: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  originGate?: Maybe<Scalars['String']['output']>;
  originIata: Scalars['String']['output'];
  originTerminal?: Maybe<Scalars['String']['output']>;
  reconAttempt?: Maybe<Scalars['Int']['output']>;
  scheduledGateArrival: Scalars['DateTimeISO']['output'];
  scheduledGateDeparture: Scalars['DateTimeISO']['output'];
  status: FlightStatus;
  totalDistanceKm?: Maybe<Scalars['Int']['output']>;
};

export type FlightPromptness = {
  __typename?: 'FlightPromptness';
  airlineIata: Scalars['String']['output'];
  averageDelayTimeMs: Scalars['Int']['output'];
  cancelledCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  daysObserved: Scalars['Int']['output'];
  destinationIata: Scalars['String']['output'];
  divertedCount: Scalars['Int']['output'];
  excessiveCount: Scalars['Int']['output'];
  expiresAt: Scalars['DateTimeISO']['output'];
  flightNumber: Scalars['String']['output'];
  flightsObservered: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  lateCount: Scalars['Int']['output'];
  onTimeCount: Scalars['Int']['output'];
  onTimePercent: Scalars['Int']['output'];
  originIata: Scalars['String']['output'];
  rating: Scalars['Int']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  vendor: FlightVendor;
  veryLateCount: Scalars['Int']['output'];
};

export const FlightStatus = {
  ARCHIVED: 'ARCHIVED',
  ARRIVED: 'ARRIVED',
  CANCELED: 'CANCELED',
  DELAYED: 'DELAYED',
  DEPARTED: 'DEPARTED',
  LANDED: 'LANDED',
  SCHEDULED: 'SCHEDULED'
} as const;

export type FlightStatus = typeof FlightStatus[keyof typeof FlightStatus];
export const FlightVendor = {
  AERO_DATA_BOX: 'AERO_DATA_BOX',
  FLIGHT_STATS: 'FLIGHT_STATS'
} as const;

export type FlightVendor = typeof FlightVendor[keyof typeof FlightVendor];
export const ImageType = {
  PNG: 'PNG',
  SVG: 'SVG'
} as const;

export type ImageType = typeof ImageType[keyof typeof ImageType];
export type Mutation = {
  __typename?: 'Mutation';
  _sendFlightNotification: Scalars['Float']['output'];
  addUserFlight: Scalars['String']['output'];
  deleteUserFlight: Scalars['String']['output'];
  syncUser: Scalars['Boolean']['output'];
};


export type Mutation_SendFlightNotificationArgs = {
  body: Scalars['String']['input'];
  data?: InputMaybe<Scalars['JSON']['input']>;
  flightID: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationAddUserFlightArgs = {
  flightID: Scalars['String']['input'];
};


export type MutationDeleteUserFlightArgs = {
  flightID: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  aircraft?: Maybe<Aircraft>;
  aircraftPosition?: Maybe<AircraftPosition>;
  airline: Airline;
  airlines: Array<Airline>;
  airport: Airport;
  flight: Flight;
  flightPromptness: FlightPromptness;
  flights: Array<Flight>;
  randomFlight: Flight;
  user: User;
  userActiveFlights: Array<UserFlight>;
  userArchivedFlights: Array<UserFlight>;
  userFlight?: Maybe<UserFlight>;
  userHasFlights: Scalars['Boolean']['output'];
};


export type QueryAircraftArgs = {
  tailNumber: Scalars['String']['input'];
};


export type QueryAircraftPositionArgs = {
  aircraftID: Scalars['Float']['input'];
};


export type QueryAirlineArgs = {
  iata: Scalars['String']['input'];
};


export type QueryAirportArgs = {
  iata: Scalars['String']['input'];
};


export type QueryFlightArgs = {
  flightID: Scalars['String']['input'];
};


export type QueryFlightPromptnessArgs = {
  flightID: Scalars['String']['input'];
};


export type QueryFlightsArgs = {
  airlineIata: Scalars['String']['input'];
  date: Scalars['Float']['input'];
  flightNumber: Scalars['String']['input'];
  month: Scalars['Float']['input'];
  year: Scalars['Float']['input'];
};


export type QueryUserFlightArgs = {
  flightID: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  Authentications: Array<UserAuthentication>;
  avatarURL?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  lastSignInAt: Scalars['DateTimeISO']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type UserAuthentication = {
  __typename?: 'UserAuthentication';
  avatarURL?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  provider: Scalars['String']['output'];
  userID: Scalars['String']['output'];
};

export type UserFlight = {
  __typename?: 'UserFlight';
  Flight: Flight;
  createdAt: Scalars['DateTimeISO']['output'];
  flightID: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  shouldAlert: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  userID: Scalars['String']['output'];
};

export type AircraftQueryVariables = Exact<{
  tailNumber: Scalars['String']['input'];
}>;


export type AircraftQuery = { __typename?: 'Query', aircraft?: { __typename?: 'Aircraft', id: number, iata?: string | null, icao: string, model: string, airlineIata: string, description?: string | null, tailNumber: string, firstFlight: any, imageURL?: string | null, createdAt: any, updatedAt: any } | null };

export type AircraftPositionQueryVariables = Exact<{
  aircraftId: Scalars['Float']['input'];
}>;


export type AircraftPositionQuery = { __typename?: 'Query', aircraftPosition?: { __typename?: 'AircraftPosition', id: number, aircraftID: number, latitude?: number | null, longitude?: number | null, altitude?: number | null, flightYear: number, flightMonth: number, flightDate: number, flightNumber: string, airlineIata: string, originIata: string, destinationIata: string, createdAt: any, updatedAt: any } | null };

export type AirlinesQueryVariables = Exact<{ [key: string]: never; }>;


export type AirlinesQuery = { __typename?: 'Query', airlines: Array<{ __typename?: 'Airline', id: string, name: string, iata: string, logoCompactImageURL: string, logoCompactImageType: ImageType }> };

export type AirlineQueryVariables = Exact<{
  iata: Scalars['String']['input'];
}>;


export type AirlineQuery = { __typename?: 'Query', airline: { __typename?: 'Airline', id: string, name: string, iata: string, logoCompactImageURL: string, logoCompactImageType: ImageType, logoFullImageURL: string, logoFullImageType: ImageType } };

export type AirportQueryVariables = Exact<{
  iata: Scalars['String']['input'];
}>;


export type AirportQuery = { __typename?: 'Query', airport: { __typename?: 'Airport', id: string, name: string, iata: string, cityName: string, cityCode: string, timezone: string, state?: string | null, elevation?: number | null, countryCode: string, countyName?: string | null } };

export type DebugFlightNotificationMutationVariables = Exact<{
  flightID: Scalars['String']['input'];
  title: Scalars['String']['input'];
  body: Scalars['String']['input'];
  data?: InputMaybe<Scalars['JSON']['input']>;
}>;


export type DebugFlightNotificationMutation = { __typename?: 'Mutation', _sendFlightNotification: number };

export type FullFlightFragmentFragment = { __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, originIata: string, originTerminal?: string | null, originGate?: string | null, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL: string }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string } };

export type FindFlightsQueryVariables = Exact<{
  airlineIata: Scalars['String']['input'];
  flightNumber: Scalars['String']['input'];
  year: Scalars['Float']['input'];
  month: Scalars['Float']['input'];
  date: Scalars['Float']['input'];
}>;


export type FindFlightsQuery = { __typename?: 'Query', flights: Array<{ __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, originIata: string, originTerminal?: string | null, originGate?: string | null, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL: string }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string } }> };

export type GetFlightPromptnessQueryVariables = Exact<{
  flightID: Scalars['String']['input'];
}>;


export type GetFlightPromptnessQuery = { __typename?: 'Query', flightPromptness: { __typename?: 'FlightPromptness', onTimePercent: number, rating: number, averageDelayTimeMs: number } };

export type GetFlightQueryVariables = Exact<{
  flightID: Scalars['String']['input'];
}>;


export type GetFlightQuery = { __typename?: 'Query', flight: { __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, originIata: string, originTerminal?: string | null, originGate?: string | null, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL: string }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string } } };

export type GetRandomFlightQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRandomFlightQuery = { __typename?: 'Query', randomFlight: { __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, originIata: string, originTerminal?: string | null, originGate?: string | null, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL: string }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string } } };

export type GetUserActiveFlightsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserActiveFlightsQuery = { __typename?: 'Query', userActiveFlights: Array<{ __typename?: 'UserFlight', id: string, flightID: string, createdAt: any, shouldAlert: boolean, Flight: { __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, originIata: string, originTerminal?: string | null, originGate?: string | null, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL: string }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string } } }> };

export type GetUserArchivedFlightsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserArchivedFlightsQuery = { __typename?: 'Query', userArchivedFlights: Array<{ __typename?: 'UserFlight', id: string, flightID: string, createdAt: any, Flight: { __typename?: 'Flight', id: string, airlineIata: string, aircraftTailNumber?: string | null, flightNumber: string, originIata: string, originTerminal?: string | null, originGate?: string | null, status: FlightStatus, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, destinationBaggageClaim?: string | null, scheduledGateDeparture: any, scheduledGateArrival: any, estimatedGateDeparture: any, estimatedGateArrival: any, actualGateDeparture?: any | null, actualGateArrival?: any | null, Airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL: string }, Origin: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string }, Destination: { __typename?: 'Airport', id: string, name: string, cityName: string, countryCode: string, iata: string, timezone: string } } }> };

export type AddUserFlightMutationVariables = Exact<{
  flightID: Scalars['String']['input'];
}>;


export type AddUserFlightMutation = { __typename?: 'Mutation', addUserFlight: string };

export type DeleteUserFlightMutationVariables = Exact<{
  flightID: Scalars['String']['input'];
}>;


export type DeleteUserFlightMutation = { __typename?: 'Mutation', deleteUserFlight: string };

export type UserHasFlightsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserHasFlightsQuery = { __typename?: 'Query', userHasFlights: boolean };

export type UserFlightQueryVariables = Exact<{
  flightID: Scalars['String']['input'];
}>;


export type UserFlightQuery = { __typename?: 'Query', userFlight?: { __typename?: 'UserFlight', id: string, shouldAlert: boolean } | null };

export type SyncUserMutationVariables = Exact<{ [key: string]: never; }>;


export type SyncUserMutation = { __typename?: 'Mutation', syncUser: boolean };

export const FullFlightFragmentFragmentDoc = gql`
    fragment FullFlightFragment on Flight {
  id
  airlineIata
  Airline {
    id
    name
    logoCompactImageURL
  }
  aircraftTailNumber
  flightNumber
  originIata
  originTerminal
  originGate
  Origin {
    id
    name
    cityName
    countryCode
    iata
    timezone
  }
  status
  destinationIata
  destinationGate
  destinationTerminal
  destinationBaggageClaim
  Destination {
    id
    name
    cityName
    countryCode
    iata
    timezone
  }
  scheduledGateDeparture
  scheduledGateArrival
  estimatedGateDeparture
  estimatedGateArrival
  actualGateDeparture
  actualGateArrival
}
    `;
export const AircraftDocument = gql`
    query Aircraft($tailNumber: String!) {
  aircraft(tailNumber: $tailNumber) {
    id
    iata
    icao
    model
    airlineIata
    description
    tailNumber
    firstFlight
    imageURL
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAircraftQuery__
 *
 * To run a query within a React component, call `useAircraftQuery` and pass it any options that fit your needs.
 * When your component renders, `useAircraftQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAircraftQuery({
 *   variables: {
 *      tailNumber: // value for 'tailNumber'
 *   },
 * });
 */
export function useAircraftQuery(baseOptions: Apollo.QueryHookOptions<AircraftQuery, AircraftQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AircraftQuery, AircraftQueryVariables>(AircraftDocument, options);
      }
export function useAircraftLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AircraftQuery, AircraftQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AircraftQuery, AircraftQueryVariables>(AircraftDocument, options);
        }
export type AircraftQueryHookResult = ReturnType<typeof useAircraftQuery>;
export type AircraftLazyQueryHookResult = ReturnType<typeof useAircraftLazyQuery>;
export type AircraftQueryResult = Apollo.QueryResult<AircraftQuery, AircraftQueryVariables>;
export function refetchAircraftQuery(variables: AircraftQueryVariables) {
      return { query: AircraftDocument, variables: variables }
    }
export const AircraftPositionDocument = gql`
    query AircraftPosition($aircraftId: Float!) {
  aircraftPosition(aircraftID: $aircraftId) {
    id
    aircraftID
    latitude
    longitude
    altitude
    flightYear
    flightMonth
    flightDate
    flightNumber
    airlineIata
    originIata
    destinationIata
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useAircraftPositionQuery__
 *
 * To run a query within a React component, call `useAircraftPositionQuery` and pass it any options that fit your needs.
 * When your component renders, `useAircraftPositionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAircraftPositionQuery({
 *   variables: {
 *      aircraftId: // value for 'aircraftId'
 *   },
 * });
 */
export function useAircraftPositionQuery(baseOptions: Apollo.QueryHookOptions<AircraftPositionQuery, AircraftPositionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AircraftPositionQuery, AircraftPositionQueryVariables>(AircraftPositionDocument, options);
      }
export function useAircraftPositionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AircraftPositionQuery, AircraftPositionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AircraftPositionQuery, AircraftPositionQueryVariables>(AircraftPositionDocument, options);
        }
export type AircraftPositionQueryHookResult = ReturnType<typeof useAircraftPositionQuery>;
export type AircraftPositionLazyQueryHookResult = ReturnType<typeof useAircraftPositionLazyQuery>;
export type AircraftPositionQueryResult = Apollo.QueryResult<AircraftPositionQuery, AircraftPositionQueryVariables>;
export function refetchAircraftPositionQuery(variables: AircraftPositionQueryVariables) {
      return { query: AircraftPositionDocument, variables: variables }
    }
export const AirlinesDocument = gql`
    query Airlines {
  airlines {
    id
    name
    iata
    logoCompactImageURL
    logoCompactImageType
  }
}
    `;

/**
 * __useAirlinesQuery__
 *
 * To run a query within a React component, call `useAirlinesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirlinesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirlinesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAirlinesQuery(baseOptions?: Apollo.QueryHookOptions<AirlinesQuery, AirlinesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirlinesQuery, AirlinesQueryVariables>(AirlinesDocument, options);
      }
export function useAirlinesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirlinesQuery, AirlinesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirlinesQuery, AirlinesQueryVariables>(AirlinesDocument, options);
        }
export type AirlinesQueryHookResult = ReturnType<typeof useAirlinesQuery>;
export type AirlinesLazyQueryHookResult = ReturnType<typeof useAirlinesLazyQuery>;
export type AirlinesQueryResult = Apollo.QueryResult<AirlinesQuery, AirlinesQueryVariables>;
export function refetchAirlinesQuery(variables?: AirlinesQueryVariables) {
      return { query: AirlinesDocument, variables: variables }
    }
export const AirlineDocument = gql`
    query Airline($iata: String!) {
  airline(iata: $iata) {
    id
    name
    iata
    logoCompactImageURL
    logoCompactImageType
    logoFullImageURL
    logoFullImageType
  }
}
    `;

/**
 * __useAirlineQuery__
 *
 * To run a query within a React component, call `useAirlineQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirlineQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirlineQuery({
 *   variables: {
 *      iata: // value for 'iata'
 *   },
 * });
 */
export function useAirlineQuery(baseOptions: Apollo.QueryHookOptions<AirlineQuery, AirlineQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirlineQuery, AirlineQueryVariables>(AirlineDocument, options);
      }
export function useAirlineLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirlineQuery, AirlineQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirlineQuery, AirlineQueryVariables>(AirlineDocument, options);
        }
export type AirlineQueryHookResult = ReturnType<typeof useAirlineQuery>;
export type AirlineLazyQueryHookResult = ReturnType<typeof useAirlineLazyQuery>;
export type AirlineQueryResult = Apollo.QueryResult<AirlineQuery, AirlineQueryVariables>;
export function refetchAirlineQuery(variables: AirlineQueryVariables) {
      return { query: AirlineDocument, variables: variables }
    }
export const AirportDocument = gql`
    query Airport($iata: String!) {
  airport(iata: $iata) {
    id
    name
    iata
    cityName
    cityCode
    timezone
    state
    elevation
    countryCode
    countyName
  }
}
    `;

/**
 * __useAirportQuery__
 *
 * To run a query within a React component, call `useAirportQuery` and pass it any options that fit your needs.
 * When your component renders, `useAirportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAirportQuery({
 *   variables: {
 *      iata: // value for 'iata'
 *   },
 * });
 */
export function useAirportQuery(baseOptions: Apollo.QueryHookOptions<AirportQuery, AirportQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AirportQuery, AirportQueryVariables>(AirportDocument, options);
      }
export function useAirportLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AirportQuery, AirportQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AirportQuery, AirportQueryVariables>(AirportDocument, options);
        }
export type AirportQueryHookResult = ReturnType<typeof useAirportQuery>;
export type AirportLazyQueryHookResult = ReturnType<typeof useAirportLazyQuery>;
export type AirportQueryResult = Apollo.QueryResult<AirportQuery, AirportQueryVariables>;
export function refetchAirportQuery(variables: AirportQueryVariables) {
      return { query: AirportDocument, variables: variables }
    }
export const DebugFlightNotificationDocument = gql`
    mutation debugFlightNotification($flightID: String!, $title: String!, $body: String!, $data: JSON) {
  _sendFlightNotification(
    flightID: $flightID
    title: $title
    body: $body
    data: $data
  )
}
    `;
export type DebugFlightNotificationMutationFn = Apollo.MutationFunction<DebugFlightNotificationMutation, DebugFlightNotificationMutationVariables>;

/**
 * __useDebugFlightNotificationMutation__
 *
 * To run a mutation, you first call `useDebugFlightNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDebugFlightNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [debugFlightNotificationMutation, { data, loading, error }] = useDebugFlightNotificationMutation({
 *   variables: {
 *      flightID: // value for 'flightID'
 *      title: // value for 'title'
 *      body: // value for 'body'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDebugFlightNotificationMutation(baseOptions?: Apollo.MutationHookOptions<DebugFlightNotificationMutation, DebugFlightNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DebugFlightNotificationMutation, DebugFlightNotificationMutationVariables>(DebugFlightNotificationDocument, options);
      }
export type DebugFlightNotificationMutationHookResult = ReturnType<typeof useDebugFlightNotificationMutation>;
export type DebugFlightNotificationMutationResult = Apollo.MutationResult<DebugFlightNotificationMutation>;
export type DebugFlightNotificationMutationOptions = Apollo.BaseMutationOptions<DebugFlightNotificationMutation, DebugFlightNotificationMutationVariables>;
export const FindFlightsDocument = gql`
    query FindFlights($airlineIata: String!, $flightNumber: String!, $year: Float!, $month: Float!, $date: Float!) {
  flights(
    airlineIata: $airlineIata
    flightNumber: $flightNumber
    year: $year
    month: $month
    date: $date
  ) {
    ...FullFlightFragment
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useFindFlightsQuery__
 *
 * To run a query within a React component, call `useFindFlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindFlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindFlightsQuery({
 *   variables: {
 *      airlineIata: // value for 'airlineIata'
 *      flightNumber: // value for 'flightNumber'
 *      year: // value for 'year'
 *      month: // value for 'month'
 *      date: // value for 'date'
 *   },
 * });
 */
export function useFindFlightsQuery(baseOptions: Apollo.QueryHookOptions<FindFlightsQuery, FindFlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindFlightsQuery, FindFlightsQueryVariables>(FindFlightsDocument, options);
      }
export function useFindFlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindFlightsQuery, FindFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindFlightsQuery, FindFlightsQueryVariables>(FindFlightsDocument, options);
        }
export type FindFlightsQueryHookResult = ReturnType<typeof useFindFlightsQuery>;
export type FindFlightsLazyQueryHookResult = ReturnType<typeof useFindFlightsLazyQuery>;
export type FindFlightsQueryResult = Apollo.QueryResult<FindFlightsQuery, FindFlightsQueryVariables>;
export function refetchFindFlightsQuery(variables: FindFlightsQueryVariables) {
      return { query: FindFlightsDocument, variables: variables }
    }
export const GetFlightPromptnessDocument = gql`
    query GetFlightPromptness($flightID: String!) {
  flightPromptness(flightID: $flightID) {
    onTimePercent
    rating
    averageDelayTimeMs
  }
}
    `;

/**
 * __useGetFlightPromptnessQuery__
 *
 * To run a query within a React component, call `useGetFlightPromptnessQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFlightPromptnessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFlightPromptnessQuery({
 *   variables: {
 *      flightID: // value for 'flightID'
 *   },
 * });
 */
export function useGetFlightPromptnessQuery(baseOptions: Apollo.QueryHookOptions<GetFlightPromptnessQuery, GetFlightPromptnessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFlightPromptnessQuery, GetFlightPromptnessQueryVariables>(GetFlightPromptnessDocument, options);
      }
export function useGetFlightPromptnessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFlightPromptnessQuery, GetFlightPromptnessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFlightPromptnessQuery, GetFlightPromptnessQueryVariables>(GetFlightPromptnessDocument, options);
        }
export type GetFlightPromptnessQueryHookResult = ReturnType<typeof useGetFlightPromptnessQuery>;
export type GetFlightPromptnessLazyQueryHookResult = ReturnType<typeof useGetFlightPromptnessLazyQuery>;
export type GetFlightPromptnessQueryResult = Apollo.QueryResult<GetFlightPromptnessQuery, GetFlightPromptnessQueryVariables>;
export function refetchGetFlightPromptnessQuery(variables: GetFlightPromptnessQueryVariables) {
      return { query: GetFlightPromptnessDocument, variables: variables }
    }
export const GetFlightDocument = gql`
    query GetFlight($flightID: String!) {
  flight(flightID: $flightID) {
    ...FullFlightFragment
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useGetFlightQuery__
 *
 * To run a query within a React component, call `useGetFlightQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFlightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFlightQuery({
 *   variables: {
 *      flightID: // value for 'flightID'
 *   },
 * });
 */
export function useGetFlightQuery(baseOptions: Apollo.QueryHookOptions<GetFlightQuery, GetFlightQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFlightQuery, GetFlightQueryVariables>(GetFlightDocument, options);
      }
export function useGetFlightLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFlightQuery, GetFlightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFlightQuery, GetFlightQueryVariables>(GetFlightDocument, options);
        }
export type GetFlightQueryHookResult = ReturnType<typeof useGetFlightQuery>;
export type GetFlightLazyQueryHookResult = ReturnType<typeof useGetFlightLazyQuery>;
export type GetFlightQueryResult = Apollo.QueryResult<GetFlightQuery, GetFlightQueryVariables>;
export function refetchGetFlightQuery(variables: GetFlightQueryVariables) {
      return { query: GetFlightDocument, variables: variables }
    }
export const GetRandomFlightDocument = gql`
    query GetRandomFlight {
  randomFlight {
    ...FullFlightFragment
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useGetRandomFlightQuery__
 *
 * To run a query within a React component, call `useGetRandomFlightQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRandomFlightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRandomFlightQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetRandomFlightQuery(baseOptions?: Apollo.QueryHookOptions<GetRandomFlightQuery, GetRandomFlightQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRandomFlightQuery, GetRandomFlightQueryVariables>(GetRandomFlightDocument, options);
      }
export function useGetRandomFlightLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRandomFlightQuery, GetRandomFlightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRandomFlightQuery, GetRandomFlightQueryVariables>(GetRandomFlightDocument, options);
        }
export type GetRandomFlightQueryHookResult = ReturnType<typeof useGetRandomFlightQuery>;
export type GetRandomFlightLazyQueryHookResult = ReturnType<typeof useGetRandomFlightLazyQuery>;
export type GetRandomFlightQueryResult = Apollo.QueryResult<GetRandomFlightQuery, GetRandomFlightQueryVariables>;
export function refetchGetRandomFlightQuery(variables?: GetRandomFlightQueryVariables) {
      return { query: GetRandomFlightDocument, variables: variables }
    }
export const GetUserActiveFlightsDocument = gql`
    query GetUserActiveFlights {
  userActiveFlights {
    id
    flightID
    createdAt
    shouldAlert
    Flight {
      ...FullFlightFragment
    }
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useGetUserActiveFlightsQuery__
 *
 * To run a query within a React component, call `useGetUserActiveFlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserActiveFlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserActiveFlightsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserActiveFlightsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserActiveFlightsQuery, GetUserActiveFlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserActiveFlightsQuery, GetUserActiveFlightsQueryVariables>(GetUserActiveFlightsDocument, options);
      }
export function useGetUserActiveFlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserActiveFlightsQuery, GetUserActiveFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserActiveFlightsQuery, GetUserActiveFlightsQueryVariables>(GetUserActiveFlightsDocument, options);
        }
export type GetUserActiveFlightsQueryHookResult = ReturnType<typeof useGetUserActiveFlightsQuery>;
export type GetUserActiveFlightsLazyQueryHookResult = ReturnType<typeof useGetUserActiveFlightsLazyQuery>;
export type GetUserActiveFlightsQueryResult = Apollo.QueryResult<GetUserActiveFlightsQuery, GetUserActiveFlightsQueryVariables>;
export function refetchGetUserActiveFlightsQuery(variables?: GetUserActiveFlightsQueryVariables) {
      return { query: GetUserActiveFlightsDocument, variables: variables }
    }
export const GetUserArchivedFlightsDocument = gql`
    query GetUserArchivedFlights {
  userArchivedFlights {
    id
    flightID
    createdAt
    Flight {
      ...FullFlightFragment
    }
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useGetUserArchivedFlightsQuery__
 *
 * To run a query within a React component, call `useGetUserArchivedFlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserArchivedFlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserArchivedFlightsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserArchivedFlightsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserArchivedFlightsQuery, GetUserArchivedFlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserArchivedFlightsQuery, GetUserArchivedFlightsQueryVariables>(GetUserArchivedFlightsDocument, options);
      }
export function useGetUserArchivedFlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserArchivedFlightsQuery, GetUserArchivedFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserArchivedFlightsQuery, GetUserArchivedFlightsQueryVariables>(GetUserArchivedFlightsDocument, options);
        }
export type GetUserArchivedFlightsQueryHookResult = ReturnType<typeof useGetUserArchivedFlightsQuery>;
export type GetUserArchivedFlightsLazyQueryHookResult = ReturnType<typeof useGetUserArchivedFlightsLazyQuery>;
export type GetUserArchivedFlightsQueryResult = Apollo.QueryResult<GetUserArchivedFlightsQuery, GetUserArchivedFlightsQueryVariables>;
export function refetchGetUserArchivedFlightsQuery(variables?: GetUserArchivedFlightsQueryVariables) {
      return { query: GetUserArchivedFlightsDocument, variables: variables }
    }
export const AddUserFlightDocument = gql`
    mutation AddUserFlight($flightID: String!) {
  addUserFlight(flightID: $flightID)
}
    `;
export type AddUserFlightMutationFn = Apollo.MutationFunction<AddUserFlightMutation, AddUserFlightMutationVariables>;

/**
 * __useAddUserFlightMutation__
 *
 * To run a mutation, you first call `useAddUserFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserFlightMutation, { data, loading, error }] = useAddUserFlightMutation({
 *   variables: {
 *      flightID: // value for 'flightID'
 *   },
 * });
 */
export function useAddUserFlightMutation(baseOptions?: Apollo.MutationHookOptions<AddUserFlightMutation, AddUserFlightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddUserFlightMutation, AddUserFlightMutationVariables>(AddUserFlightDocument, options);
      }
export type AddUserFlightMutationHookResult = ReturnType<typeof useAddUserFlightMutation>;
export type AddUserFlightMutationResult = Apollo.MutationResult<AddUserFlightMutation>;
export type AddUserFlightMutationOptions = Apollo.BaseMutationOptions<AddUserFlightMutation, AddUserFlightMutationVariables>;
export const DeleteUserFlightDocument = gql`
    mutation DeleteUserFlight($flightID: String!) {
  deleteUserFlight(flightID: $flightID)
}
    `;
export type DeleteUserFlightMutationFn = Apollo.MutationFunction<DeleteUserFlightMutation, DeleteUserFlightMutationVariables>;

/**
 * __useDeleteUserFlightMutation__
 *
 * To run a mutation, you first call `useDeleteUserFlightMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserFlightMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserFlightMutation, { data, loading, error }] = useDeleteUserFlightMutation({
 *   variables: {
 *      flightID: // value for 'flightID'
 *   },
 * });
 */
export function useDeleteUserFlightMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserFlightMutation, DeleteUserFlightMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserFlightMutation, DeleteUserFlightMutationVariables>(DeleteUserFlightDocument, options);
      }
export type DeleteUserFlightMutationHookResult = ReturnType<typeof useDeleteUserFlightMutation>;
export type DeleteUserFlightMutationResult = Apollo.MutationResult<DeleteUserFlightMutation>;
export type DeleteUserFlightMutationOptions = Apollo.BaseMutationOptions<DeleteUserFlightMutation, DeleteUserFlightMutationVariables>;
export const UserHasFlightsDocument = gql`
    query UserHasFlights {
  userHasFlights
}
    `;

/**
 * __useUserHasFlightsQuery__
 *
 * To run a query within a React component, call `useUserHasFlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserHasFlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserHasFlightsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserHasFlightsQuery(baseOptions?: Apollo.QueryHookOptions<UserHasFlightsQuery, UserHasFlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserHasFlightsQuery, UserHasFlightsQueryVariables>(UserHasFlightsDocument, options);
      }
export function useUserHasFlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserHasFlightsQuery, UserHasFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserHasFlightsQuery, UserHasFlightsQueryVariables>(UserHasFlightsDocument, options);
        }
export type UserHasFlightsQueryHookResult = ReturnType<typeof useUserHasFlightsQuery>;
export type UserHasFlightsLazyQueryHookResult = ReturnType<typeof useUserHasFlightsLazyQuery>;
export type UserHasFlightsQueryResult = Apollo.QueryResult<UserHasFlightsQuery, UserHasFlightsQueryVariables>;
export function refetchUserHasFlightsQuery(variables?: UserHasFlightsQueryVariables) {
      return { query: UserHasFlightsDocument, variables: variables }
    }
export const UserFlightDocument = gql`
    query UserFlight($flightID: String!) {
  userFlight(flightID: $flightID) {
    id
    shouldAlert
  }
}
    `;

/**
 * __useUserFlightQuery__
 *
 * To run a query within a React component, call `useUserFlightQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFlightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFlightQuery({
 *   variables: {
 *      flightID: // value for 'flightID'
 *   },
 * });
 */
export function useUserFlightQuery(baseOptions: Apollo.QueryHookOptions<UserFlightQuery, UserFlightQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFlightQuery, UserFlightQueryVariables>(UserFlightDocument, options);
      }
export function useUserFlightLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFlightQuery, UserFlightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFlightQuery, UserFlightQueryVariables>(UserFlightDocument, options);
        }
export type UserFlightQueryHookResult = ReturnType<typeof useUserFlightQuery>;
export type UserFlightLazyQueryHookResult = ReturnType<typeof useUserFlightLazyQuery>;
export type UserFlightQueryResult = Apollo.QueryResult<UserFlightQuery, UserFlightQueryVariables>;
export function refetchUserFlightQuery(variables: UserFlightQueryVariables) {
      return { query: UserFlightDocument, variables: variables }
    }
export const SyncUserDocument = gql`
    mutation SyncUser {
  syncUser
}
    `;
export type SyncUserMutationFn = Apollo.MutationFunction<SyncUserMutation, SyncUserMutationVariables>;

/**
 * __useSyncUserMutation__
 *
 * To run a mutation, you first call `useSyncUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSyncUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [syncUserMutation, { data, loading, error }] = useSyncUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useSyncUserMutation(baseOptions?: Apollo.MutationHookOptions<SyncUserMutation, SyncUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SyncUserMutation, SyncUserMutationVariables>(SyncUserDocument, options);
      }
export type SyncUserMutationHookResult = ReturnType<typeof useSyncUserMutation>;
export type SyncUserMutationResult = Apollo.MutationResult<SyncUserMutation>;
export type SyncUserMutationOptions = Apollo.BaseMutationOptions<SyncUserMutation, SyncUserMutationVariables>;