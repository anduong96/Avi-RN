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
  updateUser: Scalars['Boolean'];
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
  isUserValid: Scalars['Boolean'];
  searchFlight: SearchFlightResponse;
  user: User;
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


export type QuerySearchFlightArgs = {
  airlineIata: Scalars['String'];
  flightNumber: Scalars['String'];
};

export type SearchFlightResponse = {
  __typename?: 'SearchFlightResponse';
  airlineIata: Scalars['String'];
  arrivalAt: Scalars['DateTime'];
  arrivalTimezone: Scalars['String'];
  departureAt: Scalars['DateTime'];
  departureTimezone: Scalars['String'];
  destinationIata: Scalars['String'];
  flightNumber: Scalars['String'];
  originIata: Scalars['String'];
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

export type AirlinesQueryVariables = Exact<{ [key: string]: never; }>;


export type AirlinesQuery = { __typename?: 'Query', airlines: Array<{ __typename?: 'Airline', id: string, name: string, iata: string, logoCompactImageURL: string, logoCompactImageType: ImageType }> };

export type AirlineQueryVariables = Exact<{
  iata: Scalars['String'];
}>;


export type AirlineQuery = { __typename?: 'Query', airline: { __typename?: 'Airline', id: string, name: string, iata: string, logoCompactImageURL: string, logoCompactImageType: ImageType, logoFullImageURL: string, logoFullImageType: ImageType } };

export type AirportQueryVariables = Exact<{
  iata: Scalars['String'];
}>;


export type AirportQuery = { __typename?: 'Query', airport: { __typename?: 'Airport', id: string, name: string, cityName?: string | null, cityCode: string, timezone: string, state?: string | null, elevation?: number | null, countryCode: string, countyName?: string | null, location?: { __typename?: 'Location', coordinates: Array<number> } | null } };

export type SearchFlightQueryVariables = Exact<{
  airlineIata: Scalars['String'];
  flightNumber: Scalars['String'];
}>;


export type SearchFlightQuery = { __typename?: 'Query', searchFlight: { __typename?: 'SearchFlightResponse', departureTimezone: string, arrivalTimezone: string, airlineIata: string, flightNumber: string, originIata: string, destinationIata: string, departureAt: Date, arrivalAt: Date } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string } };


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
export const SearchFlightDocument = gql`
    query SearchFlight($airlineIata: String!, $flightNumber: String!) {
  searchFlight(airlineIata: $airlineIata, flightNumber: $flightNumber) {
    departureTimezone
    arrivalTimezone
    airlineIata
    flightNumber
    originIata
    destinationIata
    departureAt
    arrivalAt
  }
}
    `;

/**
 * __useSearchFlightQuery__
 *
 * To run a query within a React component, call `useSearchFlightQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchFlightQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchFlightQuery({
 *   variables: {
 *      airlineIata: // value for 'airlineIata'
 *      flightNumber: // value for 'flightNumber'
 *   },
 * });
 */
export function useSearchFlightQuery(baseOptions: Apollo.QueryHookOptions<SearchFlightQuery, SearchFlightQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchFlightQuery, SearchFlightQueryVariables>(SearchFlightDocument, options);
      }
export function useSearchFlightLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchFlightQuery, SearchFlightQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchFlightQuery, SearchFlightQueryVariables>(SearchFlightDocument, options);
        }
export type SearchFlightQueryHookResult = ReturnType<typeof useSearchFlightQuery>;
export type SearchFlightLazyQueryHookResult = ReturnType<typeof useSearchFlightLazyQuery>;
export type SearchFlightQueryResult = Apollo.QueryResult<SearchFlightQuery, SearchFlightQueryVariables>;
export function refetchSearchFlightQuery(variables: SearchFlightQueryVariables) {
      return { query: SearchFlightDocument, variables: variables }
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