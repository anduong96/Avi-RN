import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

export type Airline = {
  __typename?: 'Airline';
  iata: Scalars['String'];
  id: Scalars['ID'];
  isLowCost: Scalars['Boolean'];
  logoCompactImageType: ImageType;
  logoCompactImageURL: Scalars['String'];
  logoFullImageType: ImageType;
  logoFullImageURL: Scalars['String'];
  name: Scalars['String'];
};

export type Airport = {
  __typename?: 'Airport';
  cityCode: Scalars['String'];
  cityName?: Maybe<Scalars['String']>;
  countryCode: Scalars['String'];
  countyName?: Maybe<Scalars['String']>;
  elevation?: Maybe<Scalars['Float']>;
  iata: Scalars['String'];
  icaoCode?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  location?: Maybe<Location>;
  name: Scalars['String'];
  state?: Maybe<Scalars['String']>;
  timezone: Scalars['String'];
};

export type Flight = {
  __typename?: 'Flight';
  actualDuration?: Maybe<Scalars['Float']>;
  actualGateArrival?: Maybe<Scalars['DateTime']>;
  actualGateDeparture?: Maybe<Scalars['DateTime']>;
  airline: Airline;
  airlineIata: Scalars['String'];
  airplaneIata?: Maybe<Scalars['String']>;
  destination: Airport;
  destinationGate?: Maybe<Scalars['String']>;
  destinationIata: Scalars['String'];
  destinationTerminal?: Maybe<Scalars['String']>;
  destinationTimezone: Scalars['String'];
  estimatedDuration: Scalars['Float'];
  estimatedGateArrival: Scalars['DateTime'];
  estimatedGateDeparture: Scalars['DateTime'];
  flightNumber: Scalars['String'];
  id: Scalars['ID'];
  origin: Airport;
  originGate?: Maybe<Scalars['String']>;
  originIata: Scalars['String'];
  originTerminal?: Maybe<Scalars['String']>;
  originTimezone: Scalars['String'];
  scheduledDuration: Scalars['Float'];
  scheduledGateArrival: Scalars['DateTime'];
  scheduledGateDeparture: Scalars['DateTime'];
  status: FlightStatus;
};

export type FlightPromptness = {
  __typename?: 'FlightPromptness';
  averageDelayTimeMs: Scalars['Float'];
  onTimePercent: Scalars['Float'];
  rating: Scalars['Float'];
};

export const FlightStatus = {
  ARCHIVED: 'ARCHIVED',
  ARRIVED: 'ARRIVED',
  CANCELED: 'CANCELED',
  DELAYED: 'DELAYED',
  DEPARTED: 'DEPARTED',
  SCHEDULED: 'SCHEDULED'
} as const;

export type FlightStatus = typeof FlightStatus[keyof typeof FlightStatus];
export type Gql_Country = {
  __typename?: 'GQL_Country';
  dialCode: Scalars['String'];
  flagImageType: ImageType;
  flagImageUri: Scalars['String'];
  id: Scalars['ID'];
  isoCode: Scalars['String'];
  name: Scalars['String'];
};

export const GeoType = {
  Point: 'Point'
} as const;

export type GeoType = typeof GeoType[keyof typeof GeoType];
export const ImageType = {
  PNG: 'PNG',
  SVG: 'SVG'
} as const;

export type ImageType = typeof ImageType[keyof typeof ImageType];
export type Location = {
  __typename?: 'Location';
  coordinates: Array<Scalars['Float']>;
  type: GeoType;
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserFlight: Scalars['String'];
  deleteUserFlight: Scalars['String'];
  updateUser: Scalars['Boolean'];
};


export type MutationAddUserFlightArgs = {
  flightID: Scalars['String'];
};


export type MutationDeleteUserFlightArgs = {
  flightID: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  airline: Airline;
  airlines: Array<Airline>;
  airport: Airport;
  countries: Array<Gql_Country>;
  country: Gql_Country;
  currentIata: Scalars['String'];
  findFlights: Array<Flight>;
  flight: Flight;
  flightPromptness?: Maybe<FlightPromptness>;
  isUserValid: Scalars['Boolean'];
  user: User;
  userFlight?: Maybe<UserFlight>;
  userFlights: Array<UserFlight>;
};


export type QueryAirlineArgs = {
  iata: Scalars['String'];
};


export type QueryAirportArgs = {
  iata: Scalars['String'];
};


export type QueryCountryArgs = {
  isoCode: Scalars['String'];
};


export type QueryFindFlightsArgs = {
  airlineIata: Scalars['String'];
  departureDate: Scalars['DateTime'];
  flightNumber: Scalars['String'];
};


export type QueryFlightArgs = {
  flightID: Scalars['String'];
};


