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
  airlineIata: Scalars['String'];
  arrivalAt: Scalars['DateTime'];
  departureAt: Scalars['DateTime'];
  destinationIata: Scalars['String'];
  flightNumber: Scalars['String'];
  id: Scalars['ID'];
  originIata: Scalars['String'];
  status: FlightStatus;
};

export const FlightStatus = {
  CANCELED: 'CANCELED',
  COMPLETED: 'COMPLETED',
  ENROUTE: 'ENROUTE',
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
  searchFlights: Flight;
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


export type QuerySearchFlightsArgs = {
  airlineIata: Scalars['String'];
  departureDate: Scalars['DateTime'];
  flightNumber: Scalars['String'];
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

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string } };


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