export type QueryFlightPromptnessArgs = {
  airlineIata: Scalars['String'];
  flightNumber: Scalars['String'];
};


export type QueryUserFlightArgs = {
  flightID: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isEmailVerified?: Maybe<Scalars['Boolean']>;
  isPhoneVerified?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileImageURL?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type UserFlight = {
  __typename?: 'UserFlight';
  createdAt: Scalars['DateTime'];
  flight: Flight;
  flightID: Scalars['String'];
  id: Scalars['ID'];
  shouldAlert: Scalars['Boolean'];
};

export type AirlinesQueryVariables = Exact<{ [key: string]: never; }>;


export type AirlinesQuery = { __typename?: 'Query', airlines: Array<{ __typename?: 'Airline', id: string, name: string, iata: string, logoCompactImageURL: string, logoCompactImageType: ImageType }> };

export type AirlineQueryVariables = Exact<{
  iata: Scalars['String'];
}>;


export type AirlineQuery = { __typename?: 'Query', airline: { __typename?: 'Airline', id: string, name: string, iata: string, logoCompactImageURL: string, logoCompactImageType: ImageType, logoFullImageURL: string, logoFullImageType: ImageType } };

export type AirportQueryVariables = Exact<{
  iata: Scalars['String'];
}>;


export type AirportQuery = { __typename?: 'Query', airport: { __typename?: 'Airport', id: string, name: string, iata: string, cityName?: string | null, cityCode: string, timezone: string, state?: string | null, elevation?: number | null, countryCode: string, countyName?: string | null, location?: { __typename?: 'Location', coordinates: Array<number> } | null } };

export type FullFlightFragmentFragment = { __typename?: 'Flight', id: string, airlineIata: string, flightNumber: string, originTimezone: string, originIata: string, originTerminal?: string | null, originGate?: string | null, status: FlightStatus, destinationTimezone: string, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, scheduledGateDeparture: Date, scheduledGateArrival: Date, scheduledDuration: number, estimatedGateDeparture: Date, estimatedGateArrival: Date, estimatedDuration: number, actualGateDeparture?: Date | null, actualGateArrival?: Date | null, actualDuration?: number | null, airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL: string }, origin: { __typename?: 'Airport', id: string, name: string, cityName?: string | null, countryCode: string, iata: string }, destination: { __typename?: 'Airport', id: string, name: string, cityName?: string | null, countryCode: string, iata: string } };

export type FindFlightsQueryVariables = Exact<{
  airlineIata: Scalars['String'];
  flightNumber: Scalars['String'];
  departureDate: Scalars['DateTime'];
}>;


export type FindFlightsQuery = { __typename?: 'Query', findFlights: Array<{ __typename?: 'Flight', id: string, airlineIata: string, flightNumber: string, originTimezone: string, originIata: string, originTerminal?: string | null, originGate?: string | null, status: FlightStatus, destinationTimezone: string, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, scheduledGateDeparture: Date, scheduledGateArrival: Date, scheduledDuration: number, estimatedGateDeparture: Date, estimatedGateArrival: Date, estimatedDuration: number, actualGateDeparture?: Date | null, actualGateArrival?: Date | null, actualDuration?: number | null, airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL: string }, origin: { __typename?: 'Airport', id: string, name: string, cityName?: string | null, countryCode: string, iata: string }, destination: { __typename?: 'Airport', id: string, name: string, cityName?: string | null, countryCode: string, iata: string } }> };

export type GetFlightPromptnessQueryVariables = Exact<{
  airlineIata: Scalars['String'];
  flightNumber: Scalars['String'];
}>;


export type GetFlightPromptnessQuery = { __typename?: 'Query', flightPromptness?: { __typename?: 'FlightPromptness', onTimePercent: number, rating: number, averageDelayTimeMs: number } | null };

export type GetFlightQueryVariables = Exact<{
  flightID: Scalars['String'];
}>;


export type GetFlightQuery = { __typename?: 'Query', flight: { __typename?: 'Flight', id: string, airlineIata: string, flightNumber: string, originTimezone: string, originIata: string, originTerminal?: string | null, originGate?: string | null, status: FlightStatus, destinationTimezone: string, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, scheduledGateDeparture: Date, scheduledGateArrival: Date, scheduledDuration: number, estimatedGateDeparture: Date, estimatedGateArrival: Date, estimatedDuration: number, actualGateDeparture?: Date | null, actualGateArrival?: Date | null, actualDuration?: number | null, airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL: string }, origin: { __typename?: 'Airport', id: string, name: string, cityName?: string | null, countryCode: string, iata: string }, destination: { __typename?: 'Airport', id: string, name: string, cityName?: string | null, countryCode: string, iata: string } } };

export type GetUserFlightsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserFlightsQuery = { __typename?: 'Query', userFlights: Array<{ __typename?: 'UserFlight', id: string, flightID: string, createdAt: Date, shouldAlert: boolean, flight: { __typename?: 'Flight', id: string, airlineIata: string, flightNumber: string, originTimezone: string, originIata: string, originTerminal?: string | null, originGate?: string | null, status: FlightStatus, destinationTimezone: string, destinationIata: string, destinationGate?: string | null, destinationTerminal?: string | null, scheduledGateDeparture: Date, scheduledGateArrival: Date, scheduledDuration: number, estimatedGateDeparture: Date, estimatedGateArrival: Date, estimatedDuration: number, actualGateDeparture?: Date | null, actualGateArrival?: Date | null, actualDuration?: number | null, airline: { __typename?: 'Airline', id: string, name: string, logoCompactImageURL: string }, origin: { __typename?: 'Airport', id: string, name: string, cityName?: string | null, countryCode: string, iata: string }, destination: { __typename?: 'Airport', id: string, name: string, cityName?: string | null, countryCode: string, iata: string } } }> };

export type AddUserFlightMutationVariables = Exact<{
  flightID: Scalars['String'];
}>;


export type AddUserFlightMutation = { __typename?: 'Mutation', addUserFlight: string };

export type DeleteUserFlightMutationVariables = Exact<{
  flightID: Scalars['String'];
}>;


export type DeleteUserFlightMutation = { __typename?: 'Mutation', deleteUserFlight: string };

export type UserFlightQueryVariables = Exact<{
  flightID: Scalars['String'];
}>;


export type UserFlightQuery = { __typename?: 'Query', userFlight?: { __typename?: 'UserFlight', id: string, shouldAlert: boolean } | null };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string } };

export const FullFlightFragmentFragmentDoc = gql`
    fragment FullFlightFragment on Flight {
  id
  airlineIata
  airline {
    id
    name
    logoCompactImageURL
  }
  flightNumber
  originTimezone
  originIata
  originTerminal
  originGate
  origin {
    id
    name
    cityName
    countryCode
    iata
  }
  status
  destinationTimezone
  destinationIata
  destinationGate
  destinationTerminal
  destination {
    id
    name
    cityName
    countryCode
    iata
  }
  scheduledGateDeparture
  scheduledGateArrival
  scheduledDuration
  estimatedGateDeparture
  estimatedGateArrival
  estimatedDuration
  actualGateDeparture
  actualGateArrival
  actualDuration
}
    `;
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
    location {
      coordinates
    }
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
export const FindFlightsDocument = gql`
    query FindFlights($airlineIata: String!, $flightNumber: String!, $departureDate: DateTime!) {
  findFlights(
    airlineIata: $airlineIata
    flightNumber: $flightNumber
    departureDate: $departureDate
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
 *      departureDate: // value for 'departureDate'
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
    query GetFlightPromptness($airlineIata: String!, $flightNumber: String!) {
  flightPromptness(airlineIata: $airlineIata, flightNumber: $flightNumber) {
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
 *      airlineIata: // value for 'airlineIata'
 *      flightNumber: // value for 'flightNumber'
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
export const GetUserFlightsDocument = gql`
    query GetUserFlights {
  userFlights {
    id
    flightID
    createdAt
    shouldAlert
    flight {
      ...FullFlightFragment
    }
  }
}
    ${FullFlightFragmentFragmentDoc}`;

/**
 * __useGetUserFlightsQuery__
 *
 * To run a query within a React component, call `useGetUserFlightsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserFlightsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserFlightsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserFlightsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserFlightsQuery, GetUserFlightsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserFlightsQuery, GetUserFlightsQueryVariables>(GetUserFlightsDocument, options);
      }
export function useGetUserFlightsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserFlightsQuery, GetUserFlightsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserFlightsQuery, GetUserFlightsQueryVariables>(GetUserFlightsDocument, options);
        }
export type GetUserFlightsQueryHookResult = ReturnType<typeof useGetUserFlightsQuery>;
export type GetUserFlightsLazyQueryHookResult = ReturnType<typeof useGetUserFlightsLazyQuery>;
export type GetUserFlightsQueryResult = Apollo.QueryResult<GetUserFlightsQuery, GetUserFlightsQueryVariables>;
export function refetchGetUserFlightsQuery(variables?: GetUserFlightsQueryVariables) {
      return { query: GetUserFlightsDocument, variables: variables }
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
export const UserDocument = gql`
    query User {
  user {
    id
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export function refetchUserQuery(variables?: UserQueryVariables) {
      return { query: UserDocument, variables: variables }
    }